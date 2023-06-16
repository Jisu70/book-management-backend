const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequalize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  console.log(" i am called only when incoming request was coming ")
  User.findByPk(1).then( user => {
    req.user = user 
    next()
  }).catch((err) => console.log(err))
})

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

/*

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

  It indicates that a Product belongs to a User, 
  with certain constraints enabled and the "CASCADE" option set for deletion. 
  This typically means that if a User is deleted,
   all associated Product records will also be deleted.
    
 */
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
/*
User.hasMany(Product) establishes a one-to-many relationship between the User and Product models.
 It indicates that a User can have multiple Product instances associated with it. 
 */
User.hasMany(Product);

/*
A user has one cart 
*/
User.hasOne(Cart);
/*
A cart belongs to user  
*/
Cart.belongsTo(User)
/* 
Cart belongs to many Products 
*/
Cart.belongsToMany(Product, {through : CartItem})
Product.belongsToMany(Cart, {through : CartItem})

sequalize
  .sync({ force : true })
  // .sync()
  .then((result) => {  
    return User.findByPk(1)
  })
  .then( user => {
    if(!user){
      console.log("i was going to creat a user ")
      User.create({ name : " Jisu ", email : " jisu70@gmail.com"})
    }else{
      console.log("i have already creat a user ")
      return user
    }
  })
  .then( user => {
    console.log(user)
  })
  .catch((err) => console.log(err));

app.listen(3000);

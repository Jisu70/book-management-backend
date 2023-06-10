const products = [];

const fs = require("fs");
const path = require("path");

module.exports = class Product {
  constructor(titlee) {
    this.title = titlee;
  }

  save() {
    const mainModuleFilename = require.main.filename;
    const mainModuleDirname = path.dirname(mainModuleFilename);
    const filePath = path.join(mainModuleDirname, "data", "product.json");
    fs.readFile(filePath, (err, fileContent) => {
        let products = []
      if(!err){
        products = JSON.parse(fileContent)
      }
      products.push(this)
      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        console.log(err);
      })
    });
  }

  static fetchAll() {
    return products;
  }
};

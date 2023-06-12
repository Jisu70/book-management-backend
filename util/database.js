const Sequalize = require('sequelize') ;

const sequalize = new Sequalize('node_complete', 'root', '1234567890', {
  dialect : 'mysql',
  host : 'localhost'
})


module.exports = sequalize         ;
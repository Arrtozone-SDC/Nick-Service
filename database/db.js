const mongoose = require('mongoose')
const products = require('./generateRecords')
const productSchema = new mongoose.Schema({
    "_id" : mongoose.Schema.ObjectId,
    "name": String,
    "image": String
})

Product = mongoose.model('Prodcut', productSchema);

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log('db connection open')

    mongoose.connection.db.listCollections({name: 'products'}).toArray(function(err, items){
        let exist = items.length > 0;  
        console.log('Does it exist?', exist)
          if(exist){
            db.dropCollection("products", function (err, result) {
              if (err) {
                    console.log("error on delete collection");
              }
            })
          }
        
          Product.insertMany(products)
          .then(function(mongooseDocuments) {
               console.log('inserting documents')
          })
          .catch(function(err) {
              console.log(err)
          });
    
      });
});
// const mysql = require('mysql');
// const db = mysql.createConnection({
//   host     : '35.223.174.183',
//   user     : 'root',
//   password : 'password',
//   database : 'photos'
// });

// db.connect();





module.exports.db = db;
module.exports.Product = Product;

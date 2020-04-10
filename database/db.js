const mongoose = require('mongoose')
const {batches} = require('./generateRecords')
const productSchema = new mongoose.Schema({
    "name": String,
    "image": String
})

Product = mongoose.model('Product', productSchema);

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

batches.seed = async function (key = 0, startTime) {
 let resolved = await Product.insertMany(this[key], {ordered: false, lean: true})
 .then(function(mongooseDocuments) {
   console.log(`inserting batch ${key} documents`)
   
  })
  .catch(function(err) {
  console.log('error caught on seed', err)
  });
  
  if(this[key + 1] !== undefined){
    this.seed(key + 1, startTime)
  }else{
    console.log(`Seed Complete | Time = ${(Date.now() - startTime)/60000} minutes`)
  }
}

db.once('open', function () {
    console.log('db connection open')

    mongoose.connection.db.listCollections({name: 'products'}).toArray(function(err, items){
        let exist = items.length > 0;  
          if(exist){
            console.log('dropping existing table')
            db.dropCollection("products", function (err, result) {
              if (err) {
                console.log("error on delete collection");
              }
            })
          }else{
            console.log('Table does not exist, will be created')
          }
          let startTime = Date.now()
          batches.seed(0 ,startTime);
          let endTime = Date.now()
          
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

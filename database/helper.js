const db = require('./db');

const getPhotos = function(id, callback){
   db.query('SELECT id, productName, images from products WHERE id=?', id, (err, result) =>{
       if (err){
           callback(err, null)
       }else{
           callback(null, result)
       }
   })

}

const getPictureId = function(id, callback){
    db.query('SELECT id from products where id=?', id, (err, result) =>{
        if (err){
            callback(err, null)
        }else{
            callback(null, result)
        } 
    })
}



module.exports = { getPhotos }
const express = require('express');
const app = express();
const port = 8083;
const path = require('path');
const {getPhotos} = require('../database/helper');
const bodyParser = require('body-parser')
const cors = require('cors');

app.use(express.static(path.join(__dirname, '../dist/')));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());


const urlNameAdds = {
    prefix: '../images/',
    suffix: '.png'
}

app.get('/getPhotos/:id', (req, res) =>{
    getPhotos(req.params.id, (err, result)=>{
        if (err){
            res.send("you have an error bro")
        }else{
            //database result will be a single string at key image
            //add images array to the result
            //push each url name to the new images array then send result
            result[0].images = [];
            let urlsString = [result[0].image];
            for(var i = 0; i < urlsString.length; i+=2){
              let url = urlNameAdds.prefix + urlsString[i] + urlsString[i + 1] + urlNameAdds.suffix
                result[0].images.push(url)
            }
            
              
            res.send(result[0]);
        }
    })
})

app.get('/getProductId/:id', (req, res) =>{
    getPhotos(req.params.id, (err, result)=>{
        if (err){
            res.send("you have an error bro")
        }else{
            res.send(result[0].id);
        }
    })
})



app.listen(8083);
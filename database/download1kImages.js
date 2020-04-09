//USE THIS ONLY TO GENERATE URLS TO GET AS STATIC IMAGES FOR S3
// const loremFlicker = "https://loremflickr.com/"
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const loremPicsum = "https://picsum.photos/seed/"
const imgWidth = 320
const imgHeight = 240
const generateBaseSeeds = require('./customSetsUpTo32.js')

var urls1k = buildUrls(generateBaseSeeds());

function buildUrls(seeds){
  let fullUrls = []
  for(seed of seeds){
     fullUrls.push({name: `${seed}`, url: `${loremPicsum}${seed}/${imgWidth}/${imgHeight}`})
  }
  return fullUrls;
}

async function download(image){
   console.log('getting image from', image.url)
   
   const p = path.join('images',`${image.name}.png`)
   
   axios.get(`${image.url}`,{responseType: 'stream'})
   .then(response => {
      
      response.data.pipe(fs.createWriteStream(p))
      
      return new Promise((resolve, reject) => {
         response.data.on('end', () => {
            console.log('image saved as', image.name + '.png')
            resolve();
         })
         response.data.on('error', err => {
            reject(err)
         })
      })

   })
   
}

function downloadAll(all = urls1k){
  for(image of all){
     download(image)
  }
}
//  downloadAll(urls1k);


module.exports.urls1k = urls1k
module.exports.downloadAll = downloadAll;


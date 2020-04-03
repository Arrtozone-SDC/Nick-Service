
// const generateExponantialSeeds = require('./customSetsFromBaseUpTo32.js')
// const urls1k =  require('download1kImages')

function generateProductIDs(base, power){
  let justIds = generateExponantialSeeds(base,power);

}

function chooseRandomURLs(urls, max = 10){
  let urlSet = ''
  
  let number = Math.floor(Math.random() * (max + 1)) 
  for(var i = 0; i < number; i++){
    let j = Math.floor(Math.random() * (urls.length))
    urlSet += (urls[j])
  }
  return urlSet;
}

let testRandom = chooseRandomURLs(null, )
console.log(testRandom)
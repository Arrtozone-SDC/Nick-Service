
const generateExponentialSeeds = require('./customSetsUpTo32')
// const urls1k =  require('download1kImages')
const products = generateProducts(26, 5)

function generateProducts(base, power){
  let justIDs = generateExponentialSeeds(base,power);
  let products = appendImageURLStoProducts(10, justIDs);
  return products;
}

function appendImageURLStoProducts(numberOfUrlsPerRecord, productIDs){
  let keyValPairs = []
    for(productID of productIDs){
     let object = {productID : chooseRandomURLs(numberOfUrlsPerRecord)}
     keyValPairs.push(object);
  }
  console.log('productIDs and url pairs list is ', keyValPairs.length, ' items long')
  return keyValPairs;
}

function chooseRandomURLs(urls, max = 10){
  let urlSet = ''
  
  let number = Math.floor(Math.random() * (max + 1)) 
  for(var i = 0; i < number; i++){
    let j = Math.floor(Math.random() * (urls))
    urlSet += (urls[j])
  }
  return urlSet;
}



let testRandom = chooseRandomURLs(null, 10)
console.log(testRandom)
console.log('first product', products[0])

module.exports.products = products;
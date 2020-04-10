
const {generateExponentialSeeds} = require('./customSetsUpTo32')
const {generateBaseSquaredSeeds} = require('./customSetsUpTo32')
const Product = require('./db')

const urls1024 = generateBaseSquaredSeeds(32)
console.log('urls1024 sanity check', urls1024[0], urls1024[500], urls1024[1000])
let justIDs = generateExponentialSeeds(26, 5);

var products = generateProducts()
  
function generateProducts(base, power){
  let productsAppended = appendImageURLStoProducts(10, justIDs);
  return productsAppended;
}

function appendImageURLStoProducts(numberOfUrlsPerRecord, productIDs){
  console.log('adding  up to ' + numberOfUrlsPerRecord + ' image urls to seeds')
  let keyValPairs = []
    for(let i = 0; i < productIDs.length; i++){
     let image = chooseRandomURLs(urls1024,numberOfUrlsPerRecord)
      let object = {name : productIDs[i], image : image}
      // object[productIDs[i]] = image;
     keyValPairs.push(object);
  }
  console.log('productIDs and url pairs list is ', keyValPairs.length, ' items long')
  return keyValPairs;
}

function chooseRandomURLs(urls, max = 10){
  let urlSet = ''
  
  let number = Math.ceil(Math.random() * (max)) 
  for(var i = 0; i < number; i++){
    let j = Math.floor(Math.random() * (urls.length))
    if(urls[j]){
      urlSet += (urls[j])
    }
  }
  return urlSet;
}

let batches = createBatches(products, 100000);


function createBatches(array, batches = 100){
  let batchList = {}
  let slices = {}
  
  let batchsize = Math.floor(array.length/batches)
  console.log(`creating ${batches} batches of ${batchsize} items each`)
    for(let i = 0; i < batches; i++){
      if(i < batches - 1){
        batchList[i] = {start: i * batchsize , end : ((i + 1) * batchsize)}
      }else{
        batchList[i] = {start: i * batchsize , end : array.length - 1}
      }

    }
    for(key in batchList){
      slices[key] = array.slice(batchList[key].start, batchList[key].end)
    }
    products = []
  return slices;
}





console.log('first product', batches[0][0], ' last product', batches[0][batches[0].length - 1])

module.exports.batches = batches;
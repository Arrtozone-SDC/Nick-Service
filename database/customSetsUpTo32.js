const chars = [ 
    '1','2','3','4','5','6','a','b','c','d','e',
    'f','g','h','i','j','k','l','m','n','o','p',
    'q','r','s','t','u','v','w','x','y','z' 
    ];

function generateBaseSquaredSeeds(base = 32){
   
    let seeds = [];
        
    let start = chars.length - base
     
    for(var i = start; i < chars.length; i++){
        for (var j = start; j < chars.length; j++){
            seeds.push(chars[i] + chars[j])
        }
    }
        
    return seeds;
}

function generateExponentialSeeds(base, desiredPowerOfBase = 5){
    let pow = desiredPowerOfBase;
    if(pow === 0){
       return [];
    }
    if(pow === 1){
       return chars.slice();
    }
    let squaredSet = generateBaseSquaredSeeds(base)
    let finalSet = [];
    if(pow === 2){
      return  squaredSet;
    } 
    if(pow === 4){
      finalSet = squaredSet;
        finalSet = evenPowerSets(finalSet.slice());
      console.log('even power sets done')
      return finalSet;
    }else if (pow === 5){
       let baseChars = chars.slice(32 - base)
       console.log(baseChars)
       let penultSet = evenPowerSets(squaredSet)
       for(char of baseChars){
          for(set of penultSet){
            finalSet.push(char + set);
          }
       }
    }
      
  function evenPowerSets(seeds){
    console.log('Even Power Sets')
    let newSquaredSet = generateBaseSquaredSeeds(base);
    let workingSet = [];
    console.log(seeds.length)
    console.log('newSquaredSet', newSquaredSet.length)
        for(pair of seeds){
            for(twin of newSquaredSet){
            workingSet.push(pair + twin);
        }
    }
    console.log(workingSet.length)
    return workingSet;
    }
    return finalSet;
}

// let test1Million = generateExponantialSeeds(26,5)
// console.log(test1Million[0], test1Million[675], test1Million[(676 * 676 * 26 - 1 )])
// console.log(test1Million.length)

module.exports.generateBaseSquaredSeeds = generateBaseSquaredSeeds;
module.exports.generateExponentialSeeds = generateExponentialSeeds;
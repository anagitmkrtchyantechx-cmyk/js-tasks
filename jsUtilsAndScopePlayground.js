//PART A ` CREATING METHODS

//merging two strings
function mergingStrings(string1, string2) {
  let i = 0;
  let mergedString = "";

  while (i < string1.length && i < string2.length) {
    mergedString += string1.charAt(i);
    mergedString += string2.charAt(i);
    i++;
  }

  if (i < string1.length) {
    mergedString += string1.substring(i);
  } else if (i < string2.length) {
    mergedString += string2.substring(i);
  }

  return mergedString;
}
console.log(mergingStrings("Anahit", "Mkrtchyan"));   //AMnkarhticthyan


//finding max value from array
const findMax = function (numbers) {
  let max = numbers[0];  
  for(let n of numbers){
    if(max < n){
        max = n;
    }
  }
  return max;
};
console.log(findMax([5,9,8,2,3,65,78,92]));  //92


//finding digit is simple or composite
const isCompositeNumber = (num) => {
    for(let i = 2; i < Math.sqrt(num); i ++){
        if(num % i == 0){
            return true;
        }
    }
    return false;
}
console.log(isCompositeNumber(111));  //true


//mergig two sorted arrays
function mergingSortedArrays(arr1, arr2){
    let i = 0;
    let j = 0;
    let k = 0;
    let arrMerged = [];
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      arrMerged.push(arr1[i]);
      i++;
    } else {
      arrMerged.push(arr2[j]);
      j++;
    }
  }
  while (i < arr1.length) {
    arrMerged.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    arrMerged.push(arr2[j]);
    j++;
  }
   return arrMerged;
}
console.log(mergingSortedArrays([1,3,5,7,9], [2,4,6,8]));  //1 2 3 4 5 6 7 8 9



//removing  0-s from array
const arrayWithoutZeros = function(arr) {
    let arrWithoutZeros = [];
    let i = 0;
    for(let a of arr){
        if(a != 0){
          arrWithoutZeros[i] = a;
          i++;
        }
    }
    return arrWithoutZeros;
} 
console.log(arrayWithoutZeros([0,1,0,2,3,5,0,9,0]));  //1 2 3 5 9



const isEven = (n) => n % 2 == 0;
console.log(isEven(11));  // false





//-----------------------------------------------------------------------------------------------------------
//PART B ` SCOPE SIMULATION AND ANALYSIS


//declare global variable
let countGlobal = 88;

// method explain scopes
function scopeDemonstrate() {
  //nested method variable(var)
  var nestedMethodVar = "I am boring VAR )))";

  if (true) {
    // declare block-scoped variables
    let letBlockVariable = "I am block scoped (as let)";
    const constBlockVariable = "I am block scoped (as const)";


    //printing
    console.log("Inside block:");
    console.log(countGlobal);  
    console.log(nestedMethodVar);    
    console.log(letBlockVariable);       
    console.log(constBlockVariable);     
  }

  // Nested function trying to access everything
  function nested() {
    console.log("Inside nested function:");
    console.log(countGlobal);  
    console.log(nestedMethodVar);  
    //will throw ReferenceError  
    // console.log(blockLet);    
    // console.log(blockConst);  
  }

  nested();
}

scopeDemonstrate();
console.log("Outside function:");
console.log(countGlobal);   
//will throw ReferenceError  
//console.log(nestedMethodVar);  





//-----------------------------------------------------------------------------------------------------------
//PART C ` HOISTING  AND  TDZ DEBUGGER


// var hoisting -- ReferenceError: Cannot access 'variableVar' before initialization
console.log("var before declaration:", variableVar); // undefined (hoisted)
var variableVar = 10;
console.log("var after declaration:", variableVar); 

// let hoisting -- ReferenceError: Cannot access 'variableLet' before initialization
console.log("let before declaration:", variableLet); 
let variableLet = 20;
console.log("let after declaration:", variableLet);  

// const hoisting -- ReferenceError: Cannot access 'variableConst' before initialization
console.log("const before declaration:", variableConst); 
const variableConst = 30;
console.log("const after declaration:", variableConst); 

// method declaration hoisting -- work appropriately
sayHello(); 
function sayHello() {
  console.log("Hello from hoisted function!");
}

// method expression hoisting ---  
// 1) ReferenceError: Cannot access 'sayHi' before initialization
// 2) works after declaration
sayHi(); 
let sayHi = function() {
  console.log("Hi from function expression!");
};
sayHi(); 
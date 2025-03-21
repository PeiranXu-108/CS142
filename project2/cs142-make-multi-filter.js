/* eslint-disable strict */
function cs142MakeMultiFilter(originalArray) {
    
    let currentArray = originalArray.slice();
    
    return function arrayFilterer(filterCriteria, callback) {
        if (filterCriteria === undefined) {
            return currentArray;
        }
        
        if (typeof filterCriteria !== 'function') {
            return currentArray;
        }
        
        currentArray = currentArray.filter(filterCriteria);
        
        if (typeof callback === 'function') {
            callback.call(originalArray, currentArray);
        }
        
        return arrayFilterer;
    };
}

// Example usage:
var arrayFilterer1 = cs142MakeMultiFilter([1, 2, 3]);
arrayFilterer1(function (elem) {
  return elem !== 2;
}, function (currentArray) {
  console.log(this); // prints [1, 2, 3]
  console.log(currentArray); // prints [1, 3]
});

arrayFilterer1(function (elem) {
  return elem !== 3;
});

var currentArray = arrayFilterer1();
console.log("currentArray", currentArray); // prints [1]

function filterTwos(elem) { return elem !== 2; }
function filterThrees(elem) { return elem !== 3; }
var arrayFilterer2 = cs142MakeMultiFilter([1, 2, 3]);
var currentArray2 = arrayFilterer2(filterTwos)(filterThrees)();
console.log("currentArray2", currentArray2); // prints [1]

var arrayFilterer3 = cs142MakeMultiFilter([1, 2, 3]);
var arrayFilterer4 = cs142MakeMultiFilter([4, 5, 6]);
console.log(arrayFilterer3(filterTwos)()); // prints [1, 3]
console.log(arrayFilterer4(filterThrees)()); // prints [4, 5, 6]

import './tree';

// Create an array of random numbers given size of array
function createRandomArray (size) {
  const array = [];
  let x;
  while (array.length < size) {
    x = Math.floor(Math.random() * size);
    if (!array.includes(x)) array.push(x);
  };

  return array;
};

function mergeSort (arr) {
  if (arr.length < 2) {
    return arr;
  } else {
    let left = mergeSort(arr.slice(0, arr.length / 2));
    let right = mergeSort(arr.slice(arr.length / 2));
    let sorted = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while ((leftIndex < left.length) && (rightIndex < right.length)) {
      if(left[leftIndex] < right[rightIndex]){
        sorted.push(left[leftIndex++])
      } else {
        sorted.push(right[rightIndex++]);
      }
    }
    if (leftIndex >= left.length) {
      sorted = sorted.concat(right.slice(rightIndex))
    } else {
      sorted = sorted.concat(left.slice(leftIndex));
    }
    return sorted;
  }
};

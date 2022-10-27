

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

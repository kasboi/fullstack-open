const reverse = (str) => {
  return str
    .split('')
    .reverse()
    .join('')
}

const average = (arr) => {
  const sum = arr.reduce((sum, item) => sum + item)

  return sum / arr.length
}

console.log(average([1,2,3]));

module.exports = {
  reverse,
  average
}
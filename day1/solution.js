const fs = require('fs')
const path = require('path')

// read the file and trim the excess whitespace at the end
const rawFile = fs.readFileSync(path.join(__dirname, '/input.txt')).toString('UTF8').trim()

// split the groups into arrays, parse the numbers as ints, sum the arrays, and sort the sums largest to smallest
const calories = rawFile
  .split('\n\n') // split the groups
  .map((elf) => elf
    .split('\n') // turn each group into arrays
    .map((caloryString) => parseInt(caloryString)) // parse the strings into numbers
    .reduce((p, c) => p + c, 0)) // sum the arrays of numbers
  .sort(function (a, b) { return b - a }) // reverse sort (largest to smallest)

console.log('Max:', Math.max(...calories))
console.log('Sum of largest 3', calories.slice(0, 3).reduce((p, c) => p + c, 0))

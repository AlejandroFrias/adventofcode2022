let fs = require("fs")

const rawFile = fs.readFileSync('input.txt').toString('UTF8').trim()
const calories = rawFile.split('\n\n').map((elf) => elf.split('\n').map((caloryString)=>parseInt(caloryString)).reduce((p, c) => p + c, 0)).sort(function(a, b){return b - a})

console.log(calories.slice(0, 3).reduce((p,c)=>p+c,0))

//Sum an array of numbers in node js?
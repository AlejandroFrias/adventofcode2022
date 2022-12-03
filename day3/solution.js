const fs = require('fs')
const path = require('path')

// read the file and trim the excess whitespace at the end
const rawFile = fs.readFileSync(path.join(__dirname, '/input.txt')).toString('UTF8').trim()

// split the file into rucksacks, one per line
const rucksacks = rawFile.split('\n')

// Using Sets, find the intersection of each rucksacks' two compartments and add that to the collection of "errors"
const errors = []
rucksacks.forEach((rucksack) => {
  const [one, two] = [rucksack.slice(0, rucksack.length / 2), rucksack.slice(rucksack.length / 2, rucksack.length)]
  const duplicates = new Set([...(new Set(one))].filter(x => (new Set(two)).has(x)))
  duplicates.forEach((value) => errors.push(value))
})

// Using `String.charCodeAt()` to convert characters to numbers and then a little math to adjust for the scoring required by the problem
function valueOfChar (char) {
  const code = char.charCodeAt()
  let value = null
  if (char === char.toUpperCase()) {
    value = code - 64 + 26
  } else {
    value = code - 96
  }
  return value
}
const totalPart1 = errors.reduce((a, b) => a + valueOfChar(b), 0)

console.log('Part 1:', totalPart1)

const groups = []
for (let i = 0; i < rucksacks.length / 3; i++) {
  groups.push(rucksacks.slice(i * 3, i * 3 + 3))
}

function findBadge (group) {
  const [one, two, three] = [group[0], group[1], group[2]]
  const oneSet = new Set(one)
  const twoSet = new Set(two)
  const threeSet = new Set(three)
  const intersection = new Set([...oneSet].filter(x => twoSet.has(x) && threeSet.has(x)))
  return intersection.values().next().value
}
const totalPart2 = groups.reduce((a, group) => a + valueOfChar(findBadge(group)), 0)
console.log('Part 2:', totalPart2)

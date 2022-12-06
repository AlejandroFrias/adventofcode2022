const fs = require('fs')
const path = require('path')
// read the file and trim the excess whitespace at the end

const rawFile = fs.readFileSync(path.join(__dirname, '/input.txt')).toString('UTF8')
const [rawStacks, rawProcedures] = rawFile.split('\n\n').map((v) => v.split('\n'))

const numberOfStacks = (rawStacks[0].length + 1) / 4
const stacks = []
Array.from(Array(numberOfStacks)).forEach((_) => stacks.push([]))

for (let stackIndex = 0; stackIndex < rawStacks.length - 1; stackIndex++) {
  const rawStack = rawStacks[stackIndex]
  for (let i = 0; i < numberOfStacks; i++) {
    const item = rawStack[1 + (i * 4)]
    if (item !== ' ') {
      stacks[i].push(item)
    }
  }
}
Array.from(Array(stacks.length).keys()).forEach((i) => { stacks[i] = stacks[i].reverse() })
console.log(stacks)

function applyProcedure (stacks, number, from, to) {
  const containers = stacks[from - 1].slice(stacks[from - 1].length - number)
  stacks[from - 1] = stacks[from - 1].slice(0, stacks[from - 1].length - number)
  // part 1
  // containers.reverse().forEach((container) => stacks[to - 1].push(container))
  containers.forEach((container) => stacks[to - 1].push(container))
}

rawProcedures.forEach((rawProcedure) => {
  const procedure = rawProcedure.match(/move (?<number>\d+) from (?<from>\d+) to (?<to>\d+)/).groups
  const number = parseInt(procedure.number)
  const from = parseInt(procedure.from)
  const to = parseInt(procedure.to)
  applyProcedure(stacks, number, from, to)
  console.log(rawProcedure, stacks)
})

console.log(stacks.map((stack) => stack.reverse()[0]).join(''))

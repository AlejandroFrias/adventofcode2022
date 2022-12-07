const fs = require('fs')
const path = require('path')
// read the file and trim the excess whitespace at the end

const terminalOutput = fs.readFileSync(path.join(__dirname, '/input.txt')).toString('UTF8').trim().split('\n')
const filesystem = {}
const currentDirectory = []
terminalOutput.forEach((line) => {
  const outputParts = line.split(' ')
  if (line.startsWith('$')) {
    const commandParts = outputParts.slice(1)
    if (commandParts[0] === 'cd') {
      const dir = commandParts[1]
      if (dir === '..') {
        currentDirectory.pop()
      } else {
        currentDirectory.push(dir)
      }
    } else if (commandParts[0] === 'ls') {
      filesystem[currentDirectory] = 0
    }
  } else {
    if (outputParts[0] !== 'dir') {
      const fileSize = parseInt(outputParts[0])
      filesystem[currentDirectory] += fileSize
    }
  }
})
const filesystemEntries = Object.entries(filesystem)
const dirSizes = []
for (const [dirName, dirSize] of filesystemEntries) {
  let subdirTotalSize = 0
  filesystemEntries.forEach((entry) => {
    const [name, size] = entry
    if (name.startsWith(dirName) && name !== dirName) {
      subdirTotalSize += size
    }
  })
  dirSizes.push(dirSize + subdirTotalSize)
}

// sum all values less that 100,000
console.log('Part1:', dirSizes.filter((value) => value <= 100_000).reduce((sum, value) => sum + value, 0))

// find minimum value that is at least as big as the space needed
const spaceNeeded = 30_000_000 - (70_000_000 - dirSizes[0])
const candidateDirectories = dirSizes.filter((size) => size >= spaceNeeded)
console.log('Part2:', Math.min(...candidateDirectories))

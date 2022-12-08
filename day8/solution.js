const fs = require('fs')
const path = require('path')
// read the file and trim the excess whitespace at the end

const forest = fs.readFileSync(path.join(__dirname, '/input.txt')).toString('UTF8').trim().split('\n').map((row) => row.split('').map((tree) => parseInt(tree)))

// Check visibility from the west (left side)
const visibleTrees = new Set()
for (let rowIndex = 1; rowIndex < forest.length - 1; rowIndex++) {
  const row = forest[rowIndex]
  let highestTree = row[0]
  for (let colIndex = 1; colIndex < row.length - 1; colIndex++) {
    const treeHeight = row[colIndex]
    if (treeHeight > highestTree) {
      visibleTrees.add([rowIndex, colIndex].toString())
      highestTree = treeHeight
    }
  }
}
// Check visibility from the east (right side)
for (let rowIndex = 1; rowIndex < forest.length - 1; rowIndex++) {
  const row = forest[rowIndex]
  let highestTree = row[row.length - 1]
  for (let colIndex = row.length - 2; colIndex > 0; colIndex--) {
    const treeHeight = row[colIndex]
    if (treeHeight > highestTree) {
      visibleTrees.add([rowIndex, colIndex].toString())
      highestTree = treeHeight
    }
  }
}
// Check visibility from the north (top side)
for (let colIndex = 1; colIndex < forest[0].length - 1; colIndex++) {
  let highestTree = forest[0][colIndex]
  for (let rowIndex = 1; rowIndex < forest.length - 1; rowIndex++) {
    const treeHeight = forest[rowIndex][colIndex]
    if (treeHeight > highestTree) {
      visibleTrees.add([rowIndex, colIndex].toString())
      highestTree = treeHeight
    }
  }
}
// Check visibility from the south (bottom side)
for (let colIndex = 1; colIndex < forest[0].length - 1; colIndex++) {
  let highestTree = forest[forest.length - 1][colIndex]
  for (let rowIndex = forest.length - 2; rowIndex > 0; rowIndex--) {
    const treeHeight = forest[rowIndex][colIndex]
    if (treeHeight > highestTree) {
      visibleTrees.add([rowIndex, colIndex].toString())
      highestTree = treeHeight
    }
  }
}
const numberOfTreesOnEdge = (forest.length * 2) + ((forest[0].length - 2) * 2)
console.log('Part1:', visibleTrees.size + numberOfTreesOnEdge)

function getScenicScore ({ forest, rowIndex, colIndex }) {
  let scenicScore = 1
  const treeHeight = forest[rowIndex][colIndex]
  let treesToTheWest = 0
  for (let i = colIndex - 1; i >= 0; i--) {
    treesToTheWest++
    if (forest[rowIndex][i] >= treeHeight) {
      break
    }
  }
  scenicScore = scenicScore * treesToTheWest

  let treesToTheEast = 0
  for (let i = colIndex + 1; i < forest[0].length; i++) {
    treesToTheEast++
    if (forest[rowIndex][i] >= treeHeight) {
      break
    }
  }
  scenicScore = scenicScore * treesToTheEast

  let treesToTheSouth = 0
  for (let i = rowIndex + 1; i < forest.length; i++) {
    treesToTheSouth++
    if (forest[i][colIndex] >= treeHeight) {
      break
    }
  }
  scenicScore = scenicScore * treesToTheSouth

  let treesToTheNorth = 0
  for (let i = rowIndex - 1; i >= 0; i--) {
    treesToTheNorth++
    if (forest[i][colIndex] >= treeHeight) {
      break
    }
  }
  scenicScore = scenicScore * treesToTheNorth
  //   console.log({ treesToTheEast, treesToTheNorth, treesToTheSouth, treesToTheWest })

  return scenicScore
}

let highestScenicScore = 0
for (let rowIndex = 0; rowIndex < forest.length; rowIndex++) {
  for (let colIndex = 0; colIndex < forest[0].length; colIndex++) {
    const scenicScore = getScenicScore({ forest, rowIndex, colIndex })
    // console.log({ rowIndex, colIndex, scenicScore })
    if (scenicScore > highestScenicScore) highestScenicScore = scenicScore
  }
}
console.log('Part2:', highestScenicScore)


const fs = require('fs')
const path = require('path')

// read the file and trim the excess whitespace at the end
const rawFile = fs.readFileSync(path.join(__dirname, '/input.txt')).toString('UTF8').trim()

// Parse the input an array, each item being a pair of pairs
// e.g.
// [ [ 46, 74 ], [ 75, 94 ] ],
// [ [ 60, 61 ], [ 61, 86 ] ],
// [ [ 57, 66 ], [ 60, 84 ] ],
const sectionAssignments = rawFile //         "46-74,75-94\n60-61,61-86"
  .split('\n') //                             ["46-74,75-94", "60-61,61-86"]
  .map((line) => line //                      "46-74,75-94"
    .split(',') //                            ["46-74", "75-94"]
    .map((section) => section //              "46-74"
      .split('-') //                          ["46", "74"]
      .map((numStr) => parseInt(numStr)))) // [46, 74]

function isSubset (section1, section2) {
  return section1[0] >= section2[0] && section1[1] <= section2[1]
}

let countPart1 = 0
sectionAssignments.forEach((sectionAssignmentPair) => {
  const [section1, section2] = sectionAssignmentPair
  if (isSubset(section1, section2) || isSubset(section2, section1)) {
    countPart1++
  }
})
console.log('Part1:', countPart1)

function isIntersecting (section1, section2) {
  return section1[0] <= section2[1] && section1[1] >= section2[0]
}

let countPart2 = 0
sectionAssignments.forEach((sectionAssignmentPair) => {
  const [section1, section2] = sectionAssignmentPair
  if (isIntersecting(section1, section2)) {
    countPart2++
  }
})
console.log('Part2:', countPart2)

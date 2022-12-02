const fs = require('fs')
const path = require('path')

const symbolToValue = {
  X: 1,
  Y: 2,
  Z: 3
}

const xyz2abc = {
  X: 'A',
  Y: 'B',
  Z: 'C'
}
const symbolToDefeat = {
  A: 'C',
  B: 'A',
  C: 'B'
}

function calculateValueOfHandPart1 (hand) {
  const [opponent, mine] = hand.split(' ')
  const mineConverted = xyz2abc[mine]
  let roundValue = 0
  if (opponent === mineConverted) {
    roundValue = 3
  } else if (opponent === symbolToDefeat[mineConverted]) {
    roundValue = 6
  }
  return roundValue + symbolToValue[mine]
}

// read the file and trim the excess whitespace at the end
const rawFile = fs.readFileSync(path.join(__dirname, '/input.txt')).toString('UTF8').trim()

const handValuesPart1 = rawFile.split('\n').map((hand) => calculateValueOfHandPart1(hand))

console.log('Part1:', handValuesPart1.reduce((a, b) => a + b, 0))

const hand2value = {
  'A X': 0 + 3,
  'A Y': 3 + 1,
  'A Z': 6 + 2,
  'B X': 0 + 1,
  'B Y': 3 + 2,
  'B Z': 6 + 3,
  'C X': 0 + 2,
  'C Y': 3 + 3,
  'C Z': 6 + 1
}

const handValuesPart2 = rawFile.split('\n').map((hand) => hand2value[hand])

console.log('Part2:', handValuesPart2.reduce((a, b) => a + b, 0))

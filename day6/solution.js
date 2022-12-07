const fs = require('fs')
const path = require('path')
// read the file and trim the excess whitespace at the end

const datastreamBuffer = fs.readFileSync(path.join(__dirname, '/input.txt')).toString('UTF8').trim()
console.log(datastreamBuffer)
let startOfPacketMarker = []
for (let i = 0; i < datastreamBuffer.length; i++) {
//   if (startOfPacketMarker.length === 4) {
//     console.log('Part1:', i)
  if (startOfPacketMarker.length === 14) {
    console.log('Part2:', i)
    break
  }
  const indexInMarker = startOfPacketMarker.findIndex((value) => value === datastreamBuffer[i])
  if (indexInMarker !== -1) {
    startOfPacketMarker = startOfPacketMarker.slice(indexInMarker + 1)
  }
  startOfPacketMarker.push(datastreamBuffer[i])
}

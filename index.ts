import * as Commander from 'commander'
import * as Fs from 'node:fs'

const Program = new Commander.Command()

Program.option('--file <FILE>', 'a text file to read')

Program.parse()

// eslint-disable-next-line @typescript-eslint/naming-convention
const Options = Program.opts() as { file: string }

let Numbers: number[][] = []
Fs.readFileSync(Options.file, 'utf-8').split('\n').forEach(Line => {
  Numbers.push(Line.split('-').map(Num => Number(Num)))
})
let TensorNumbersMap: Map<number, number> = new Map()

Numbers.forEach(Nums => {
  Nums.forEach(Num => {
    TensorNumbersMap.set(Num, TensorNumbersMap.get(Num) ? TensorNumbersMap.get(Num) + 1 : 1)
  })
})

let TensorNumbers = Array.from(TensorNumbersMap)
TensorNumbers.sort((A, B) => {
  return A[1] < B[1] ? 1 : -1
})

for (let I = 0; I < 6; I++) {
  console.log(TensorNumbers[I][0])
}
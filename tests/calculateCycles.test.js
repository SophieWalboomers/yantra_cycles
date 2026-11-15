import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { calculateCycles } from '../src/utils/calculateCycles.js'

const cycleData = JSON.parse(
  await readFile(new URL('../src/assets/cycleInfo.json', import.meta.url), 'utf8'),
)
const birthday = '1998-12-09'

const cases = [
  { date: new Date(2025, 0, 24), expected: { yearCycle: 4, monthCycle: 7, dayCycle: 4 } },
  { date: new Date(2025, 1, 1), expected: { yearCycle: 4, monthCycle: 8, dayCycle: 9 } },
  { date: new Date(2025, 10, 14), expected: { yearCycle: 4, monthCycle: 8, dayCycle: 4 } },
  { date: new Date(2025, 10, 15), expected: { yearCycle: 5, monthCycle: 6, dayCycle: 3 } },
]

for (const { date, expected } of cases) {
  test(`calculates cycles for ${date.toDateString()}`, () => {
    const { yearCycle, monthCycle, dayCycle } = calculateCycles(birthday, date, cycleData)

    assert.deepEqual({ yearCycle, monthCycle, dayCycle }, expected)
  })
}

test('calculates cycles for a birthday of 6 Jan 1990 on 15 Nov 2026', () => {
  const { yearCycle, monthCycle } = calculateCycles('1990-01-06', new Date(2026, 10, 15), cycleData)

  assert.deepEqual({ yearCycle, monthCycle }, { yearCycle: 1, monthCycle: 2 })
})

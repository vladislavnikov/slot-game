import { test, expect } from "bun:test";
import { WinChecker } from "../src/models/WinChecker";

const lines = [
  [0, 0, 0, 0, 0], // top row
  [1, 1, 1, 1, 1], // middle row
];
const noPay = [0, 0, 0, 0, 0];
const symbols = {
  1: noPay, 2: noPay, 3: [0, 0, 30, 60, 150], 4: noPay, 5: noPay,
  6: noPay, 7: noPay, 8: noPay, 9: noPay,
};
const checker = new WinChecker(lines, symbols);

test("three same symbols in a row pay the paytable value x bet", () => {
  const screen = [
    [6, 4, 6, 7, 6],
    [3, 3, 3, 5, 1], // middle row: 3 3 3 5 1
    [1, 8, 2, 6, 3],
  ];
  expect(checker.check(screen, 2)).toEqual([
    { lineIndex: 1, symbol: 3, count: 3, payout: 60 },
  ]);
});

test("five same symbols pay the highest value", () => {
  const screen = [
    [6, 4, 6, 7, 6],
    [3, 3, 3, 3, 3],
    [1, 8, 2, 6, 3],
  ];
  expect(checker.check(screen, 1)).toEqual([
    { lineIndex: 1, symbol: 3, count: 5, payout: 150 },
  ]);
});

test("two same symbols pay nothing", () => {
  const screen = [
    [6, 4, 6, 7, 6],
    [3, 3, 5, 5, 1],
    [1, 8, 2, 6, 3],
  ];
  expect(checker.check(screen, 1)).toEqual([]);
});

test("the run must start from the first reel", () => {
  const screen = [
    [6, 4, 6, 7, 6],
    [1, 3, 3, 3, 1], // three 3s, but not from the first reel
    [1, 8, 2, 6, 3],
  ];
  expect(checker.check(screen, 1)).toEqual([]);
});

test("several lines can win at the same time", () => {
  const screen = [
    [3, 3, 3, 7, 6],
    [3, 3, 3, 5, 1],
    [1, 8, 2, 6, 3],
  ];
  expect(checker.check(screen, 1)).toHaveLength(2);
});

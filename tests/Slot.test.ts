import { test, expect, spyOn, afterEach } from "bun:test";
import { Slot } from "../src/models/Slot";
import configuration from "../src/config/configuration";

afterEach(() => {
  (Math.random as any).mockRestore?.();
});

test("spin returns a screen with the configured size", () => {
  const result = new Slot(configuration).spin(1);

  expect(result.reelPositions).toHaveLength(configuration.reelsCount);
  expect(result.screen).toHaveLength(configuration.rowsCount);
  for (const row of result.screen) {
    expect(row).toHaveLength(configuration.reelsCount);
  }
});

test("total bet is bet per line x number of lines", () => {
  const result = new Slot(configuration).spin(2);

  expect(result.bet).toBe(2);
  expect(result.totalBet).toBe(2 * configuration.lines.length); // 10
});

test("with every reel stopped at position 0 the result is predictable", () => {
  spyOn(Math, "random").mockReturnValue(0);
  const result = new Slot(configuration).spin(1);

  // top two rows are all 1s, bottom row is 2 5 9 8 5
  expect(result.reelPositions).toEqual([0, 0, 0, 0, 0]);
  expect(result.screen).toEqual([
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [2, 5, 9, 8, 5],
  ]);

  // lines 1, 2 and 4 are five 1s = 3 x 50
  expect(result.lineWins).toHaveLength(3);
  expect(result.totalWin).toBe(150);
});

test("the win scales with the bet", () => {
  spyOn(Math, "random").mockReturnValue(0);
  const result = new Slot(configuration).spin(2);

  expect(result.totalWin).toBe(300);
});

test("total win is the sum of the line payouts", () => {
  const result = new Slot(configuration).spin(1);
  const sum = result.lineWins.reduce((total, win) => total + win.payout, 0);

  expect(result.totalWin).toBe(sum);
});

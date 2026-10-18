import { test, expect, spyOn, afterEach } from "bun:test";
import { Reel } from "../src/models/Reel";

afterEach(() => {
  (Math.random as any).mockRestore?.();
});

test("getSymbols returns the symbols starting from the position", () => {
  const reel = new Reel([5, 6, 7, 8]);
  expect(reel.getSymbols(1, 3)).toEqual([6, 7, 8]);
});

test("getSymbols wraps around the end of the strip", () => {
  const reel = new Reel([5, 6, 7, 8]);
  expect(reel.getSymbols(2, 3)).toEqual([7, 8, 5]);
});

test("spin returns a position inside the strip", () => {
  const reel = new Reel([5, 6, 7, 8]);
  for (let i = 0; i < 1000; i++) {
    const position = reel.spin();
    expect(position).toBeGreaterThanOrEqual(0);
    expect(position).toBeLessThan(4);
  }
});

test("spin uses Math.random to pick the position", () => {
  spyOn(Math, "random").mockReturnValue(0.5);
  expect(new Reel([5, 6, 7, 8]).spin()).toBe(2); // floor(0.5 * 4)
});

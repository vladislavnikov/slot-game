import type { LineWin } from "../types";

export class WinChecker {
  constructor(
    private lines: number[][],
    private symbols: Record<number, number[]>,
  ) {}

  check(screen: number[][]): LineWin[] {
    const wins: LineWin[] = [];

    for (let i = 0; i < this.lines.length; i++) {
      const line = this.lines[i];
      const symbol = screen[line[0]][0];

      let count = 1;
      while (count < line.length && screen[line[count]][count] === symbol) {
        count++;
      }

      const payout = this.symbols[symbol][count - 1];
      if (payout > 0) {
        wins.push({ lineIndex: i, symbol, count, payout });
      }
    }

    return wins;
  }
}

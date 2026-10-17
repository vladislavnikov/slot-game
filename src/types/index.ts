//configuration.ts exports
export interface GameConfig {
  reelsCount: number;
  rowsCount: number;
  symbols: Record<number, number[]>;
  lines: number[][];
  reels: number[][];
}

export interface SpinResult {
  reelPositions: number[];
  screen: number[][];
  lineWins: LineWin[];
  totalWin: number;
}

export interface LineWin {
  lineIndex: number;
  symbol: number;
  count: number;
  payout: number;
}

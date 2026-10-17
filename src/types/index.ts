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
}

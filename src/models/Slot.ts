import { Reel } from "./Reel";
import type { GameConfig, SpinResult } from "../types";
import { WinChecker } from "./WinChecker";

export class Slot {
  private reels: Reel[]; //columns
  private rowsCount: number;
  private checker: WinChecker;

  constructor(private config: GameConfig) {
    this.reels = config.reels.map((strip) => new Reel(strip));
    this.rowsCount = config.rowsCount;
    this.checker = new WinChecker(config.lines, config.symbols);
  }

  spin(): SpinResult {
    const reelPositions = this.reels.map((reel) => reel.spin());
    const columns = this.reels.map((reel, i) =>
      reel.getSymbols(reelPositions[i], this.rowsCount),
    );

    const screen: number[][] = [];
    for (let row = 0; row < this.rowsCount; row++) {
      screen.push(columns.map((column) => column[row]));
    }

    const lineWins = this.checker.check(screen);
    const totalWin = lineWins.reduce((sum, win) => sum + win.payout, 0);

    return { reelPositions, screen, lineWins, totalWin };
  }
}

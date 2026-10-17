import { Reel } from "./Reel";
import type { GameConfig, SpinResult} from "../types";

export class Slot {
  private reels: Reel[]; //columns
  private rowsCount: number;

  constructor(private config: GameConfig) {
    this.reels = config.reels.map((strip) => new Reel(strip));
    this.rowsCount = config.rowsCount;
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

    return { reelPositions, screen };
  }
}

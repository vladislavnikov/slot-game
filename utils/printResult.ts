import type { SpinResult } from "../src/types";

export function printResult(result: SpinResult): void {
  console.log(`Bet per line: ${result.bet} | Total bet: ${result.totalBet}`);
  console.log(`Reel positions: ${result.reelPositions.join(", ")}`);

  console.log("Screen:");
  for (const row of result.screen) {
    console.log("  " + row.join(" | "));
  }

  console.log("Lines payout:");
  if (result.lineWins.length === 0) {
    console.log("no winning lines");
  }

  for (const win of result.lineWins) {
    console.log(
      `Line ${win.lineIndex + 1}: ${win.count} * symbol ${win.symbol} = ${win.payout}`,
    );
  }

  console.log(`Total win: ${result.totalWin}`);
}

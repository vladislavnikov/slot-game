import type { Slot } from "../src/models/Slot";

type SimulateParams = {
  slot: Slot;
  spins: number;
  bet: number; // bet per line
};

export function simulate({ slot, spins, bet }: SimulateParams): void {
  let totalBet = 0;
  let totalWin = 0;

  const start = Date.now();

  for (let i = 0; i < spins; i++) {
    const result = slot.spin(bet);
    totalBet += result.totalBet;
    totalWin += result.totalWin;
  }

  const seconds = (Date.now() - start) / 1000;

  console.log("Simulation");
  console.log(`Spins: ${spins}`);
  console.log(`Total bet: ${totalBet}`);
  console.log(`Total win: ${totalWin}`);
  console.log(`RTP: ${((totalWin / totalBet) * 100).toFixed(2)}%`);
  console.log(`Time: ${seconds} s`);
  console.log(`Speed: ${Math.round(spins / seconds)} spins/second`);
}

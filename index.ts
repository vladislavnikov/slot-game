import configuration from "./src/config/configuration";
import { Slot } from "./src/models/Slot";
import { printResult } from "./utils/printResult";
import { simulate } from "./utils/simulate";

// bun start -- <spins> <bet per line>   e.g. bun start -- 1000000 2
const spins = Number(process.argv[2] ?? 1);
const bet = Number(process.argv[3] ?? 1);

const slot = new Slot(configuration);

if (!(bet > 0)) {
  console.error("Bet per line must be greater than 0");
} else {
  printResult(slot.spin(bet));
}

console.log("\n");

if (!(spins > 0)) {
  console.error("Spins must be greater than 0");
} else {
  simulate({ slot, spins, bet });
}

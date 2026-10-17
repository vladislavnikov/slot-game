import configuration from "./src/config/configuration";
import { Slot } from "./src/models/Slot";
import { printResult } from "./utils/printResult";
import { simulate } from "./utils/simulate";

const spins = Number(process.argv[2] ?? 1);

const slot = new Slot(configuration);

printResult(slot.spin());

console.log("\n");

simulate({
  slot,
  spins,
  betPerSpin: configuration.lines.length
});

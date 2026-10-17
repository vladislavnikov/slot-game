import configuration from "./src/config/configuration";
import { Slot } from "./src/models/Slot";
import { printResult } from "./utils/printResult";


const slot = new Slot(configuration);
printResult(slot.spin());
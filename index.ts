import configuration from "./src/config/configuration";
import { Slot } from "./src/models/Slot";


const slot = new Slot(configuration);
console.log(slot.spin());
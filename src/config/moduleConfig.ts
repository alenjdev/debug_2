import { ModuleConfig } from "../types/ModuleConfig";

export const moduleConfig: ModuleConfig = {
  debugItems: [
    {
      name: "Estop status",
      state: "Enable" || "Disable",
    },
    {
      name: "Safety system power status",
      state: "On" || "Off",
    },
    {
      name: "CAN controller power",
      state: "On" || "Off",
    },
  ],
};

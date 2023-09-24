import { Signale } from "signale";

const log = new Signale({
  types: {
    successComamnd: { badge: "√", color: "blue", label: "Command" },
    successEvent: { badge: "√", color: "yellow", label: "Event" },
    successComponent: { badge: "√", color: "cyan", label: "Component" },
  },
});

export { log };

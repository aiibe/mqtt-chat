import { createContext } from "react";
import { ContextType } from "./Types";

export const MQTTContext = createContext({
  client: null,
  clientId: "",
} as ContextType);

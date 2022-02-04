import { MqttClient } from "mqtt/dist/mqtt.min";
import { createContext } from "react";

type ContextType = {
  client?: MqttClient | null;
};

export const MQTTContext = createContext({} as ContextType);

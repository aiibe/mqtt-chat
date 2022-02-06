import { MqttClient } from "mqtt/dist/mqtt.min";
import { ReactNode } from "react";

export type MQTTProviderType = {
  url: string;
  children: ReactNode;
};

export type ContextType = {
  client: MqttClient | null;
  clientId: string;
};

export type HistoryType = {
  topic: string;
  message: string;
};

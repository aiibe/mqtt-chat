import { ReactNode, useEffect, useState } from "react";
import { MQTTContext } from "./Context";
import * as mqtt from "mqtt/dist/mqtt.min";

type MQTTProvider = {
  url: string;
  children: ReactNode;
};

export default function Provider({ url, children }: MQTTProvider) {
  const [client, setClient] = useState<mqtt.MqttClient | null>(null);

  useEffect(() => {
    if (!client) {
      setClient(mqtt.connect(url));
    }

    return () => {
      if (client) {
        client.end();
        setClient(null);
      }
    };
  }, [url]);

  return (
    <MQTTContext.Provider value={{ client }}>{children}</MQTTContext.Provider>
  );
}

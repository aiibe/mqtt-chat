import * as mqtt from "mqtt/dist/mqtt.min";
import { useEffect, useState } from "react";
import { MQTTContext } from "./Context";
import { MQTTProviderType } from "./Types";

export default function Provider({ url, children }: MQTTProviderType) {
  const [client, setClient] = useState<mqtt.MqttClient | null>(null);

  useEffect(() => {
    if (!client) {
      // Initiate connection
      const connector = mqtt.connect(url);
      // console.log("> Connecting to broker");

      // Ensure client is fully connected
      connector.on("connect", () => {
        setClient(connector);
        // console.log("> Connected with success");
      });
    }

    return () => {
      if (client) {
        // End connection
        client.end();
      }
    };
  }, [url]);

  return (
    <MQTTContext.Provider value={{ client }}>{children}</MQTTContext.Provider>
  );
}

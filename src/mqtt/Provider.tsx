import * as mqtt from "mqtt/dist/mqtt.min";
import { useEffect, useState } from "react";
import { MQTTContext } from "./Context";
import { MQTTProviderType } from "./Types";

// LWT
// const opts = {
//   will: {
//     retain: true,
//     topic: "online",
//     payload: "offline",
//     qos: 1,
//   },
// };

const clientId = Math.random().toString(16).substring(2, 8);

export default function Provider({ url, children }: MQTTProviderType) {
  const [client, setClient] = useState<mqtt.MqttClient | null>(null);

  useEffect(() => {
    if (!client) {
      // Initiate connection
      const connector = mqtt.connect(url, {
        clientId,
      });
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
        setClient(null);
      }
    };
  }, [url]);

  return (
    <MQTTContext.Provider value={{ client, clientId }}>
      {children}
    </MQTTContext.Provider>
  );
}

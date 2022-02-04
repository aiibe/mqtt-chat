import { useCallback, useContext, useEffect, useState } from "react";
import { MQTTContext } from "./Context";

export const useSubscription = (topic: string) => {
  const { client } = useContext(MQTTContext);
  const [history, setHistory] = useState<string[]>([]);

  // Append message to history
  const appendMessage = useCallback((topic: string, message: ArrayBuffer) => {
    setHistory((history) => [...history, message.toString()]);
  }, []);

  // Init
  useEffect(() => {
    if (client?.connected) {
      // Subscribe
      client.subscribe(topic, (err) => {
        if (err) return console.log(err);
        console.log("> Subscribed to " + topic);
      });

      // Listen for message and append to history
      client.on("message", appendMessage);
    }
  }, [client?.connected, appendMessage]);

  return { client, messages: history };
};

import { useCallback, useContext, useEffect, useState } from "react";
import { MQTTContext } from "./Context";
import { HistoryType } from "./Types";

export const useSubscription = (topic: string | string[]) => {
  const { client, clientId } = useContext(MQTTContext);
  const [history, setHistory] = useState<HistoryType[]>([]);

  // Subscribe to topic
  const subscribe = useCallback(() => {
    client?.subscribe(topic);
  }, [client]);

  // Append message to history
  const appendMessage = useCallback(
    (topic: string, message: ArrayBuffer) => {
      setHistory((history) => [
        ...history,
        { topic, message: message.toString() },
      ]);
    },
    [topic]
  );

  // Subscribe and listen for messages
  useEffect(() => {
    if (client?.connected) {
      subscribe();
      client.on("message", appendMessage);
    }
  }, [client]);

  // Export
  return { client, messages: history, clientId };
};

import { useState } from "react";
import Conversation from "./components/Conversation";
import Join from "./components/Join";
import MessageInput from "./components/MessageInput";
import Users from "./components/Users";
import { useSubscription } from "./mqtt";

function App() {
  const { client, clientId, messages } = useSubscription(["presence", "chat"]);
  const [selfJoined, setSelfJoined] = useState(false);

  const handleJoin = (username: string | undefined) => {
    client?.publish("presence", `${clientId}#${username}`);
    setSelfJoined(true);
  };

  const handleSendMessage = (message: string) => {
    client?.publish("chat", `${clientId}#${message}`);
  };

  return (
    <div className="w-80 mx-auto mt-4">
      <div className="border rounded-md">
        {/* Online users */}
        <Users />

        {/* Conversations */}
        <Conversation />

        {/* Input */}
        <div className="p-2">
          {!selfJoined ? (
            <Join onSubmit={handleJoin} />
          ) : (
            <MessageInput onSubmit={handleSendMessage} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

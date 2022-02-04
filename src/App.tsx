import { FormEventHandler, useState } from "react";
import { useSubscription } from "./mqtt";

function App() {
  const { client, messages } = useSubscription("presence");
  const [message, setMessage] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    client?.publish("presence", message);
    setMessage("");
  };

  return (
    <div className="w-1/3 mx-auto mt-4">
      <div className="">
        {messages.length &&
          messages.map((tuple, i) => <p key={i}>{tuple.message}</p>)}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="border"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;

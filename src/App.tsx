import { useEffect } from "react";
import { client } from "./mqtt";

function App() {
  useEffect(() => {
    client.on("connect", () => {
      client.subscribe("presence", function (err) {
        if (!err) {
          client.publish("presence", "Hello mqtt");
        }
      });
    });

    client.on("message", function (topic, message) {
      // message is Buffer
      console.log(message.toString());
      client.end();
    });

    return () => {};
  }, []);

  return (
    <div className="w-1/3 mx-auto mt-4">
      <p>Hello world</p>
      <input type="text" className="border" />
    </div>
  );
}

export default App;

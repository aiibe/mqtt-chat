import { FormEventHandler, useRef, useState } from "react";

type PropsType = {
  onSubmit: (message: string) => void;
};

export default function MessageInput({ onSubmit }: PropsType) {
  const [message, setMessage] = useState("");
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        className="border px-2 py-1 flex-1"
        value={message}
        placeholder="Your message here"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="border px-2 py-1" type="submit">
        Send
      </button>
    </form>
  );
}

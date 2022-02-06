import { FormEventHandler, useRef } from "react";

type PropsType = {
  onSubmit: (username: string | undefined) => void;
};

export default function Join({ onSubmit }: PropsType) {
  const userInput = useRef<HTMLInputElement>(null);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(userInput.current?.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        ref={userInput}
        type="text"
        className="flex-1 border px-2 py-1"
        placeholder="Your name"
      />
      <button className="border px-3 py-1" type="submit">
        Join
      </button>
    </form>
  );
}

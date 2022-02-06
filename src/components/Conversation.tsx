import { useSubscription } from "../mqtt";
import { HistoryType } from "../mqtt/Types";

export default function Conversation() {
  const { messages, clientId } = useSubscription("presence");

  return (
    <div className="p-2">
      {messages.length
        ? messages.map((message, i) => (
            <Message payload={message} clientId={clientId} key={i} />
          ))
        : null}
    </div>
  );
}

const Message = ({
  payload,
  clientId,
}: {
  payload: HistoryType;
  clientId: string;
}) => {
  const { topic, message } = payload;
  const [id, content] = message.split("#");

  return (
    <div
      className={`flex pb-1 ${
        clientId === id ? "justify-end" : "justify-start"
      }`}
    >
      {topic === "presence" ? (
        <span className="text-sm italic">
          {clientId === id ? "You have joined" : `${content} has joined`}
        </span>
      ) : (
        <p className={`border rounded-full px-3 py-1`}>{content}</p>
      )}
    </div>
  );
};

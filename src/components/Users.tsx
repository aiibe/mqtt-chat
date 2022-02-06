import { useSubscription } from "../mqtt";

export default function Users() {
  const { messages, clientId } = useSubscription("presence");
  const users = messages
    .filter(({ topic }) => topic === "presence")
    .map(({ message }) => {
      const [id, content] = message.split("#");
      return clientId === id ? "You" : content;
    });

  return (
    <div className="border-b bg-gray-50 h-11">
      <div className="flex p-2">
        {users ? (
          users.map((name) => (
            <span key={name} className="border rounded-full px-3 bg-white mr-1">
              {name}
            </span>
          ))
        ) : (
          <span className="flex-1 text-center">No users online</span>
        )}
      </div>
    </div>
  );
}

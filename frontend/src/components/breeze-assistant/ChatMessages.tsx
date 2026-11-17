import { useRef, useEffect } from "react";
import type { ChatMessage } from "../../hooks/useChatStore";

type ChatMessagesProps = {
  messages: ChatMessage[];
  loading: boolean;
};

export default function ChatMessages({ messages, loading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[80%] p-3 rounded-lg ${
              msg.role === "user"
                ? "bg-orange-500 text-white rounded-br-none"
                : "bg-gray-100 text-gray-800 rounded-bl-none"
            }`}
          >
            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
          </div>
        </div>
      ))}
      {loading && (
        <div className="flex justify-start">
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Breeze is thinking…</p>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

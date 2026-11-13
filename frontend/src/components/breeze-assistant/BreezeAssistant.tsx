import { useEffect, useState, type FormEvent, type KeyboardEvent } from "react";
import { useChatStore } from "../../hooks/useChatStore";
import BreezeHeader from "./BreezeHeader";
import ChatMessages from "./ChatMessages";
import SuggestedPrompts from "./SuggestedPrompts";
import ChatInput from "./ChatInput";

type BreezeAssistantProps = {
  onClose: () => void;
};

export default function BreezeAssistant({ onClose }: BreezeAssistantProps) {
  const { currentSession, addMessage, createSession } = useChatStore();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isBreezeMenuOpen, setIsBreezeMenuOpen] = useState(false);

  // Initialize session
  useEffect(() => {
    if (!currentSession) {
      createSession();
    }
  }, [currentSession, createSession]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading || !currentSession) return;

    // Add user message
    addMessage({
      id: `msg-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    });

    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/assistant/chat`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            includeContext: true,
          }),
        }
      );

      if (!response.ok) throw new Error(`Status ${response.status}`);
      const data = await response.json();

      addMessage({
        id: `msg-${Date.now()}`,
        role: "assistant",
        content: data.reply,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Chat failed:", error);
      addMessage({
        id: `msg-${Date.now()}`,
        role: "assistant",
        content:
          "Sorry, I encountered an error. Please try again in a moment.",
        timestamp: new Date(),
      });
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(input);
    }
  }

  function exportChat() {
    if (!currentSession) return;
    const dataStr = JSON.stringify(currentSession.messages, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${currentSession.title}.json`;
    link.click();
  }

  function handleMenuClick(menuId: string) {
    console.log("Menu clicked:", menuId);
    // Handle menu actions here (new-chat, chats, artifacts, etc.)
    setIsBreezeMenuOpen(false);
  }

  return (
    <aside
      aria-label="Breeze Assistant"
      className="w-96 shrink-0 border-l border-gray-200 bg-white flex flex-col"
    >
      <BreezeHeader
        isBreezeMenuOpen={isBreezeMenuOpen}
        onToggleMenu={() => setIsBreezeMenuOpen((prev) => !prev)}
        onMenuClick={handleMenuClick}
        onClose={onClose}
      />

      <div className="flex-1 overflow-y-auto p-5">
        {!currentSession?.messages.length ? (
          <SuggestedPrompts onPromptClick={(prompt) => sendMessage(prompt)} />
        ) : (
          <ChatMessages messages={currentSession.messages} loading={loading} />
        )}
      </div>

      <ChatInput
        input={input}
        onInputChange={setInput}
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
        onExport={exportChat}
        loading={loading}
        disabled={!input.trim() || !currentSession}
      />
    </aside>
  );
}
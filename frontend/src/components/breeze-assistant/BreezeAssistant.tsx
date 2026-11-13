import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { FiArrowUp, FiDownload, FiX } from "react-icons/fi";
import { GoPencil } from "react-icons/go";
import { MdOutlineChat } from "react-icons/md";
import { FaRegFolderOpen } from "react-icons/fa";
import { IoImagesOutline } from "react-icons/io5";
import { AiOutlineMore } from "react-icons/ai";

import { useChatStore } from "../../hooks/useChatStore";
import sparkleIcon from "../../assets/sparkle-icon.svg";
import { icons } from "lucide-react";

type BreezeAssistantProps = {
  onClose: () => void;
};


// Breeze Assistant menu 

const breezeMenu = [
  {
    id:"new-chat",
    label:"new Chat",
    icons:GoPencil,
    isActive:true
  },
  {
    id:"chats",
    label:"Chats",
    icons:MdOutlineChat,
    isActive:false
  },
  {
    id:"Artifacts",
    label:"Artifacts",
    icons:IoImagesOutline,
    isActive:false
  },
  {
    id:"Projects",
    label:"Projects",
    icons:FaRegFolderOpen,
    isActive:false
  },
  {
    id:"more",
    label:"More",
    icons:AiOutlineMore,
    isActive:false
  }
] as const

const suggestedPrompts = [
  "Show me my recent contacts",
  "What deals are in closing stage?",
  "Who needs follow-up?",
  "Summarize my pipeline",
];

export default function BreezeAssistant({ onClose }: BreezeAssistantProps) {
  const {
    currentSession,
    addMessage,
    createSession,
  } = useChatStore();

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // this state is for breeze assistant chat , new chat , history visibility 
  const [isBreezeMenuOpen, setIsBreezeMenuOpen] = useState(false)
  // Initialize session
  useEffect(() => {
    if (!currentSession) {
      createSession();
    }
  }, [currentSession, createSession]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentSession?.messages]);

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

  return (
    <aside
      aria-label="Breeze Assistant"
      className="w-96   shrink-0 border-l border-gray-200 bg-white flex flex-col"
    >
      <header className="flex items-center justify-between border-b
       border-gray-100 px-5 py-4">
        <div className=" relative gap-2 font-medium text-gray-800">
          <button className="flex items-center hover:bg-[#F0F0F0] px-3 py-2 
           rounded-2xl"
           onClick={()=>setIsBreezeMenuOpen((prev)=>!prev)}
           >
          <img alt="" className="h-4 w-4" src={sparkleIcon} />
          <span>Breeze</span>
          </button>
        </div>
        {isBreezeMenuOpen &&(
          <div className="absolute mt-50 bg-[#FFFFFF] px-3 py-4 border rounded-3xl">
            {breezeMenu.map((menu)=> {
              const Icons = menu.icons
              return(
                <button key={menu.id} className=" flex flex-col
                w-full rounded-xs
                hover:bg-[#B3F0ED] px-3 py-1.5">
                  <div className="flex flex-row items-center gap-3">
                <Icons/>
                {menu.label}
                  </div>
              </button>
              )
            }
            )}
          </div>
        )}
        <button
          aria-label="Close Breeze Assistant"
          className="rounded-md p-1 text-gray-500 hover:bg-gray-100
           hover:text-gray-800"
          onClick={onClose}
          type="button"
        >
          <FiX size={20} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-5">
        {!currentSession?.messages.length ? (
          <>
            <img alt="" className="mb-6 h-7 w-7" src={sparkleIcon} />

            <h2 className="text-2xl font-medium tracking-tight text-gray-800">
              What can I help with?
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Ask questions about your CRM data.
            </p>

            <section className="mt-6 space-y-3">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  className="block w-full text-left text-sm p-3 rounded-lg
                   border border-gray-200 hover:bg-orange-50
                    hover:border-orange-300 transition"
                  onClick={() => void sendMessage(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </section>
          </>
        ) : (
          <div className="space-y-4">
            {currentSession.messages.map((msg) => (
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
                  <p className="text-sm whitespace-pre-wrap">
                    {msg.content}
                  </p>
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
        )}
      </div>

      <form className="border-t border-gray-100 p-4 space-y-2"
       onSubmit={handleSubmit}>
        <textarea
          className="w-full p-3 border border-gray-200 rounded-lg 
          text-sm resize-none focus:outline-none focus:border-orange-500"
          placeholder="Ask Breeze anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={3}
        />

        <div className="flex gap-2">
          <button
            type="button"
            className="p-2 rounded-lg border border-gray-300
             hover:bg-gray-100"
            onClick={exportChat}
            title="Export chat"
          >
            <FiDownload size={16} />
          </button>

          <button
            type="submit"
            disabled={loading || !input.trim() || !currentSession}
            className="flex-1 px-4 py-2 bg-orange-500 text-white
             rounded-lg hover:bg-orange-600 disabled:opacity-50
              disabled:cursor-not-allowed"
          >
            <FiArrowUp size={16} className="inline mr-2" />
            Send
          </button>
        </div>
      </form>
    </aside>
  );
}
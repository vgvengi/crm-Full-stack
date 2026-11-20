import { useState } from "react";
import { X } from "lucide-react";

type props = {
  contactId: number;
  contactName: string;
  onClose: () => void;
  onCreated: () => void;
};

function NotePanel({ contactId, contactName, onClose, onCreated }: props) {
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleCreate() {
    if (!body.trim()) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/contacts/${contactId}/notes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ body }),
        },
      );

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Failed to save note");
      }

      setBody("");
      onCreated();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save note");
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="fixed bottom-4 right-4 z-50 w-140 max-w-[calc(100vw-2rem)] rounded-lg border border-gray-200 bg-white shadow-2xl">
      {/* header */}
      <div className="flex items-center justify-between border-b px-5 py-3">
        <h3 className="font-semibold">Note</h3>
        <button onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
      </div>

      {/* For: contact */}
      <div className="border-b px-5 py-3 text-sm">
        For{" "}
        <span className="ml-2 rounded bg-gray-100 px-2 py-1">
          {contactName}
        </span>
      </div>

      {/* text box */}
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Start typing to leave a note..."
        className="h-40 w-full resize-none px-5 py-4 outline-none"
        autoFocus
      />

      {/* footer */}
      <div className="flex items-center gap-3 border-t px-5 py-3">
        <button
          onClick={handleCreate}
          disabled={!body.trim() || saving}
          className="rounded-md bg-[#ff5c35] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
        >
          {saving ? "Saving..." : "Create note"}
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}
export default NotePanel;

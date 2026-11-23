import { useRef, useState } from "react";
// doesn't clash with the browser's built-in PointerEvent type.
import type { PointerEvent as ReactPointerEvent } from "react";

import { X, GripHorizontal } from "lucide-react";
import { Italic } from "lucide-react";
import { Underline } from "lucide-react";
import { RemoveFormatting } from "lucide-react";
import { FaAngleDown, FaCaretDown } from "react-icons/fa6";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@/ui/popover";

type Props = {
  contactId: number;
  contactName: string;
  onClose: () => void;
  onCreated: () => void;
};

// How far the panel has moved away from its starting spot (bottom-right corner).
// {0, 0} = not moved yet.
type Offset = { x: number; y: number };

// Everything we need to remember for ONE drag, from pointer-down to pointer-up.
type DragInfo = {
  pointerId: number; // which pointer (mouse / finger) started the drag
  startX: number; // where the pointer was when the drag started
  startY: number;
  originX: number; // what the offset was when the drag started
  originY: number;
  // The limits the offset may move between, so the panel never leaves the
  // screen. Worked out ONCE at pointer-down (see handleGripDown for why).
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

// Keep a number inside [min, max]. Used for the "can't leave the screen" rule.
function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function NotePanel({ contactId, contactName, onClose, onCreated }: Props) {
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  // this state is for change font
  const [boldletter, setBoldletter] = useState(false);
  const [italicletter, setItalicletter] = useState(false);
  const [underlineLetter, setunderlineLetter] = useState(false);
  // this state is for change whether  button is active or not
  const [boldButton, setboldButton] = useState(false);
  const [italicButton, setitalicButton] = useState(false);
  const [underLineButton, setUnderLineButton] = useState(false);

  // ---------------- DRAG STATE ----------------

  // STATE because changing it must re-render: the new offset has to reach the
  // `transform` style so the panel actually moves on screen.
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });

  // STATE because the cursor style changes (grab -> grabbing) while dragging.
  const [isDragging, setIsDragging] = useState(false);

  // REF, not state. These numbers are only read inside event handlers and never
  // shown on screen. Keeping them in state would cause pointless re-renders, and
  // could give us an old (stale) value in the middle of a fast drag.
  const dragRef = useRef<DragInfo | null>(null);

  // A ref to the panel's DOM element, so we can measure where it is on screen.
  const panelRef = useRef<HTMLDivElement>(null);

  // 1) POINTER DOWN on the grip -> start the drag
  function handleGripDown(e: ReactPointerEvent<HTMLDivElement>) {
    // Only start on the main button. Left mouse, a finger and a pen all report 0.
    // Without this, a right-click would start a drag too.
    if (e.button !== 0) return;

    const panel = panelRef.current;
    if (!panel) return;

    // Stops the browser from selecting text while you drag, AND stops the click
    // from taking focus away from the textarea, so the user can keep typing
    // straight after moving the panel.
    e.preventDefault();

    // Where the panel is on screen right now (left/top/right/bottom in px).
    const rect = panel.getBoundingClientRect();

    // Work out the screen limits ONCE, here, instead of on every move:
    // - left limit: we can move left by `rect.left` px before hitting the edge
    // - right limit: we can move right by (screen width - rect.right) px
    // - same idea for top and bottom.
    // Each limit is stored as an OFFSET value (current offset +/- the room left),
    // so in handleGripMove we can clamp the offset directly.
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originX: offset.x,
      originY: offset.y,
      minX: offset.x - rect.left,
      maxX: offset.x + (window.innerWidth - rect.right),
      minY: offset.y - rect.top,
      maxY: offset.y + (window.innerHeight - rect.bottom),
    };

    // POINTER CAPTURE: from now on, every move / up event for this pointer is
    // sent to the grip, even when the cursor leaves it, leaves the panel, or
    // goes up into the browser bar (like in your video). Without it, a fast
    // mouse movement "loses" the panel, and we'd need window listeners plus a
    // cleanup step.
    e.currentTarget.setPointerCapture(e.pointerId);

    setIsDragging(true);
  }

  // 2) POINTER MOVE -> move the panel
  function handleGripMove(e: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    // Not dragging, or this is a different finger/pointer -> ignore it.
    if (!drag || e.pointerId !== drag.pointerId) return;

    // New offset = where we started + how far the pointer has travelled.
    // Then clamp it so the panel stays fully on screen.
    const x = clamp(
      drag.originX + (e.clientX - drag.startX),
      drag.minX,
      drag.maxX,
    );
    const y = clamp(
      drag.originY + (e.clientY - drag.startY),
      drag.minY,
      drag.maxY,
    );

    setOffset({ x, y });
  }

  // 3) POINTER UP / CANCEL -> end the drag
  function handleGripEnd(e: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || e.pointerId !== drag.pointerId) return;

    dragRef.current = null;
    setIsDragging(false);

    // The browser usually releases capture by itself on pointer-up. We still
    // release it here in case this ran from pointercancel.
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    // We do NOT reset the offset: the panel stays where it was dropped,
    // same as HubSpot.
  }

  // ---------------- SAVE NOTE (unchanged from your version) ----------------
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
  }

  return (
    <div
      ref={panelRef}
      // `fixed bottom-4 right-4` is still the STARTING position.
      // `cursor-grab` was removed from here: the whole panel isn't draggable,
      // only the grip, so the textarea keeps its normal text cursor.
      className="fixed bottom-4 right-4 z-50 w-140 max-w-[calc(100vw-2rem)] rounded-lg border border-gray-200 bg-white shadow-2xl"
      // Moving with `transform` instead of changing top/left/bottom/right:
      // 1. it doesn't change the layout, so the browser can move the panel
      //    cheaply and smoothly
      // 2. `bottom-4 right-4` stays as the starting point, and the offset is just
      //    "how far from there". Tailwind can't make classes from runtime values,
      //    so this has to go in `style`.
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
    >
      {/* ---------- DRAG GRIP (like the dotted bar in HubSpot) ---------- */}
      <div
        onPointerDown={handleGripDown}
        onPointerMove={handleGripMove}
        onPointerUp={handleGripEnd}
        // Fires if the browser takes the pointer away (e.g. a touch gets
        // interrupted). Without it the panel could get stuck in "dragging".
        onPointerCancel={handleGripEnd}
        aria-label="Drag to move note panel"
        title="Drag to move"
        className={[
          // Centred along the top edge of the panel.
          "absolute left-1/2 top-0 -translate-x-1/2",
          // Bigger than the icon, so it's easy to grab.
          "flex h-4 w-12 items-center justify-center rounded text-gray-400 hover:text-gray-600",
          // touch-none: on phones, stops the browser from scrolling the page
          //   instead of dragging.
          // select-none: no text highlighting while dragging.
          "touch-none select-none",
          // Feedback for the user: open hand on hover, closed hand while dragging.
          isDragging ? "cursor-grabbing" : "cursor-grab",
        ].join(" ")}
      >
        <GripHorizontal size={16} />
      </div>

      {/* header. pt-4 leaves room for the grip above "Note" */}
      {/* Removed the empty <button></button> that was here. It did nothing.
          Add the collapse / maximise buttons later, one at a time. */}
      <div className="flex items-center justify-between  border-b px-5 pb-3 pt-4">
        <div className="flex flex-row gap-5 items-center">
          <FaAngleDown />
          <h3 className="font-semibold">Note</h3>
        </div>
        <div className="justify-end">
          <button onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
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
        className={`h-40 w-full resize-none px-5 py-4 outline-non
          placeholder:not-italic placeholder:font-normal 
          ${boldletter ? "font-bold" : ""} 
          ${italicletter ? "italic" : ""}
          ${underlineLetter && body ? "underline" : ""}
          `}
        autoFocus
      />
      <div className="flex flex-row gap-1 mb-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className={`border  hover:border-gray-400  px-2 
                ${boldButton ? " border-gray-700  bg-gray-400" : "border-transparent "}
                `}
              onClick={() => {
                setBoldletter((prev) => !prev);
                setboldButton((prev) => !prev);
              }}
            >
              B
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>B</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className={`border hover:border-gray-400 italic px-2
                ${italicButton ? " border-gray-700 bg-gray-400" : "border-transparent"}
                `}
              onClick={() => {
                setItalicletter((prev) => !prev);
                setitalicButton((prev) => !prev);
              }}
            >
              <Italic size={14} />
            </button>
          </TooltipTrigger>
          <TooltipContent>Italic</TooltipContent>
        </Tooltip>
        {/* <button className="border border-transparent hover:border-gray-400 px-2"
        // onClick={()}
        >U</button> */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className={`border hover:border-gray-400 px-2
                ${underLineButton ? "border-gray-700 bg-gray-400" : "border-transparent"}
              `}
              onClick={() => {
                setunderlineLetter((prev) => !prev);
                setUnderLineButton((prev) => !prev);
              }}
              aria-label="Underline"
              aria-pressed={underlineLetter}
            >
              <Underline size={14} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Underline</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className={`px-2 border hover:border-gray-400`}>
              <RemoveFormatting size={14} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Clear Formatting</p>
          </TooltipContent>
        </Tooltip>
        <Popover>
          <PopoverTrigger asChild>
            <button>More</button>
          </PopoverTrigger>
          <PopoverContent side="top">
            <div className="flex flex-row">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="cursor-pointer">
                    {" "}
                    <span></span>
                    <FaCaretDown size={10}/>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Font</p>
                </TooltipContent>
              </Tooltip>
              
              <button>

              </button>

            </div>
          </PopoverContent>
        </Popover>
      </div>

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

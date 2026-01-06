"use client";

import { useState } from "react";

export default function Home() {
  // ✅ STATE VARIABLES (THIS WAS MISSING)
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message) return;

    setLoading(true);
    setReply("");

    try {
      const res = await fetch("http://localhost:5050/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setReply(data.reply);
    } catch (error) {
      setReply("Error contacting server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="w-[320px] rounded-2xl bg-white shadow-2xl dark:bg-zinc-900">
        
        {/* Header */}
        <div className="rounded-t-2xl bg-black px-4 py-3 text-white">
          <h2 className="text-sm font-semibold">VisionCart AI</h2>
        </div>
  
        {/* Body */}
        <div className="flex flex-col gap-2 p-3">
          <textarea
            className="h-20 resize-none rounded-md border p-2 text-sm dark:bg-black dark:text-white"
            placeholder="Ask me anything..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
  
          <button
            onClick={sendMessage}
            disabled={loading}
            className="rounded-md bg-black py-2 text-sm text-white disabled:opacity-50"
          >
            {loading ? "Thinking..." : "Send"}
          </button>
  
          {reply && (
            <div className="mt-2 max-h-40 overflow-y-auto rounded-md bg-zinc-100 p-2 text-sm dark:bg-zinc-800 dark:text-white">
              <strong>AI:</strong> {reply}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
}

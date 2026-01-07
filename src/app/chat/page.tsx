"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Chat = {
  id: string;
  name: string;
  username: string;
  lastMessage: string;
  time: string;
  unread?: number;
};

type Msg = {
  id: string;
  chatId: string;
  text: string;
  mine: boolean;
  time: string;
};

const CHATS: Chat[] = [
  { id: "c1", name: "Aman", username: "@aman.dev", lastMessage: "Hey! 👋", time: "2:39 PM", unread: 2 },
  { id: "c2", name: "Nishi", username: "@nishi.ethnic", lastMessage: "Send the design pls", time: "1:12 PM", unread: 0 },
  { id: "c3", name: "Rahul", username: "@rahul_07", lastMessage: "Ok done ✅", time: "Yesterday", unread: 1 },
  { id: "c4", name: "Priya", username: "@priya.codes", lastMessage: "Let’s ship it", time: "Mon", unread: 0 },
];

const SEED_MSGS: Msg[] = [
  { id: "m1", chatId: "c1", text: "Hey! 👋", mine: false, time: "2:39 PM" },
  { id: "m2", chatId: "c1", text: "Hi! Working on the UI.", mine: true, time: "2:39 PM" },
  { id: "m3", chatId: "c1", text: "Make it WhatsApp layout: left chats, right messages.", mine: false, time: "2:40 PM" },
  { id: "m4", chatId: "c1", text: "Done. Adding input + send button too.", mine: true, time: "2:40 PM" },

  { id: "m5", chatId: "c2", text: "Send the design pls", mine: false, time: "1:12 PM" },
  { id: "m6", chatId: "c2", text: "Sure, sharing in a min.", mine: true, time: "1:13 PM" },

  { id: "m7", chatId: "c3", text: "Ok done ✅", mine: true, time: "Yesterday" },
  { id: "m8", chatId: "c3", text: "Nice.", mine: false, time: "Yesterday" },
];

function timeNow() {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatPage() {
  const [activeChatId, setActiveChatId] = useState(CHATS[0].id);
  const [query, setQuery] = useState("");
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>(SEED_MSGS);

  const listRef = useRef<HTMLDivElement | null>(null);

  const activeChat = useMemo(
    () => CHATS.find((c) => c.id === activeChatId)!,
    [activeChatId]
  );

  const filteredChats = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CHATS;
    return CHATS.filter(
      (c) => c.name.toLowerCase().includes(q) || c.username.toLowerCase().includes(q)
    );
  }, [query]);

  const activeMessages = useMemo(
    () => msgs.filter((m) => m.chatId === activeChatId),
    [msgs, activeChatId]
  );

  const canSend = useMemo(() => text.trim().length > 0, [text]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [activeChatId, activeMessages.length]);

  function send() {
    const t = text.trim();
    if (!t) return;

    setMsgs((prev) => [
      ...prev,
      { id: crypto.randomUUID(), chatId: activeChatId, text: t, mine: true, time: timeNow() },
    ]);
    setText("");
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") send();
  }

  return (
    <div className="min-h-screen bg-[#EDEDED] pt-20">
      <div className=" w-full max-w-screen pt-4">
        <div className="grid h-[calc(100vh-80px-32px)] min-h-[640px] grid-cols-12 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          {/* Left: chat list */}
          <aside className="col-span-4 border-r border-zinc-200">
            {/* Sidebar header */}
            <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-zinc-200" />
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-zinc-900">Chats</div>
                  <div className="text-xs text-zinc-500">WhatsApp-style layout</div>
                </div>
              </div>

              <button className="grid h-10 w-10 place-items-center rounded-full bg-zinc-100 hover:bg-zinc-200">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Search */}
            <div className="border-b border-zinc-200 px-4 py-3">
              <div className="flex items-center gap-2 rounded-xl bg-zinc-100 px-3 py-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search or start new chat"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
                />
              </div>
            </div>

            {/* Chat list */}
            <div className="h-[calc(100%-116px)] overflow-y-auto">
              {filteredChats.map((c) => {
                const active = c.id === activeChatId;
                return (
                  <button
                    key={c.id}
                    onClick={() => setActiveChatId(c.id)}
                    className={`w-full border-b border-zinc-100 px-4 py-3 text-left hover:bg-zinc-50 ${
                      active ? "bg-[#E7FCEB]" : "bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-full bg-gradient-to-br from-yellow-300 to-pink-500" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <div className="truncate text-sm font-semibold text-zinc-900">
                            {c.name}
                          </div>
                          <div className="shrink-0 text-xs text-zinc-500">{c.time}</div>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <div className="truncate text-xs text-zinc-500">
                            {c.lastMessage}
                          </div>
                          {!!c.unread && c.unread > 0 && (
                            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-green-500 px-1 text-[11px] font-semibold text-white">
                              {c.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Right: messages */}
          <section className="col-span-8 flex flex-col">
            {/* Chat header */}
            <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-yellow-300 to-pink-500" />
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-zinc-900">{activeChat.name}</div>
                  <div className="text-xs text-zinc-500">{activeChat.username}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <HeaderIconButton label="Search in chat" />
                <HeaderIconButton label="Menu" dots />
              </div>
            </div>

            {/* Messages area */}
            <div
              ref={listRef}
              className="flex-1 overflow-y-auto bg-[#F4F2EE] px-4 py-4"
            >
              <div className="space-y-2">
                {activeMessages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.mine ? "justify-end" : "justify-start"}`}
                  >
                    <div className="max-w-[75%]">
                      {!m.mine && (
                        <div className="mb-1 text-[11px] font-semibold text-zinc-600">
                          {activeChat.name}
                        </div>
                      )}

                      <div
                        className={[
                          "rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-sm",
                          m.mine
                            ? "bg-[#DCF8C6] text-zinc-900 rounded-br-md"
                            : "bg-white text-zinc-900 rounded-bl-md border border-zinc-200",
                        ].join(" ")}
                      >
                        {m.text}
                      </div>

                      <div
                        className={`mt-1 text-[11px] text-zinc-500 ${
                          m.mine ? "text-right" : "text-left"
                        }`}
                      >
                        {m.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-zinc-200 bg-white px-3 py-3">
              <div className="flex items-center gap-2">
                <button className="grid h-11 w-11 place-items-center rounded-full bg-zinc-100 hover:bg-zinc-200">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 5v14M5 12h14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                <div className="flex-1">
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Type a message"
                    className="h-11 w-full rounded-full bg-zinc-100 px-4 text-sm outline-none focus:ring-2 focus:ring-green-400/60"
                  />
                </div>

                <button
                  onClick={send}
                  disabled={!canSend}
                  className={`h-11 rounded-full px-5 text-sm font-semibold transition
                    ${canSend ? "bg-green-500 text-white hover:bg-green-600" : "bg-zinc-200 text-zinc-500 cursor-not-allowed"}`}
                >
                  Send
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function HeaderIconButton({ label, dots }: { label: string; dots?: boolean }) {
  return (
    <button
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800"
    >
      {dots ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

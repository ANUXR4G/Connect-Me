"use client";

import { useMemo, useState } from "react";

type User = {
  id: string;
  name: string;
  username: string;
  avatarUrl?: string;
  mutuals?: number;
  isAdded?: boolean;
};

const DEMO_USERS: User[] = [
  { id: "1", name: "Aman", username: "aman.dev", mutuals: 4 },
  { id: "2", name: "Nishi", username: "nishi.ethnic", mutuals: 1 },
  { id: "3", name: "Rahul", username: "rahul_07", mutuals: 0 },
  { id: "4", name: "Priya", username: "priya.codes", mutuals: 7 },
];

function toggleThemeClass() {
  document.documentElement.classList.toggle("dark"); // Tailwind dark mode via class [web:95]
}

export default function SearchUsersPage() {
  const [q, setQ] = useState("");
  const [users, setUsers] = useState<User[]>(DEMO_USERS);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    return users
      .filter(
        (u) =>
          u.username.toLowerCase().includes(query) ||
          u.name.toLowerCase().includes(query)
      )
      .slice(0, 20);
  }, [q, users]);

  function addUser(id: string) {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isAdded: true } : u))
    );
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 pt-26 ">
      {/* Top header */}
      <div className="sticky top-0 z-10 border-b border-zinc-200/70 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-zinc-950/90">
        <div className="mx-auto flex w-full max-w-xl items-center justify-between px-4 py-3">
          <button className="rounded-full px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-white/10">
            Back
          </button>

          <div className="text-sm font-semibold">Add friends</div>

          <button
            onClick={toggleThemeClass}
            className="rounded-full px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-white/10"
            aria-label="Toggle theme"
          >
            Theme
          </button>
        </div>

        {/* Search row */}
        <div className="mx-auto w-full max-w-xl px-4 pb-3">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-zinc-100 text-zinc-700 dark:bg-white/10 dark:text-zinc-200">
              <span className="text-sm">⌕</span>
            </div>

            <div className="flex-1">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search name or username"
                className="h-10 w-full rounded-2xl bg-zinc-100 px-4 text-sm outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-yellow-300/70 dark:bg-white/10 dark:placeholder:text-zinc-400"
              />
            </div>

            {q.length > 0 && (
              <button
                onClick={() => setQ("")}
                className="rounded-full bg-zinc-100 px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-200 dark:bg-white/10 dark:text-zinc-200 dark:hover:bg-white/15"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick actions */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            <ActionChip label="Scan" />
            <ActionChip label="Contacts" />
            <ActionChip label="Quick add" />
            <ActionChip label="Nearby" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto w-full max-w-xl px-4 py-4">
        {/* Suggested section (shows when not searching) */}
        {q.trim().length === 0 && (
          <section className="mb-4">
            <div className="mb-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
              Quick add
            </div>

            <div className="space-y-2">
              {users.slice(0, 3).map((u) => (
                <UserRow key={u.id} u={u} onAdd={() => addUser(u.id)} />
              ))}
            </div>
          </section>
        )}

        {/* Search results */}
        <section>
          <div className="mb-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
            {q.trim().length === 0 ? "Search" : "Results"}
          </div>

          {q.trim().length === 0 ? (
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
              Type a name or username to find people.
            </div>
          ) : results.length === 0 ? (
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
              No users found.
            </div>
          ) : (
            <div className="space-y-2">
              {results.map((u) => (
                <UserRow key={u.id} u={u} onAdd={() => addUser(u.id)} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function ActionChip({ label }: { label: string }) {
  return (
    <button className="shrink-0 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10">
      {label}
    </button>
  );
}

function UserRow({ u, onAdd }: { u: User; onAdd: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-3 dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-full bg-gradient-to-br from-yellow-300 to-pink-500" />
        <div className="leading-tight">
          <div className="text-sm font-medium">{u.name}</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            @{u.username}
          </div>
          {typeof u.mutuals === "number" && (
            <div className="mt-1 text-[11px] text-zinc-500/90 dark:text-zinc-500">
              {u.mutuals} mutual friends
            </div>
          )}
        </div>
      </div>

      {u.isAdded ? (
        <span className="rounded-full bg-zinc-100 px-3 py-2 text-xs text-zinc-700 dark:bg-white/10 dark:text-zinc-200">
          Added
        </span>
      ) : (
        <button
          onClick={onAdd}
          className="rounded-full bg-yellow-300 px-4 py-2 text-xs font-semibold text-zinc-900 hover:bg-yellow-200"
        >
          + Add
        </button>
      )}
    </div>
  );
}

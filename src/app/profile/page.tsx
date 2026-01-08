'use client';

import type { FC } from 'react';
import { motion } from 'framer-motion';

type QuickAction = {
  label: string;
  icon: string;
};

const quickActions: QuickAction[] = [
  { label: 'Friends', icon: '👥' },
  { label: 'Map', icon: '🗺️' },
  { label: 'Spotlight', icon: '⭐' },
  { label: 'Add', icon: '+' },
];

const ProfilePage: FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 pt-20">
      {/* Header */}
      <div className="relative h-80 bg-[#FFFC00] overflow-hidden">
        {/* Optional cover image */}
        <div className="absolute inset-0 bg-[url('/api/placeholder/400/800')] bg-cover bg-center opacity-15" />

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-white border-4 border-white shadow-xl flex items-center justify-center text-4xl select-none"
        >
          😎
        </motion.div>

        {/* Header buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            type="button"
            className="h-10 w-10 rounded-full bg-white/90 shadow-sm border border-black/10"
            aria-label="Settings"
          >
            ⚙️
          </button>
          <button
            type="button"
            className="h-10 w-10 rounded-full bg-white/90 shadow-sm border border-black/10"
            aria-label="More"
          >
            ⋯
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="px-5 -mt-16 relative z-10">
        <div className="rounded-3xl bg-white border border-black/10 shadow-lg p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold leading-tight">yourusername</h1>
              <p className="text-sm text-gray-600">@yourusername • Jewar, UP</p>
            </div>

            <button
              type="button"
              className="px-4 py-2 rounded-full bg-black text-white text-sm font-semibold"
            >
              Edit Profile
            </button>
          </div>

          <p className="mt-3 text-gray-700">
            Full-stack dev building cool stuff.
          </p>

          {/* Stats */}
          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl border border-black/10 bg-gray-50 py-3">
              <div className="text-lg font-bold">1.2K</div>
              <div className="text-xs text-gray-600">Followers</div>
            </div>
            <div className="rounded-2xl border border-black/10 bg-gray-50 py-3">
              <div className="text-lg font-bold">567</div>
              <div className="text-xs text-gray-600">Following</div>
            </div>
            <div className="rounded-2xl border border-black/10 bg-gray-50 py-3">
              <div className="text-lg font-bold">42</div>
              <div className="text-xs text-gray-600">Stories</div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="mt-5 grid grid-cols-4 gap-3">
            {quickActions.map((a) => (
              <motion.button
                key={a.label}
                type="button"
                whileTap={{ scale: 0.97 }}
                className="rounded-2xl border border-black/10 bg-white shadow-sm py-3"
              >
                <div className="mx-auto mb-1 h-10 w-10 rounded-xl bg-[#FFFC00] flex items-center justify-center text-black font-bold">
                  {a.icon}
                </div>
                <div className="text-[11px] text-gray-700">{a.label}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Stories */}
        <div className="mt-6">
          <h2 className="text-lg font-bold">My Stories</h2>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {Array.from({ length: 6 }, (_, i) => (
              <motion.div
                key={i}
                whileTap={{ scale: 0.98 }}
                className="aspect-square rounded-2xl border border-black/10 bg-gray-100"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

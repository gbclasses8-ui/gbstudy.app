import React from 'react';
import { User, Send } from 'lucide-react';
import { GbLogo } from './GbLogo';

interface HeaderProps {
  onProfileClick: () => void;
  adminUnlocked: boolean;
  onOpenAdmin: () => void;
  onOpenTelegram: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onProfileClick,
  adminUnlocked,
  onOpenAdmin,
  onOpenTelegram,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#090e17]/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-[#141e2c]">
      {/* Left: Brand Logo & Title */}
      <div 
        onClick={onProfileClick}
        className="flex items-center gap-2.5 select-none cursor-pointer"
        title="GB STUDY - Tap 5 times for Admin"
      >
        <GbLogo className="w-10 h-10" />
        <div className="flex flex-col">
          <h1 className="text-base font-extrabold tracking-tight text-white leading-tight">
            <span>GB </span>
            <span className="text-[#38bdf8]">STUDY</span>
          </h1>
          <span className="text-[9px] font-bold text-[#7dd3fc] tracking-wider -mt-0.5">
            LEARN • PRACTICE • SUCCEED
          </span>
        </div>
      </div>

      {/* Right Controls: Telegram Button & Profile (5-tap admin trigger) */}
      <div className="flex items-center gap-2">
        {/* Quick Telegram Button */}
        <button
          onClick={onOpenTelegram}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0c2438] hover:bg-[#123652] text-[#38bdf8] border border-[#164e63] text-xs font-bold transition active:scale-95 cursor-pointer shadow-sm"
          title="Join Telegram"
        >
          <Send className="w-3.5 h-3.5 fill-[#38bdf8] -rotate-12" />
          <span className="hidden sm:inline">Telegram</span>
        </button>

        {adminUnlocked && (
          <button
            onClick={onOpenAdmin}
            className="px-3 py-1.5 rounded-xl bg-[#0d2a33] hover:bg-[#113a47] text-[#38bdf8] border border-[#164e63] text-xs font-extrabold tracking-wide transition active:scale-95 cursor-pointer"
          >
            Admin Panel
          </button>
        )}

        {/* Profile Tap Target */}
        <button
          onClick={onProfileClick}
          className="w-9 h-9 rounded-full bg-[#111a24] border border-slate-700 hover:border-slate-500 flex items-center justify-center text-slate-300 hover:text-white transition active:scale-95 cursor-pointer"
          title="Account / 5-Tap for Admin"
          aria-label="Profile"
        >
          <User className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

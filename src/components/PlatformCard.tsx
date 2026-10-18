import React from 'react';
import { ArrowRight, AppWindow, Compass } from 'lucide-react';
import { Platform } from '../types';
import { PlatformIcon } from './PlatformIcon';

interface PlatformCardProps {
  platform: Platform;
  onOpen: (platform: Platform) => void;
}

export const PlatformCard: React.FC<PlatformCardProps> = ({ platform, onOpen }) => {
  const handleClick = () => {
    if (platform.url) {
      onOpen(platform);
    }
  };

  const mode = platform.openMode || 'new_tab';

  return (
    <div
      onClick={handleClick}
      className="group w-full rounded-2xl bg-[#0c1520] hover:bg-[#0f1a28] border border-[#172435] hover:border-[#1e3a55] p-3 sm:p-3.5 flex items-center justify-between gap-3 transition-all duration-200 cursor-pointer active:scale-[0.99] shadow-sm"
    >
      {/* Left Icon (Handles URLs, uploaded base64 data:images, and graceful initials fallback) */}
      <PlatformIcon
        icon={platform.icon}
        name={platform.name}
        className="w-12 h-12 rounded-xl"
      />

      {/* Middle Text Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <h3 className="text-sm font-extrabold text-white tracking-wide truncate group-hover:text-[#38bdf8] transition">
            {platform.name}
          </h3>
          {mode === 'internal' && (
            <span className="text-[9px] px-1.5 py-0.5 rounded font-bold bg-[#1a1c36] text-[#c084fc] border border-[#3b2b5e]">
              In-App
            </span>
          )}
          {mode === 'same_tab' && (
            <span className="text-[9px] px-1.5 py-0.5 rounded font-bold bg-[#1e2316] text-[#a3e635] border border-[#384b1d]">
              Same Tab
            </span>
          )}
        </div>
        <p className="text-xs text-slate-400 mt-0.5 truncate">
          {platform.description || 'Open platform to explore content.'}
        </p>
      </div>

      {/* Right Circular Action Button */}
      <div className="w-9 h-9 rounded-full bg-[#0d2a33] text-[#38bdf8] border border-[#164e63] flex items-center justify-center group-hover:bg-[#133e4c] group-hover:scale-105 transition shrink-0 shadow-sm">
        {mode === 'internal' ? (
          <AppWindow className="w-4 h-4" />
        ) : mode === 'same_tab' ? (
          <Compass className="w-4 h-4" />
        ) : (
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        )}
      </div>
    </div>
  );
};

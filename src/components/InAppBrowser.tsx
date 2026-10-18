import React, { useState } from 'react';
import { ArrowLeft, RotateCw, X } from 'lucide-react';
import { Platform } from '../types';
import { PlatformIcon } from './PlatformIcon';

interface InAppBrowserProps {
  platform: Platform | null;
  onClose: () => void;
}

export const InAppBrowser: React.FC<InAppBrowserProps> = ({ platform, onClose }) => {
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  if (!platform) return null;

  const handleRefresh = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#070b12] text-white animate-in fade-in duration-200">
      {/* Top Header - Strictly NO URL and NO external browser button */}
      <div className="px-4 py-3 bg-[#09111c] border-b border-[#172535] flex items-center justify-between gap-3 shrink-0 shadow-md">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#101b2a] hover:bg-[#18293f] text-slate-300 hover:text-white transition flex items-center gap-1.5 cursor-pointer active:scale-95"
            title="Back to GB STUDY"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span className="text-xs font-bold">Back</span>
          </button>

          {/* Platform Icon & Platform Name Only (URL IS NEVER SHOWN) */}
          <div className="flex items-center gap-2.5 min-w-0">
            <PlatformIcon
              icon={platform.icon}
              name={platform.name}
              className="w-8 h-8 rounded-lg"
            />

            <div className="min-w-0">
              <h3 className="text-sm font-extrabold text-white truncate leading-tight">
                {platform.name}
              </h3>
              <span className="text-[10px] text-[#38bdf8] font-bold tracking-wider uppercase">
                GB STUDY PORTAL
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls - Refresh and Close ONLY */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleRefresh}
            className="p-2.5 rounded-xl bg-[#101b2a] hover:bg-[#18293f] text-slate-300 hover:text-white transition cursor-pointer active:scale-95"
            title="Reload Page"
            aria-label="Reload"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-[#101b2a] hover:bg-[#18293f] text-slate-300 hover:text-white transition cursor-pointer active:scale-95"
            title="Close"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Loading progress indicator */}
      {isLoading && (
        <div className="w-full h-1 bg-[#09111c] overflow-hidden">
          <div className="w-full h-full bg-[#38bdf8] animate-pulse" />
        </div>
      )}

      {/* Embedded View - Clean fullscreen webview with NO URL and NO external links */}
      <div className="flex-1 w-full h-full relative bg-white">
        <iframe
          key={iframeKey}
          src={platform.url}
          title={platform.name}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
};

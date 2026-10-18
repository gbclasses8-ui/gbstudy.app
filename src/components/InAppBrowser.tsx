import React, { useState } from 'react';
import { ArrowLeft, RotateCw, ExternalLink, X, ShieldAlert, Globe } from 'lucide-react';
import { Platform } from '../types';

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

  const handleOpenExternal = () => {
    window.open(platform.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#070b12] text-white animate-in fade-in duration-200">
      {/* In-App Browser Top Navigation Bar */}
      <div className="px-4 py-2.5 bg-[#09111c] border-b border-[#172535] flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-[#101b2a] hover:bg-[#18293f] text-slate-300 hover:text-white transition flex items-center gap-1 cursor-pointer"
            title="Back to GB STUDY"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span className="text-xs font-bold hidden sm:inline">Back</span>
          </button>

          {/* Platform Icon & URL pill */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-[#142335] flex items-center justify-center p-1 shrink-0 overflow-hidden">
              {platform.icon && platform.icon.startsWith('http') ? (
                <img src={platform.icon} alt={platform.name} className="w-full h-full object-contain" />
              ) : (
                <Globe className="w-4 h-4 text-[#38bdf8]" />
              )}
            </div>

            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm font-extrabold text-white truncate leading-tight">
                {platform.name}
              </h3>
              <p className="text-[10px] text-slate-400 font-mono truncate max-w-[200px] sm:max-w-md">
                {platform.url}
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleRefresh}
            className="p-2 rounded-xl bg-[#101b2a] hover:bg-[#18293f] text-slate-300 hover:text-white transition cursor-pointer"
            title="Reload Page"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleOpenExternal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0c2438] hover:bg-[#123652] text-[#38bdf8] border border-[#164e63] text-xs font-bold transition cursor-pointer"
            title="Open in External Browser"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Open in Browser</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#101b2a] hover:bg-[#18293f] text-slate-300 hover:text-white transition cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Loading indicator bar */}
      {isLoading && (
        <div className="w-full h-1 bg-[#09111c] overflow-hidden">
          <div className="w-full h-full bg-[#38bdf8] animate-pulse" />
        </div>
      )}

      {/* Embedded Iframe View */}
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

      {/* Bottom Safety Helper */}
      <div className="px-3 py-1.5 bg-[#08101a] border-t border-[#141f2d] text-center flex items-center justify-center gap-2 text-[11px] text-slate-400">
        <span>Running inside GB STUDY In-App Browser.</span>
        <button
          onClick={handleOpenExternal}
          className="text-[#38bdf8] hover:underline font-semibold flex items-center gap-0.5"
        >
          <span>Open in new tab</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

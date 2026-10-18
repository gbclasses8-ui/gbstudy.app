import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Banner } from '../types';

interface BannerCarouselProps {
  banners: Banner[];
  onOpenBanner: (banner: Banner) => void;
}

export const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners, onOpenBanner }) => {
  const activeBanners = banners.filter((b) => b.active);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Autoplay
  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeBanners.length]);

  if (activeBanners.length === 0) return null;

  const current = activeBanners[currentIndex] || activeBanners[0];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    } else if (diff < -50) {
      setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
    }
    touchStartX.current = null;
  };

  return (
    <div 
      className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-[#1e2f42] bg-[#0c1520] group select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Banner Image */}
      <div 
        onClick={() => onOpenBanner(current)}
        className="w-full relative cursor-pointer"
      >
        <img
          src={current.imageUrl}
          alt={current.title || 'GB STUDY Banner'}
          className="w-full h-auto object-cover max-h-[195px] min-h-[120px] transition-all duration-300"
          onError={(e) => {
            // fallback
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop';
          }}
        />

        {current.title && (
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-6 flex items-center justify-between text-white">
            <span className="text-xs sm:text-sm font-bold truncate">
              {current.title}
            </span>
            {current.actionUrl && (
              <span className="text-[10px] text-[#38bdf8] flex items-center gap-1 font-bold shrink-0 ml-2">
                <span>View</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            )}
          </div>
        )}
      </div>

      {/* Multiple Banners Navigation (Dots & Arrows) */}
      {activeBanners.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % activeBanners.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-2 right-3 z-10 flex items-center gap-1.5">
            {activeBanners.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-4 bg-[#38bdf8]' : 'w-1.5 bg-slate-500 hover:bg-slate-300'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

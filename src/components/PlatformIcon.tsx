import React, { useState } from 'react';
import { BookOpen, GraduationCap, Globe } from 'lucide-react';

interface PlatformIconProps {
  icon?: string;
  name: string;
  className?: string;
}

export const PlatformIcon: React.FC<PlatformIconProps> = ({
  icon,
  name,
  className = 'w-11 h-11',
}) => {
  const [hasError, setHasError] = useState(false);

  // Derive 1-3 initials for fallback badge
  const initials = (name || 'GB')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase() || 'GB';

  // Check if valid image source
  const isImageSrc =
    icon &&
    !hasError &&
    (icon.startsWith('http://') ||
      icon.startsWith('https://') ||
      icon.startsWith('data:image/') ||
      icon.startsWith('/'));

  return (
    <div
      className={`relative shrink-0 rounded-2xl bg-[#0f1926] border border-[#1b2b3d] p-1.5 flex items-center justify-center overflow-hidden shadow-sm ${className}`}
    >
      {isImageSrc ? (
        <img
          src={icon}
          alt={name}
          className="w-full h-full object-contain transition duration-200"
          loading="lazy"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#0c2438] via-[#091827] to-[#06111c] flex items-center justify-center border border-[#164e63]/40">
          <span className="text-xs font-black text-[#38bdf8] tracking-wider select-none">
            {initials}
          </span>
        </div>
      )}
    </div>
  );
};

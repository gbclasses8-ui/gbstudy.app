import React from 'react';

interface GbLogoProps {
  className?: string;
  size?: number;
}

export const GB_LOGO_SRC = '/gb-logo.png';
export const GB_LOGO_REMOTE = 'https://i.ibb.co/Q3g9fGSt/1791541921524.png';

export const GbLogo: React.FC<GbLogoProps> = ({ className = 'w-10 h-10' }) => {
  return (
    <div className={`relative shrink-0 select-none overflow-hidden rounded-2xl ${className}`}>
      <img
        src={GB_LOGO_SRC}
        alt="GB STUDY"
        className="w-full h-full object-contain"
        onError={(e) => {
          // Fallback to remote ibb URL if local path fails
          const target = e.target as HTMLImageElement;
          if (target.src !== GB_LOGO_REMOTE) {
            target.src = GB_LOGO_REMOTE;
          }
        }}
      />
    </div>
  );
};

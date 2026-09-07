import React from 'react';

interface EqxLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const EqxLogo: React.FC<EqxLogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const pixelSize = size === 'sm' ? 32 : size === 'lg' ? 48 : 40;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div 
        className="flex items-center justify-center flex-shrink-0"
        style={{ width: pixelSize, height: pixelSize }}
      >
        <svg
          viewBox="0 0 60 60"
          width={pixelSize}
          height={pixelSize}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="eqxGradMarkAnim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="amberGlowMarkAnim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <filter id="eqxGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <style>{`
              @keyframes eqxSpinClockwise {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              @keyframes eqxSpinCounter {
                from { transform: rotate(360deg); }
                to { transform: rotate(0deg); }
              }
              @keyframes eqxPulseGlow {
                0%, 100% { opacity: 0.6; filter: drop-shadow(0 0 2px #06b6d4); }
                50% { opacity: 1; filter: drop-shadow(0 0 6px #f59e0b); }
              }
              .eqx-outer-ring {
                transform-origin: 24px 24px;
                animation: eqxSpinCounter 20s linear infinite;
              }
              .eqx-turbine-blades {
                transform-origin: 24px 24px;
                animation: eqxSpinClockwise 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
              }
              .eqx-turbine-blades:hover {
                animation-duration: 2s;
              }
              .eqx-center-core {
                animation: eqxPulseGlow 3s ease-in-out infinite;
              }
            `}</style>
          </defs>
          <g transform="translate(6, 6)">
            {/* Rotating telemetry radar ring */}
            <circle
              className="eqx-outer-ring"
              cx="24"
              cy="24"
              r="23"
              stroke="url(#eqxGradMarkAnim)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.7"
            />
            {/* Static dark housing */}
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="#0b0f17"
              stroke="#1e293b"
              strokeWidth="1.2"
            />
            {/* Animated rotating aerodynamic blades */}
            <g className="eqx-turbine-blades">
              <path
                d="M24 10 C29 10, 34 14, 33 21 C31 23, 26 23, 24 24 Z"
                fill="url(#eqxGradMarkAnim)"
              />
              <path
                d="M38 24 C38 29, 34 34, 27 33 C25 31, 25 26, 24 24 Z"
                fill="url(#amberGlowMarkAnim)"
              />
              <path
                d="M24 38 C19 38, 14 34, 15 27 C17 25, 22 25, 24 24 Z"
                fill="url(#eqxGradMarkAnim)"
              />
              <path
                d="M10 24 C10 19, 14 14, 21 15 C23 17, 23 22, 24 24 Z"
                fill="url(#amberGlowMarkAnim)"
              />
            </g>
            {/* Core Hub with kinetic glow */}
            <circle className="eqx-center-core" cx="24" cy="24" r="4.5" fill="#ffffff" />
            <circle cx="24" cy="24" r="2" fill="#07090e" />
          </g>
        </svg>
      </div>

      {showText && (
        <div className="flex items-center gap-2">
          <span className="font-epilogue font-black tracking-wider text-white text-lg leading-none">
            EQX
          </span>
          <div className="h-3.5 w-[1px] bg-slate-700"></div>
          <div className="flex flex-col font-space-grotesk text-[8px] sm:text-[9px] font-bold leading-tight tracking-widest uppercase">
            <span className="text-[#06b6d4]">EMPOWER</span>
            <span className="text-slate-400">SOLUTIONS</span>
          </div>
        </div>
      )}
    </div>
  );
};

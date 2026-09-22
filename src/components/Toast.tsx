import React from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'error';
  onClose: () => void;
}

const TONES = {
  success: {
    frame: 'border-emerald-500/40',
    chip: 'bg-emerald-500/20 text-emerald-400',
    icon: 'check_circle',
  },
  info: {
    frame: 'border-[#06b6d4]/40',
    chip: 'bg-[#06b6d4]/20 text-[#4cd7f6]',
    icon: 'info',
  },
  error: {
    frame: 'border-rose-500/40',
    chip: 'bg-rose-500/20 text-rose-400',
    icon: 'error',
  },
} as const;

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  const tone = TONES[type];
  return (
    <div className={`max-w-md rounded-2xl bg-[#131923] border ${tone.frame} p-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl flex items-center justify-between gap-3 animate-fade-in-up`}>
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl ${tone.chip} flex items-center justify-center flex-shrink-0`}>
          <span className="material-symbols-outlined text-[20px]">
            {tone.icon}
          </span>
        </div>
        <p className="font-body text-xs sm:text-sm text-slate-200">
          {message}
        </p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="text-slate-400 hover:text-white p-1 rounded-lg"
      >
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>
  );
};

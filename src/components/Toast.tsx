import React from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  return (
    <div className="fixed top-24 right-4 sm:right-8 z-50 max-w-md rounded-2xl bg-[#131923] border border-emerald-500/40 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl flex items-center justify-between gap-3 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-[20px]">
            {type === 'success' ? 'check_circle' : 'info'}
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

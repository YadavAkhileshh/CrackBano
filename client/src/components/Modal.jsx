import React from 'react'

function Modal({ children, isOpen, onClose, title, hideHeader }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/60 backdrop-blur-sm animate-fade-in-up">
      <div className="relative flex flex-col bg-white shadow-2xl overflow-hidden rounded-2xl border border-slate-200 max-w-md w-full mx-4 animate-slide-in-right">
        {!hideHeader && (
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          </div>)}
        <button type="button" className="text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 rounded-full text-sm w-10 h-10 flex justify-center items-center absolute top-4 right-4 cursor-pointer transition-all duration-200 hover:scale-110 border border-slate-300" onClick={onClose}>
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l12 12M13 1L1 13"
            />
          </svg>
        </button>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal

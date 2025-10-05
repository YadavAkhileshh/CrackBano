import React from 'react'
import { LuX } from 'react-icons/lu'

function Drawer({ isOpen, onClose, title, children }) {
  return (
    <div
      className={`fixed top-[64px] right-0 z-40 h-[calc(100vh-64px)] p-6 bg-slate-900 w-full shadow-2xl overflow-y-auto md:w-[500px] border-l border-slate-700 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      tabIndex="-1"
      aria-labelledby="drawer-right-label"
    >
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700">
        <h5
          id="drawer-right-label"
          className="text-xl font-bold text-white truncate pr-4"
        >
          {title}
        </h5>
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg p-2 transition-colors duration-200 flex-shrink-0"
        >
          <LuX className="w-5 h-5" />
        </button>
      </div>
      <div className="text-sm">{children}</div>
    </div>
  )
}

export default Drawer

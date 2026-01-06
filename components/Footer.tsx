import React from 'react';

export const Footer = () => {
  return (
    <footer className="relative z-10 bg-black pt-10 pb-10 px-4 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-neutral-600 text-sm font-mono">
                © 2026 F-AST COMPETITION. ALL RIGHTS RESERVED.
            </div>
            <div className="flex gap-6 text-xs text-neutral-700 font-bold uppercase tracking-wider">
                                developed by BENMAKHLOUF LERYEME
            </div>
        </div>
    </footer>
  );
};
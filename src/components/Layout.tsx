import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useHistory } from './HistoryContext';
import { Menu, X, History, Sprout, Bug, TrendingUp, PawPrint, CloudSun } from 'lucide-react';
import { cn } from '../utils/cn';

const navItems = [
  { path: '/yield', label: 'Crop Yield', icon: Sprout },
  { path: '/disease', label: 'Disease Assessment', icon: Bug },
  { path: '/price', label: 'Market Price', icon: TrendingUp },
  { path: '/livestock', label: 'Livestock Anomaly', icon: PawPrint },
  { path: '/drought', label: 'Drought Risk', icon: CloudSun },
];

export const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const { history, clearHistory } = useHistory();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-transparent text-agric-text font-sans relative">
      {/* Background Layer */}
      <div className="bg-mesh-layer">
        <div className="blob-a"></div>
        <div className="blob-b"></div>
        <div className="blob-c"></div>
        <div className="mote mote-1"></div>
        <div className="mote mote-2"></div>
        <div className="mote mote-3"></div>
        <div className="mote mote-4"></div>
        <div className="mote mote-5"></div>
        <div className="mote mote-6"></div>
      </div>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-agric-panel border-b border-agric-border sticky top-0 z-20">
        <NavLink to="/" className="text-xl font-bold tracking-tight text-agric-accent uppercase">AGRIC-MASTER</NavLink>
        <div className="flex gap-2">
          <button onClick={() => setHistoryOpen(!historyOpen)} className="p-2 text-agric-text-muted hover:text-agric-text" aria-label="History">
            <History size={20} />
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-agric-text-muted hover:text-agric-text" aria-label="Menu">
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Sidebar Nav (Desktop) / Dropdown (Mobile) */}
      <nav className={cn(
        "md:w-[260px] agric-sidebar flex-col md:flex fixed md:sticky top-0 h-screen md:h-screen z-10 transition-transform duration-300 md:translate-x-0 w-64 md:z-0 left-0",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 hidden md:block">
          <NavLink to="/" className="text-[20px] font-bold tracking-[1px] text-agric-accent uppercase flex items-center gap-2 logo-text logo-glow">
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1.8 9.2a7 7 0 0 1-9.8 8.8Z'/><path d='M7 16a4 4 0 0 1 0-8'/><line x1='11' y1='12' x2='12' y2='12'/></svg>
            AGRIC-MASTER
          </NavLink>
        </div>
        
        <div className="flex-1 py-4 md:py-0 overflow-y-auto px-4 md:px-6">
          <ul className="space-y-2 mt-16 md:mt-0">
            {navItems.map((item) => {
              const moduleClass = item.path === '/disease' ? 'nav-disease' : item.path === '/price' ? 'nav-price' : item.path === '/drought' ? 'nav-drought' : '';
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => cn(
                      "agric-nav-item",
                      moduleClass,
                      isActive ? "active" : ""
                    )}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-transparent relative">
        {/* Desktop Header for History Toggle */}
        <div className="hidden md:flex justify-end p-4 sticky top-0 z-10 pointer-events-none">
          <button 
            onClick={() => setHistoryOpen(!historyOpen)}
            className="flex items-center gap-2 px-3 py-2 bg-agric-panel text-agric-text-muted shadow-sm rounded-lg border border-agric-border hover:bg-agric-border transition-colors pointer-events-auto"
          >
            <History size={16} />
            <span className="text-sm font-medium">History</span>
          </button>
        </div>

        <div className="flex-1 p-8 md:p-8 max-w-5xl mx-auto w-full flex flex-col gap-6">
          <Outlet />
        </div>
      </main>

      {/* History Sidebar Panel */}
      <aside className={cn(
        "fixed right-0 top-0 h-screen w-80 bg-agric-panel border-l border-agric-border z-30 transition-transform duration-300 flex flex-col",
        historyOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-agric-border">
          <h2 className="text-xs font-bold text-agric-primary tracking-wider uppercase flex items-center gap-2">
            <History size={16} />
            Session History
          </h2>
          <button onClick={() => setHistoryOpen(false)} className="p-1.5 text-agric-text-muted hover:text-agric-text hover:bg-agric-border rounded-md">
            <X size={18} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-0">
          {history.length === 0 ? (
            <div className="text-center text-agric-text-dim text-sm mt-10">
              No recent assessments in this session.
            </div>
          ) : (
            history.map((item) => (
              <div key={item.id} className="py-2 border-b border-agric-border-dim text-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-agric-text capitalize">{item.module}</span>
                  <span className="text-xs text-agric-text-dim">{new Date(item.timestamp).toLocaleTimeString()}</span>
                </div>
                <div className="text-agric-accent font-semibold mb-1 truncate text-xs">
                  {item.result.prediction}
                </div>
                <div className="text-agric-text-muted text-xs line-clamp-2">
                  {item.result.reasoning}
                </div>
              </div>
            ))
          )}
        </div>
        
        {history.length > 0 && (
          <div className="p-4 border-t border-agric-border">
            <button 
              onClick={clearHistory}
              className="w-full text-sm font-medium text-red-400 hover:bg-red-400/10 py-2 rounded-md transition-colors"
            >
              Clear History
            </button>
          </div>
        )}
      </aside>

      {/* Mobile Overlay for Sidebar & History */}
      {(mobileMenuOpen || historyOpen) && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-0 md:hidden"
          onClick={() => { setMobileMenuOpen(false); setHistoryOpen(false); }}
        />
      )}
    </div>
  );
};

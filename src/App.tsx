import React, { useState } from 'react';
import { RaporProvider, useRapor } from './context/RaporContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { DataSiswaView } from './components/DataSiswaView';
import { MataPelajaranView } from './components/MataPelajaranView';
import { CPTPView } from './components/CPTPView';
import { KKTPView } from './components/KKTPView';
import { InputNilaiView } from './components/InputNilaiView';
import { DeskripsiAIView } from './components/DeskripsiAIView';
import { PresensiEkstraView } from './components/PresensiEkstraView';
import { P5View } from './components/P5View';
import { LegerView } from './components/LegerView';
import { AnalisisView } from './components/AnalisisView';
import { CetakRaporView } from './components/CetakRaporView';
import { SettingsSecurityView } from './components/SettingsSecurityView';
import {
  Menu,
  X,
  CheckCircle2,
  AlertCircle,
  Info,
  Sparkles
} from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, toasts, removeToast } = useRapor();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'data-siswa':
        return <DataSiswaView />;
      case 'mata-pelajaran':
        return <MataPelajaranView />;
      case 'tp-cp':
        return <CPTPView />;
      case 'kktp':
        return <KKTPView />;
      case 'input-nilai':
        return <InputNilaiView />;
      case 'deskripsi-ai':
        return <DeskripsiAIView />;
      case 'absen':
      case 'ekstrakurikuler':
        return <PresensiEkstraView />;
      case 'kokurikuler':
        return <P5View />;
      case 'leger':
        return <LegerView />;
      case 'analisis':
        return <AnalisisView />;
      case 'cetak-rapor':
        return <CetakRaporView />;
      case 'keamanan':
        return <SettingsSecurityView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <Header />

      {/* Mobile Menu Button (Only visible on small screens when not printing) */}
      <div className="md:hidden bg-slate-900 text-white px-4 py-2 flex items-center justify-between border-b border-slate-800 print:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="flex items-center space-x-2 text-xs font-bold text-sky-300"
        >
          <Menu className="w-5 h-5 text-white" />
          <span>Menu Navigasi e-Rapor</span>
        </button>
        <span className="text-[11px] text-amber-400 font-semibold uppercase">
          {activeTab.replace('-', ' ')}
        </span>
      </div>

      {/* Main Body Area: Sidebar + Active View */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* View Content */}
        <main className="flex-1 p-3 sm:p-6 overflow-y-auto max-w-full">
          {renderActiveView()}
        </main>
      </div>

      {/* Floating Notification Toasts */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm w-full pointer-events-none print:hidden">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-xl shadow-lg border text-xs font-medium flex items-start gap-2.5 transition-all transform animate-in fade-in slide-in-from-bottom-2 ${
              toast.type === 'success'
                ? 'bg-slate-900 text-white border-emerald-500'
                : toast.type === 'error'
                ? 'bg-rose-950 text-white border-rose-500'
                : toast.type === 'warning'
                ? 'bg-amber-950 text-white border-amber-500'
                : 'bg-slate-900 text-white border-sky-500'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            ) : (
              <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 leading-snug">{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white shrink-0 ml-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <RaporProvider>
      <AppContent />
    </RaporProvider>
  );
}

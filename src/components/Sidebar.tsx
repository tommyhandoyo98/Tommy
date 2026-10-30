import React from 'react';
import { useRapor } from '../context/RaporContext';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  CalendarCheck,
  Target,
  Medal,
  PenLine,
  FileSpreadsheet,
  FileText,
  Compass,
  Sliders,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Award
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const {
    teacher,
    activeTab,
    setActiveTab,
    students,
    subjects,
    extracurriculars,
    selectedFase
  } = useRapor();

  const navItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
    { id: 'data-siswa', label: 'Data Siswa', icon: Users, badge: students.length },
    { id: 'mata-pelajaran', label: 'Mata Pelajaran', icon: BookOpen, badge: subjects.length },
    { id: 'absen', label: 'Absen / Presensi', icon: CalendarCheck },
    { id: 'tp-cp', label: 'Capaian & TP (CP/TP)', icon: Target },
    { id: 'kktp', label: 'Standar KKTP', icon: Sliders },
    { id: 'ekstrakurikuler', label: 'Ekstrakurikuler', icon: Medal, badge: extracurriculars.length },
    { id: 'input-nilai', label: 'Input Nilai Siswa', icon: PenLine, highlight: true },
    { id: 'deskripsi-ai', label: 'Deskripsi Rapor AI', icon: Sparkles, highlightAi: true },
    { id: 'kokurikuler', label: 'Input Kokurikuler (P5)', icon: Compass },
    { id: 'leger', label: 'Rekap Nilai / Leger', icon: FileSpreadsheet },
    { id: 'analisis', label: 'Analisis Belajar Siswa', icon: TrendingUp },
    { id: 'cetak-rapor', label: 'Cetak Rapor & PDF', icon: FileText, primary: true },
    { id: 'keamanan', label: 'Keamanan Data & Backup', icon: ShieldCheck },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 md:hidden backdrop-blur-sm"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 text-slate-200 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:z-20 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Profile Card Header matching screenshot */}
        <div className="p-4 bg-gradient-to-b from-slate-800 to-slate-900 border-b border-slate-700/80">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-md">
              <Award className="w-5 h-5 text-slate-950" />
            </div>
            <div className="overflow-hidden">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-400 truncate">
                Guru Kelas {teacher.kelas}
              </div>
              <div className="text-sm font-bold text-white truncate" title={teacher.namaGuru}>
                {teacher.namaGuru}
              </div>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 font-mono tracking-tight bg-slate-950/60 px-2 py-1 rounded border border-slate-800 truncate">
            NIP: {teacher.nip}
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-sky-300 font-medium bg-sky-950/40 px-2 py-1 rounded">
            <span>{selectedFase}</span>
            <span>{teacher.semester}</span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1 text-xs font-medium">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all ${
                  isActive
                    ? 'bg-sky-600 text-white font-semibold shadow-md shadow-sky-600/30'
                    : item.highlightAi
                    ? 'bg-violet-950/40 text-violet-200 hover:bg-violet-900/50 hover:text-white border border-violet-800/40'
                    : item.primary
                    ? 'bg-emerald-950/40 text-emerald-200 hover:bg-emerald-900/50 hover:text-white border border-emerald-800/40'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2.5 truncate">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive
                        ? 'text-white'
                        : item.highlightAi
                        ? 'text-amber-400'
                        : item.primary
                        ? 'text-emerald-400'
                        : 'text-slate-400'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white text-sky-800' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {item.highlightAi && !isActive && (
                  <span className="text-[9px] bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
                    AI
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
          <span>e-Rapor Merdeka v2025</span>
          <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Sinkron
          </span>
        </div>
      </aside>
    </>
  );
};

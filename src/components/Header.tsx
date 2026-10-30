import React, { useState } from 'react';
import { useRapor } from '../context/RaporContext';
import { FaseType } from '../types';
import {
  School,
  Maximize2,
  Minimize2,
  ShieldCheck,
  Printer,
  Sparkles,
  BookOpenCheck,
  GraduationCap
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    school,
    teacher,
    selectedFase,
    setSelectedFase,
    setActiveTab,
    addToast
  } = useRapor();

  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
      addToast('Mode Layar Penuh diaktifkan', 'info');
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleFaseChange = (fase: FaseType) => {
    setSelectedFase(fase);
    addToast(`Beralih ke kurikulum ${fase} (${fase === 'Fase A' ? 'Kelas 1-2' : fase === 'Fase B' ? 'Kelas 3-4' : 'Kelas 5-6'})`, 'info');
  };

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-sky-900 via-teal-900 to-slate-900 text-white shadow-md border-b border-sky-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Kemdikbud Logo & School Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-white/10 p-1 flex items-center justify-center border border-white/20 shadow-inner">
            <GraduationCap className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.5 rounded tracking-wider uppercase">
                RAPOR 2025 SD
              </span>
              <span className="text-sky-200 text-xs hidden sm:inline-flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Kurikulum Merdeka
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-white tracking-wide truncate max-w-xs sm:max-w-md">
              {school.namaSekolah}
            </h1>
          </div>
        </div>

        {/* Center: Phase Selector & Year */}
        <div className="flex items-center space-x-2 sm:space-x-3 text-xs">
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-1 border border-white/10 flex items-center gap-1">
            {(['Fase A', 'Fase B', 'Fase C'] as FaseType[]).map((fase) => (
              <button
                key={fase}
                onClick={() => handleFaseChange(fase)}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  selectedFase === fase
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
                title={fase === 'Fase A' ? 'Kelas 1 & 2' : fase === 'Fase B' ? 'Kelas 3 & 4' : 'Kelas 5 & 6'}
              >
                {fase}
              </button>
            ))}
          </div>

          <div className="hidden md:flex flex-col text-right text-xs text-sky-200 border-l border-white/20 pl-3">
            <span className="font-semibold text-white">Tahun Ajaran {teacher.tahunPelajaran}</span>
            <span className="text-[11px] text-amber-300 font-medium">Semester {teacher.semester}</span>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('deskripsi-ai')}
            className="flex items-center space-x-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow transition"
            title="Deskripsi Otomatis AI (Gemini 3.8)"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">AI Deskripsi</span>
          </button>

          <button
            onClick={() => setActiveTab('cetak-rapor')}
            className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow transition"
            title="Cetak Rapor Siswa PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cetak PDF</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition"
            title={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};

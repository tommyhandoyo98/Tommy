import React, { useState } from 'react';
import { useRapor } from '../context/RaporContext';
import { getKKTPCategory } from '../utils/calculations';
import {
  Sparkles,
  Bot,
  User,
  BookOpen,
  CheckCircle2,
  Edit3,
  Save,
  RotateCcw,
  Zap,
  CheckCheck,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';

export const DeskripsiAIView: React.FC = () => {
  const {
    students,
    subjects,
    grades,
    selectedFase,
    learningObjectives,
    kktpConfig,
    generateAIDescriptionForStudent,
    generateAIDescriptionsForWholeClass,
    updateGradeDescriptionsManually,
    addToast
  } = useRapor();

  const [activeStudentId, setActiveStudentId] = useState<string>(students[0]?.id || 'std-1');
  const [activeSubjectId, setActiveSubjectId] = useState<string>(subjects[0]?.id || 'mapel-1');
  const [selectedTone, setSelectedTone] = useState<'resmi' | 'motivatif' | 'ringkas'>('resmi');
  const [isGeneratingSingle, setIsGeneratingSingle] = useState(false);
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);

  // Manual editing state
  const currentStudent = students.find((s) => s.id === activeStudentId) || students[0];
  const currentSubject = subjects.find((s) => s.id === activeSubjectId) || subjects[0];
  const currentGrade = grades.find(
    (g) => g.studentId === activeStudentId && g.subjectId === activeSubjectId
  );

  const [editHighest, setEditHighest] = useState(currentGrade?.deskripsiCapaianTertinggi || '');
  const [editLowest, setEditLowest] = useState(currentGrade?.deskripsiCapaianTerendah || '');

  // Keep editor in sync when student or subject changes
  React.useEffect(() => {
    if (currentGrade) {
      setEditHighest(currentGrade.deskripsiCapaianTertinggi || '');
      setEditLowest(currentGrade.deskripsiCapaianTerendah || '');
    }
  }, [activeStudentId, activeSubjectId, currentGrade]);

  const subTPs = learningObjectives.filter(
    (tp) => tp.subjectId === activeSubjectId && tp.fase === selectedFase && tp.aktif
  );
  const highTP = subTPs.find((tp) => tp.id === currentGrade?.capaianTertinggiTPId);
  const lowTP = subTPs.find((tp) => tp.id === currentGrade?.capaianTerendahTPId);
  const kktpCat = getKKTPCategory(currentGrade?.nilaiAkhir || 0, kktpConfig);

  const handleGenerateSingle = async () => {
    setIsGeneratingSingle(true);
    await generateAIDescriptionForStudent(activeStudentId, activeSubjectId, selectedTone);
    setIsGeneratingSingle(false);
  };

  const handleGenerateClass = async () => {
    setIsGeneratingAll(true);
    await generateAIDescriptionsForWholeClass(activeSubjectId, selectedTone);
    setIsGeneratingAll(false);
  };

  const handleSaveManual = () => {
    updateGradeDescriptionsManually(activeStudentId, activeSubjectId, editHighest, editLowest);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-violet-900 via-purple-900 to-indigo-900 text-white rounded-xl shadow-md p-5 border border-violet-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              Penyusun Deskripsi Rapor Otomatis Berbasis AI (Gemini 3.8 Flash)
            </h2>
          </div>
          <p className="text-xs text-violet-200 mt-1 max-w-2xl">
            Menyusun narasi capaian pembelajaran siswa secara otomatis dan bermakna sesuai nilai asesmen Tujuan Pembelajaran (TP) dan regulasi resmi Kurikulum Merdeka Kemendikbudristek.
          </p>
        </div>

        <button
          onClick={handleGenerateClass}
          disabled={isGeneratingAll}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md transition disabled:opacity-50"
        >
          <Zap className="w-4 h-4" />
          {isGeneratingAll ? 'Menyusun Narasi 1 Kelas...' : `Generate AI Seluruh Siswa (${currentSubject?.kode})`}
        </button>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Subject selector */}
        <div className="md:col-span-5 bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-sky-600" />
            Pilih Mata Pelajaran
          </label>
          <select
            value={activeSubjectId}
            onChange={(e) => setActiveSubjectId(e.target.value)}
            className="w-full text-xs font-semibold px-3 py-2 border rounded-lg bg-slate-50 text-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
          >
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.kode} - {s.nama}
              </option>
            ))}
          </select>
        </div>

        {/* Tone Selector */}
        <div className="md:col-span-7 bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Bot className="w-4 h-4 text-violet-600" />
            Gaya Bahasa / Karakter Narasi AI
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'resmi', label: 'Resmi Standar', desc: 'Sesuai format baku Kemendikbud' },
              { id: 'motivatif', label: 'Motivatif & Hangat', desc: 'Membangun rasa percaya diri anak' },
              { id: 'ringkas', label: 'Ringkas & Padat', desc: 'To the point dan esensial' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTone(t.id as any)}
                className={`p-2 rounded-lg text-left border transition text-xs ${
                  selectedTone === t.id
                    ? 'bg-violet-50 border-violet-500 text-violet-900 ring-1 ring-violet-400'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold text-[11px]">{t.label}</div>
                <div className="text-[10px] text-slate-500 truncate">{t.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Workspace: Left Student List, Right Narrative Generator & Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Student Selector List (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[580px]">
          <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-800">
            <span>Daftar Siswa ({students.length})</span>
            <span className="text-[10px] text-slate-500 font-normal">Klik untuk menyusun</span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-1">
            {students.map((std, idx) => {
              const gradeRec = grades.find(
                (g) => g.studentId === std.id && g.subjectId === activeSubjectId
              );
              const isSelected = activeStudentId === std.id;

              return (
                <button
                  key={std.id}
                  onClick={() => setActiveStudentId(std.id)}
                  className={`w-full p-2.5 rounded-lg text-left transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div className="truncate">
                      <div className="font-bold text-xs truncate">{std.nama}</div>
                      <div
                        className={`text-[10px] ${
                          isSelected ? 'text-violet-200' : 'text-slate-400'
                        }`}
                      >
                        Nilai Akhir: <b>{gradeRec?.nilaiAkhir ?? 0}</b>
                      </div>
                    </div>
                  </div>

                  {gradeRec?.isAiGenerated ? (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                        isSelected ? 'bg-white text-violet-900' : 'bg-violet-100 text-violet-700'
                      }`}
                    >
                      AI
                    </span>
                  ) : (
                    <ChevronRight
                      className={`w-4 h-4 ${
                        isSelected ? 'text-white' : 'text-slate-300'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: AI Narration Builder & Live Editor (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Student Status Summary Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Peserta Didik Terpilih
                </span>
                <h3 className="text-base font-extrabold text-slate-900">{currentStudent.nama}</h3>
                <span className="text-xs text-slate-500 font-mono">NISN: {currentStudent.nisn}</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-medium">Nilai Akhir</span>
                  <span className="text-2xl font-black text-slate-900 font-mono">
                    {currentGrade?.nilaiAkhir ?? 0}
                  </span>
                </div>
                <div
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold ${kktpCat.badgeBg} ${kktpCat.color}`}
                >
                  {kktpCat.label}
                </div>
              </div>
            </div>

            {/* Diagnostic TP findings */}
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block">
                  Capaian Pembelajaran Tertinggi:
                </span>
                <span className="font-semibold text-emerald-950 mt-0.5 block">
                  {highTP?.ringkasan || 'Penguasaan materi pokok tuntas'}
                </span>
              </div>
              <div className="p-2.5 bg-rose-50 rounded-lg border border-rose-200">
                <span className="text-[10px] font-bold text-rose-800 uppercase block">
                  Materi yang Perlu Peningkatan:
                </span>
                <span className="font-semibold text-rose-950 mt-0.5 block">
                  {lowTP?.ringkasan || 'Tidak ada catatan khusus (pertahankan prestasi)'}
                </span>
              </div>
            </div>
          </div>

          {/* AI Narration Generator Output & Live Editor */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-violet-100 text-violet-700 rounded-lg">
                  <Sparkles className="w-4 h-4 text-violet-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Narasi Rapor Kurikulum Merdeka
                  </h4>
                  <span className="text-[11px] text-slate-500">
                    {currentGrade?.isAiGenerated ? 'Disusun oleh Gemini 3.8 Flash' : 'Format bawaan sistem'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleGenerateSingle}
                  disabled={isGeneratingSingle}
                  className="px-3.5 py-1.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 shadow transition disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  {isGeneratingSingle ? 'Menyusun...' : 'Generate AI Siswa Ini'}
                </button>
              </div>
            </div>

            {/* Editable Fields */}
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-emerald-800 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  1. Narasi Capaian Tertinggi (Kompetensi yang Dikuasai)
                </label>
                <textarea
                  rows={3}
                  value={editHighest}
                  onChange={(e) => setEditHighest(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed text-slate-800 font-medium"
                  placeholder="Menunjukkan penguasaan yang sangat baik dalam..."
                />
              </div>

              <div>
                <label className="block font-bold text-rose-800 mb-1 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-rose-600" />
                  2. Narasi Perlu Peningkatan / Pendampingan Remedial
                </label>
                <textarea
                  rows={3}
                  value={editLowest}
                  onChange={(e) => setEditLowest(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none leading-relaxed text-slate-800 font-medium"
                  placeholder="Perlu bimbingan dan peningkatan dalam..."
                />
              </div>

              {/* Combined Preview */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                  Pratinjau Tampilan Cetak Rapor:
                </span>
                <p className="text-xs text-slate-800 leading-relaxed font-serif italic">
                  "{editHighest} {editLowest}"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleSaveManual}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg flex items-center gap-1.5 transition shadow"
                >
                  <Save className="w-3.5 h-3.5" />
                  Simpan Perubahan Narasi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

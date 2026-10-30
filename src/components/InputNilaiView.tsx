import React, { useState } from 'react';
import { useRapor } from '../context/RaporContext';
import { getKKTPCategory } from '../utils/calculations';
import {
  PenLine,
  Sparkles,
  BookOpen,
  Wand2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';

export const InputNilaiView: React.FC = () => {
  const {
    students,
    subjects,
    selectedFase,
    learningObjectives,
    grades,
    kktpConfig,
    updateStudentGrade,
    quickFillRealisticGrades,
    generateAIDescriptionForStudent,
    generateAIDescriptionsForWholeClass,
    setActiveTab,
    addToast
  } = useRapor();

  const [activeSubjectId, setActiveSubjectId] = useState<string>(subjects[0]?.id || 'mapel-1');
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);

  const currentSubject = subjects.find((s) => s.id === activeSubjectId) || subjects[0];
  const currentTPs = learningObjectives.filter(
    (tp) => tp.subjectId === activeSubjectId && tp.fase === selectedFase && tp.aktif
  );

  const handleScoreChange = (studentId: string, tpId: string, val: string) => {
    const num = Math.min(100, Math.max(0, Number(val) || 0));
    const studentGrade = grades.find(
      (g) => g.studentId === studentId && g.subjectId === activeSubjectId
    );
    const updatedTPScores = {
      ...(studentGrade?.tpScores || {}),
      [tpId]: num,
    };
    const sas = studentGrade?.nilaiSAS ?? 80;
    updateStudentGrade(studentId, activeSubjectId, updatedTPScores, sas);
  };

  const handleSASChange = (studentId: string, val: string) => {
    const num = Math.min(100, Math.max(0, Number(val) || 0));
    const studentGrade = grades.find(
      (g) => g.studentId === studentId && g.subjectId === activeSubjectId
    );
    const tpScores = studentGrade?.tpScores || {};
    updateStudentGrade(studentId, activeSubjectId, tpScores, num);
  };

  const handleGenerateClassAI = async () => {
    setIsGeneratingAll(true);
    await generateAIDescriptionsForWholeClass(activeSubjectId, 'resmi');
    setIsGeneratingAll(false);
  };

  return (
    <div className="space-y-5">
      {/* Top Banner and Quick Subject Selector */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
              <PenLine className="w-5 h-5 text-sky-600" />
              Input Nilai Peserta Didik (Kurikulum Merdeka)
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
              {selectedFase}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Nilai Akhir (NA), capaian tertinggi, dan tujuan bimbingan terhitung otomatis secara real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => quickFillRealisticGrades(activeSubjectId)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition"
            title="Isi otomatis dengan data nilai simulasi realistis untuk pengujian"
          >
            <Wand2 className="w-3.5 h-3.5 text-amber-600" />
            Simulasi Nilai Cepat
          </button>

          <button
            onClick={handleGenerateClassAI}
            disabled={isGeneratingAll}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-lg transition shadow disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            {isGeneratingAll ? 'Menyusun Narasi AI...' : 'Generate AI Seluruh Kelas'}
          </button>
        </div>
      </div>

      {/* Subject Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {subjects.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSubjectId(s.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeSubjectId === s.id
                ? 'bg-sky-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span className="font-mono font-bold text-[11px]">{s.kode}</span>
            <span className="text-[10px] opacity-80 truncate max-w-[110px]">{s.nama}</span>
          </button>
        ))}
      </div>

      {/* Active Subject Info Header */}
      <div className="bg-sky-50 border border-sky-200 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-bold text-sky-950 text-sm">{currentSubject?.nama}</span>
          <span className="font-mono bg-sky-200/70 text-sky-900 px-2 py-0.5 rounded text-[11px] font-bold">
            KKTP: {currentSubject?.kktp || kktpConfig.kriteriaMinimal}
          </span>
          <span className="text-slate-600 hidden sm:inline">
            Guru: <b>{currentSubject?.guruPengampu || 'Tommy Handoyo, S.Pd'}</b>
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-600">
          <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Capaian Tertinggi
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-rose-700 ml-2">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span> Perlu Bimbingan
          </span>
        </div>
      </div>

      {/* Interactive Grade Spreadsheet Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-800 text-white font-semibold tracking-wider">
              <tr>
                <th className="py-3 px-3 text-center w-10 border-r border-slate-700">No</th>
                <th className="py-3 px-3 w-48 border-r border-slate-700">Nama Siswa</th>
                {/* Dynamically render TP columns */}
                {currentTPs.map((tp, idx) => (
                  <th
                    key={tp.id}
                    className="py-2 px-2 text-center w-20 border-r border-slate-700 bg-slate-900/60"
                    title={tp.deskripsi}
                  >
                    <div className="font-mono text-amber-400 font-bold">{tp.kodeTP}</div>
                    <div className="text-[9px] text-slate-300 truncate max-w-[80px] font-normal">
                      {tp.ringkasan}
                    </div>
                  </th>
                ))}
                <th className="py-3 px-2 text-center w-20 border-r border-slate-700 bg-sky-950 text-sky-200">
                  Rata-rata Materi
                </th>
                <th className="py-3 px-2 text-center w-20 border-r border-slate-700 bg-indigo-950 text-indigo-200">
                  SAS / SAT
                </th>
                <th className="py-3 px-2 text-center w-20 border-r border-slate-700 bg-emerald-950 text-emerald-200">
                  Nilai Akhir (NA)
                </th>
                <th className="py-3 px-3 text-center w-28 border-r border-slate-700">Predikat KKTP</th>
                <th className="py-3 px-3 text-center w-36">Status Rapor AI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((std, idx) => {
                const gradeRec = grades.find(
                  (g) => g.studentId === std.id && g.subjectId === activeSubjectId
                );
                const tpScores = gradeRec?.tpScores || {};
                const na = gradeRec?.nilaiAkhir || 0;
                const kktpCat = getKKTPCategory(na, kktpConfig);

                return (
                  <tr key={std.id} className="hover:bg-sky-50/40 transition">
                    <td className="py-2.5 px-3 text-center font-mono text-slate-500 border-r border-slate-100">
                      {idx + 1}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-slate-900 border-r border-slate-100">
                      <div className="truncate max-w-[180px]">{std.nama}</div>
                      <div className="text-[10px] text-slate-400 font-mono font-normal">{std.nisn}</div>
                    </td>

                    {/* TP input cells */}
                    {currentTPs.map((tp) => {
                      const score = tpScores[tp.id] ?? '';
                      const isHighest = gradeRec?.capaianTertinggiTPId === tp.id && Number(score) > 0;
                      const isLowest =
                        gradeRec?.capaianTerendahTPId === tp.id &&
                        Number(score) > 0 &&
                        gradeRec?.capaianTerendahTPId !== gradeRec?.capaianTertinggiTPId;

                      return (
                        <td
                          key={tp.id}
                          className={`py-1.5 px-1.5 text-center border-r border-slate-100 ${
                            isHighest
                              ? 'bg-emerald-50/80'
                              : isLowest
                              ? 'bg-rose-50/80'
                              : ''
                          }`}
                        >
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={score}
                            onChange={(e) => handleScoreChange(std.id, tp.id, e.target.value)}
                            className={`w-14 py-1 text-center font-bold font-mono text-xs rounded border transition outline-none focus:ring-2 focus:ring-sky-500 ${
                              isHighest
                                ? 'border-emerald-400 bg-emerald-50 text-emerald-900'
                                : isLowest
                                ? 'border-rose-400 bg-rose-50 text-rose-900'
                                : 'border-slate-200 bg-white text-slate-800'
                            }`}
                          />
                        </td>
                      );
                    })}

                    {/* Rata-rata materi */}
                    <td className="py-2.5 px-2 text-center font-bold font-mono text-sky-900 bg-sky-50/30 border-r border-slate-100">
                      {gradeRec?.nilaiSumatifMateri ?? 0}
                    </td>

                    {/* SAS input cell */}
                    <td className="py-1.5 px-2 text-center border-r border-slate-100 bg-indigo-50/30">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={gradeRec?.nilaiSAS ?? ''}
                        onChange={(e) => handleSASChange(std.id, e.target.value)}
                        className="w-14 py-1 text-center font-bold font-mono text-xs rounded border border-indigo-200 bg-white text-indigo-900 outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </td>

                    {/* Nilai Akhir (NA) */}
                    <td className="py-2.5 px-2 text-center font-black font-mono text-sm text-emerald-900 bg-emerald-50/40 border-r border-slate-100">
                      {na}
                    </td>

                    {/* Predikat KKTP */}
                    <td className="py-2.5 px-3 text-center border-r border-slate-100">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${kktpCat.badgeBg} ${kktpCat.color}`}
                      >
                        {kktpCat.label}
                      </span>
                    </td>

                    {/* AI Narration Trigger */}
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => generateAIDescriptionForStudent(std.id, activeSubjectId, 'resmi')}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold flex items-center justify-center gap-1 w-full transition shadow-sm ${
                          gradeRec?.isAiGenerated
                            ? 'bg-violet-100 text-violet-800 border border-violet-200 hover:bg-violet-200'
                            : 'bg-slate-100 text-slate-700 hover:bg-violet-600 hover:text-white'
                        }`}
                        title="Susun narasi Kurikulum Merdeka dengan AI Gemini 3.8"
                      >
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        <span>{gradeRec?.isAiGenerated ? 'Tersusun AI' : 'Buat Narasi AI'}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

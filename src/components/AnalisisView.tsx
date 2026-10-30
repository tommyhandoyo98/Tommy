import React, { useState } from 'react';
import { useRapor } from '../context/RaporContext';
import { computeClassLeger } from '../utils/calculations';
import { requestClassProgressAnalysis, ClassAnalysisResult } from '../utils/aiService';
import {
  TrendingUp,
  Sparkles,
  BarChart3,
  Award,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Users,
  Compass,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export const AnalisisView: React.FC = () => {
  const {
    students,
    subjects,
    grades,
    kktpConfig,
    teacher,
    selectedFase,
    addToast
  } = useRapor();

  const [aiAnalysis, setAiAnalysis] = useState<ClassAnalysisResult | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const legerData = computeClassLeger(students, grades, kktpConfig.kriteriaMinimal);

  // Subject averages
  const subjectAverages = subjects.map((subj) => {
    const subjGrades = grades.filter((g) => g.subjectId === subj.id);
    const validScores = subjGrades.map((g) => g.nilaiAkhir).filter((s) => s > 0);
    const avg = validScores.length > 0
      ? Number((validScores.reduce((a, b) => a + b, 0) / validScores.length).toFixed(1))
      : 0;
    return {
      subject: subj,
      average: avg,
      tuntasCount: validScores.filter((s) => s >= (subj.kktp || kktpConfig.kriteriaMinimal)).length,
      totalCount: validScores.length,
    };
  });

  // Sort subject averages
  const sortedSubjects = [...subjectAverages].sort((a, b) => b.average - a.average);
  const highestSubj = sortedSubjects[0];
  const lowestSubj = sortedSubjects[sortedSubjects.length - 1];

  // Overall class average
  const classAvg = legerData.length > 0
    ? (legerData.reduce((a, b) => a + b.averageScore, 0) / legerData.length).toFixed(1)
    : '0';

  // Ketuntasan KKTP
  const totalStudents = students.length;
  const fullyPassingStudents = legerData.filter((r) => r.belowKKTPCount === 0);
  const passingRate = totalStudents > 0
    ? Math.round((fullyPassingStudents.length / totalStudents) * 100)
    : 100;

  // Top performers & remedial
  const topStudents = legerData.slice(0, 3);
  const studentsNeedingSupport = legerData.filter((r) => r.belowKKTPCount > 0 || r.averageScore < 76);

  // Trigger AI class analysis
  const handleRunAIAnalysis = async () => {
    setIsLoadingAI(true);
    addToast('Menganalisis perkembangan belajar siswa dengan AI...', 'info');

    try {
      const res = await requestClassProgressAnalysis({
        classStats: {
          totalStudents,
          classAverage: Number(classAvg),
          highestSubject: highestSubj?.subject.nama || 'Pendidikan Pancasila',
          lowestSubject: lowestSubj?.subject.nama || 'Matematika',
          topStudents: topStudents.map((s) => `${s.student.nama} (${s.averageScore})`),
          needSupportStudents: studentsNeedingSupport.map((s) => `${s.student.nama} (${s.averageScore})`),
        },
        phase: selectedFase,
      });

      setAiAnalysis(res);
      addToast('Analisis perkembangan belajar real-time berhasil disusun!', 'success');
    } catch {
      addToast('Terjadi kendala saat menganalisis data kelas.', 'error');
    } finally {
      setIsLoadingAI(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sky-600" />
              Analisis Perkembangan Belajar Siswa Real-Time
            </h2>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Data
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Evaluasi diagnostik ketuntasan kompetensi, distribusi nilai, dan rekomendasi pedagogis guru.
          </p>
        </div>

        <button
          onClick={handleRunAIAnalysis}
          disabled={isLoadingAI}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          {isLoadingAI ? 'Menganalisis Real-Time...' : 'Konsultasi AI Pedagogis (Gemini 3.8)'}
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Rata-Rata Kelas</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{classAvg}</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> Optimal
            </span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Skala 0 - 100 (KKTP: {kktpConfig.kriteriaMinimal})</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Tingkat Ketuntasan</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-700">{passingRate}%</span>
            <span className="text-xs font-semibold text-slate-500">
              ({fullyPassingStudents.length}/{totalStudents})
            </span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Siswa melampaui semua KKTP</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Mapel Tertinggi</span>
          <div className="mt-1 truncate font-bold text-sm text-sky-900">
            {highestSubj?.subject.kode} ({highestSubj?.average})
          </div>
          <div className="text-[10px] text-slate-500 truncate mt-1">{highestSubj?.subject.nama}</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Perlu Remedial</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-rose-600">
              {studentsNeedingSupport.length}
            </span>
            <span className="text-xs text-slate-500">Siswa</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Butuh penguatan konsep materi</div>
        </div>
      </div>

      {/* AI Pedagogical Insights Panel */}
      {aiAnalysis && (
        <div className="bg-gradient-to-r from-violet-950 via-purple-900 to-slate-900 text-white rounded-2xl p-5 shadow-lg border border-violet-700/60 space-y-4">
          <div className="flex items-center justify-between border-b border-violet-800/80 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-400 text-slate-950 rounded-xl font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-amber-300">
                  Rekomendasi Pedagogis Guru (AI Konsultan Kurikulum Merdeka)
                </h3>
                <span className="text-[11px] text-violet-200">
                  Dianalisis secara real-time dari data capaian kelas {teacher.kelas}
                </span>
              </div>
            </div>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-violet-200 font-mono">
              Engine: {aiAnalysis.source}
            </span>
          </div>

          <p className="text-xs text-slate-100 leading-relaxed font-medium">
            {aiAnalysis.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
            {/* Strengths */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/10 space-y-2">
              <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Kekuatan Pembelajaran Kelas:
              </span>
              <ul className="space-y-1 text-slate-200 list-disc list-inside">
                {aiAnalysis.strengths.map((str, idx) => (
                  <li key={idx} className="leading-snug">{str}</li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/10 space-y-2">
              <span className="font-bold text-amber-300 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-amber-400" />
                Langkah Strategi Pembelajaran Berdiferensiasi:
              </span>
              <ul className="space-y-1 text-slate-200 list-disc list-inside">
                {aiAnalysis.recommendations.map((rec, idx) => (
                  <li key={idx} className="leading-snug">{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Real-time Subject Performance Chart (Horizontal Progress Bars) */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-sky-600" />
            Performa Capaian Rata-Rata Per Mata Pelajaran
          </h3>
          <span className="text-xs text-slate-500">Standar KKTP Minimal: {kktpConfig.kriteriaMinimal}</span>
        </div>

        <div className="space-y-3">
          {sortedSubjects.map(({ subject, average, tuntasCount, totalCount }) => {
            const isHigh = average >= 85;
            const isWarning = average < (subject.kktp || kktpConfig.kriteriaMinimal);

            return (
              <div key={subject.id} className="space-y-1 text-xs">
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-slate-800 flex items-center gap-2">
                    <span className="font-mono text-[11px] text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200">
                      {subject.kode}
                    </span>
                    <span>{subject.nama}</span>
                  </span>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-slate-400 text-[11px]">
                      Ketuntasan: {tuntasCount}/{totalCount}
                    </span>
                    <span
                      className={`font-bold ${
                        isHigh
                          ? 'text-emerald-700'
                          : isWarning
                          ? 'text-rose-600'
                          : 'text-slate-900'
                      }`}
                    >
                      {average}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${Math.min(100, Math.max(10, average))}%` }}
                    className={`h-full transition-all duration-500 rounded-full ${
                      isHigh
                        ? 'bg-gradient-to-r from-teal-500 to-emerald-600'
                        : isWarning
                        ? 'bg-gradient-to-r from-amber-500 to-rose-600'
                        : 'bg-gradient-to-r from-sky-500 to-indigo-600'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column: Top Students vs Remedial Attention */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              Siswa Berprestasi Akademik Tertinggi
            </h3>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
              Peringkat 1 - 3
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {topStudents.map((rec) => (
              <div
                key={rec.student.id}
                className="p-3 bg-amber-50/50 rounded-xl border border-amber-200 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs shadow-sm">
                    {rec.rank}
                  </span>
                  <div>
                    <div className="font-bold text-slate-900">{rec.student.nama}</div>
                    <div className="text-[10px] text-slate-500 font-mono">NISN: {rec.student.nisn}</div>
                  </div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-base font-black text-amber-800">{rec.averageScore}</div>
                  <div className="text-[10px] text-slate-400">Rata-rata</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Remedial Attention */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              Deteksi Siswa Butuh Bimbingan / Remedial
            </h3>
            <span className="text-[10px] font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded">
              Prioritas Guru
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {studentsNeedingSupport.length > 0 ? (
              studentsNeedingSupport.map((rec) => (
                <div
                  key={rec.student.id}
                  className="p-3 bg-rose-50/50 rounded-xl border border-rose-200 flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-slate-900">{rec.student.nama}</div>
                    <div className="text-[10px] text-rose-700 font-semibold mt-0.5">
                      {rec.belowKKTPCount > 0
                        ? `${rec.belowKKTPCount} mata pelajaran di bawah standar KKTP`
                        : 'Perlu penguatan literasi dan latihan'}
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-base font-black text-rose-800">{rec.averageScore}</div>
                    <div className="text-[10px] text-slate-400">Rata-rata</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-slate-500 bg-slate-50 rounded-xl">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-1" />
                <p className="font-medium text-xs text-slate-700">
                  Luar biasa! Seluruh siswa tuntas melampaui standar KKTP.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

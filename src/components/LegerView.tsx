import React from 'react';
import { useRapor } from '../context/RaporContext';
import { computeClassLeger } from '../utils/calculations';
import {
  FileSpreadsheet,
  Download,
  Printer,
  Award,
  Users,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const LegerView: React.FC = () => {
  const {
    students,
    subjects,
    grades,
    kktpConfig,
    teacher,
    school,
    selectedFase,
    addToast
  } = useRapor();

  const legerData = computeClassLeger(students, grades, kktpConfig.kriteriaMinimal);

  const exportLegerCSV = () => {
    const headers = ['No', 'NISN', 'Nama Siswa', ...subjects.map((s) => s.kode), 'Total Nilai', 'Rata-Rata', 'Peringkat'];
    const rows = legerData.map((rec) => {
      const subjScores = subjects.map((subj) => {
        const g = grades.find((gr) => gr.studentId === rec.student.id && gr.subjectId === subj.id);
        return g?.nilaiAkhir || 0;
      });
      return [
        rec.rank,
        rec.student.nisn,
        `"${rec.student.nama}"`,
        ...subjScores,
        rec.totalScore,
        rec.averageScore,
        rec.rank,
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `LEGER_NILAI_KELAS_${teacher.kelas.replace(/\s+/g, '_')}_${school.namaSekolah.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('File CSV Leger Nilai Kelas berhasil diunduh.', 'success');
  };

  const printLeger = () => {
    window.print();
  };

  // Class Summary stats
  const classAverage =
    legerData.length > 0
      ? (
          legerData.reduce((acc, curr) => acc + curr.averageScore, 0) / legerData.length
        ).toFixed(1)
      : '0';

  return (
    <div className="space-y-5">
      {/* Header and Action Buttons */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-sky-600" />
              Buku Leger Nilai Kelas (Kurikulum Merdeka)
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800">
              Kelas {teacher.kelas} - {selectedFase}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Rekapitulasi seluruh nilai akhir peserta didik untuk semua mata pelajaran semester {teacher.semester}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportLegerCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition"
          >
            <Download className="w-3.5 h-3.5" />
            Ekspor Excel / CSV
          </button>
          <button
            onClick={printLeger}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition shadow"
          >
            <Printer className="w-3.5 h-3.5" />
            Cetak Leger
          </button>
        </div>
      </div>

      {/* Leger Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 print:hidden">
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Jumlah Siswa</span>
            <div className="text-2xl font-black text-slate-900">{students.length}</div>
          </div>
          <div className="p-2.5 bg-sky-100 text-sky-700 rounded-xl">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Rata-Rata Kelas</span>
            <div className="text-2xl font-black text-emerald-700">{classAverage}</div>
          </div>
          <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Nilai Tertinggi Siswa</span>
            <div className="text-2xl font-black text-amber-600">{legerData[0]?.averageScore ?? 0}</div>
          </div>
          <div className="p-2.5 bg-amber-100 text-amber-700 rounded-xl">
            <Award className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Official Leger Printable Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden p-5">
        {/* Printable Header */}
        <div className="text-center pb-4 border-b border-slate-200 mb-4">
          <h1 className="text-base sm:text-lg font-black tracking-wide text-slate-900 uppercase">
            LEGER NILAI HASIL BELAJAR PESERTA DIDIK
          </h1>
          <h2 className="text-xs sm:text-sm font-bold text-slate-700 uppercase mt-0.5">
            {school.namaSekolah}
          </h2>
          <div className="flex items-center justify-center gap-4 text-[11px] text-slate-600 font-medium mt-1">
            <span>Kelas: <b>{teacher.kelas} ({selectedFase})</b></span>
            <span>•</span>
            <span>Semester: <b>{teacher.semester}</b></span>
            <span>•</span>
            <span>Tahun Ajaran: <b>{teacher.tahunPelajaran}</b></span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] text-left border-collapse border border-slate-300">
            <thead className="bg-slate-100 text-slate-800 font-bold uppercase tracking-tight text-center">
              <tr>
                <th className="py-2.5 px-1.5 border border-slate-300 w-8">No</th>
                <th className="py-2.5 px-2 border border-slate-300 w-20">NISN</th>
                <th className="py-2.5 px-2 border border-slate-300 text-left min-w-[160px]">
                  Nama Siswa
                </th>
                {subjects.map((subj) => (
                  <th
                    key={subj.id}
                    className="py-2 px-1 border border-slate-300 w-12 font-mono"
                    title={subj.nama}
                  >
                    {subj.kode}
                  </th>
                ))}
                <th className="py-2.5 px-2 border border-slate-300 w-14 bg-sky-50 text-sky-950">
                  Total
                </th>
                <th className="py-2.5 px-2 border border-slate-300 w-14 bg-emerald-50 text-emerald-950">
                  Rata
                </th>
                <th className="py-2.5 px-2 border border-slate-300 w-12 bg-amber-50 text-amber-950">
                  Rank
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {legerData.map((rec) => {
                const isTop3 = rec.rank <= 3;

                return (
                  <tr
                    key={rec.student.id}
                    className={`hover:bg-sky-50/40 transition ${
                      isTop3 ? 'bg-amber-50/20' : ''
                    }`}
                  >
                    <td className="py-2 px-1.5 text-center font-mono border border-slate-300 font-bold">
                      {rec.rank}
                    </td>
                    <td className="py-2 px-2 text-center font-mono text-[10px] text-slate-600 border border-slate-300">
                      {rec.student.nisn}
                    </td>
                    <td className="py-2 px-2 font-bold text-slate-900 border border-slate-300 truncate max-w-[180px]">
                      {rec.student.nama}
                    </td>

                    {/* Subject scores */}
                    {subjects.map((subj) => {
                      const g = grades.find(
                        (gr) => gr.studentId === rec.student.id && gr.subjectId === subj.id
                      );
                      const score = g?.nilaiAkhir || 0;
                      const isBelowKKTP = score < (subj.kktp || kktpConfig.kriteriaMinimal);

                      return (
                        <td
                          key={subj.id}
                          className={`py-2 px-1 text-center font-mono font-bold border border-slate-300 ${
                            isBelowKKTP ? 'text-rose-600 bg-rose-50/50' : 'text-slate-800'
                          }`}
                        >
                          {score}
                        </td>
                      );
                    })}

                    <td className="py-2 px-2 text-center font-mono font-bold text-sky-950 bg-sky-50/40 border border-slate-300">
                      {rec.totalScore}
                    </td>
                    <td className="py-2 px-2 text-center font-mono font-black text-emerald-950 bg-emerald-50/40 border border-slate-300">
                      {rec.averageScore}
                    </td>
                    <td className="py-2 px-2 text-center font-mono font-black text-amber-700 bg-amber-50/40 border border-slate-300">
                      {rec.rank}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Signatures for Leger */}
        <div className="mt-8 pt-4 grid grid-cols-2 text-xs text-center text-slate-800">
          <div>
            <p>Mengetahui,</p>
            <p className="font-semibold">Kepala {school.namaSekolah}</p>
            <div className="h-16"></div>
            <p className="font-bold underline uppercase">{school.namaKepalaSekolah}</p>
            <p className="font-mono text-[10px] text-slate-600">NIP. {school.nipKepalaSekolah}</p>
          </div>

          <div>
            <p>{teacher.tempatTanggalRapor}</p>
            <p className="font-semibold">Guru Kelas {teacher.kelas}</p>
            <div className="h-16"></div>
            <p className="font-bold underline uppercase">{teacher.namaGuru}</p>
            <p className="font-mono text-[10px] text-slate-600">NIP. {teacher.nip}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

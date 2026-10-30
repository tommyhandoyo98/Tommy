import React, { useState } from 'react';
import { useRapor } from '../context/RaporContext';
import confetti from 'canvas-confetti';
import {
  Printer,
  FileText,
  User,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Download,
  Award,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';

export const CetakRaporView: React.FC = () => {
  const {
    school,
    teacher,
    students,
    subjects,
    grades,
    attendances,
    extracurriculars,
    homeroomNotes,
    selectedFase,
    addToast
  } = useRapor();

  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || 'std-1');
  const [printMode, setPrintMode] = useState<'single' | 'all'>('single');
  const [activeSheet, setActiveSheet] = useState<'all-sheets' | 'cover' | 'biodata' | 'nilai'>('all-sheets');

  const selectedStudentIndex = students.findIndex((s) => s.id === selectedStudentId);
  const selectedStudent = students[selectedStudentIndex] || students[0];

  const handlePrevStudent = () => {
    if (selectedStudentIndex > 0) {
      setSelectedStudentId(students[selectedStudentIndex - 1].id);
    }
  };

  const handleNextStudent = () => {
    if (selectedStudentIndex < students.length - 1) {
      setSelectedStudentId(students[selectedStudentIndex + 1].id);
    }
  };

  const handlePrint = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
    });
    addToast('Membuka jendela cetak PDF sistem...', 'info');
    setTimeout(() => {
      window.print();
    }, 300);
  };

  // Render a single student's complete official report card pages
  const renderStudentReport = (student: typeof selectedStudent) => {
    const studentGrades = grades.filter((g) => g.studentId === student.id);
    const studentAtt = attendances.find((a) => a.studentId === student.id) || {
      sakit: 0,
      izin: 0,
      tanpaKeterangan: 0,
    };
    const studentEkstra = extracurriculars.filter((e) => e.studentId === student.id);
    const studentNote = homeroomNotes.find((n) => n.studentId === student.id);

    return (
      <div key={student.id} className="report-card-container print:page-break-after space-y-8 font-sans">
        {/* ================= SHEET 1: COVER RAPOR ================= */}
        {(activeSheet === 'all-sheets' || activeSheet === 'cover') && (
          <div className="bg-white p-8 sm:p-12 shadow-sm border border-slate-300 rounded-lg max-w-4xl mx-auto min-h-[1050px] flex flex-col justify-between text-center relative print:shadow-none print:border-none print:m-0 print:p-8 print:min-h-screen">
            {/* National Crest & Header */}
            <div>
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <GraduationCap className="w-16 h-16 text-slate-800" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-wider uppercase">
                RAPOR PESERTA DIDIK
              </h1>
              <h2 className="text-base sm:text-lg font-bold text-slate-700 tracking-wide uppercase mt-1">
                SEKOLAH DASAR (SD)
              </h2>
              <div className="w-24 h-1 bg-slate-900 mx-auto my-3"></div>
              <p className="text-sm font-semibold text-slate-600">KURIKULUM MERDEKA</p>
            </div>

            {/* Student & School Box */}
            <div className="my-10 max-w-md mx-auto w-full space-y-6">
              <div className="border-2 border-slate-900 p-5 rounded-lg space-y-3">
                <p className="text-xs text-slate-500 font-semibold uppercase">Nama Peserta Didik:</p>
                <p className="text-lg font-black text-slate-900 tracking-wide uppercase">
                  {student.nama}
                </p>
                <div className="border-t border-slate-300 pt-2 flex justify-between text-xs font-mono">
                  <span>NIS: {student.nis}</span>
                  <span>NISN: {student.nisn}</span>
                </div>
              </div>

              <div className="p-4 border border-slate-300 rounded-lg space-y-1 text-xs">
                <p className="text-slate-500 font-semibold uppercase">Nama Sekolah:</p>
                <p className="text-base font-bold text-slate-900 uppercase">{school.namaSekolah}</p>
                <p className="text-slate-600 font-mono">NPSN: {school.npsn}</p>
              </div>
            </div>

            {/* Footer Cover */}
            <div className="text-xs text-slate-700 font-semibold uppercase space-y-1">
              <p>KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI</p>
              <p>REPUBLIK INDONESIA</p>
              <p className="text-slate-500 font-mono mt-1">Tahun Ajaran {teacher.tahunPelajaran}</p>
            </div>
          </div>
        )}

        {/* ================= SHEET 2: BIODATA SISWA ================= */}
        {(activeSheet === 'all-sheets' || activeSheet === 'biodata') && (
          <div className="bg-white p-8 sm:p-12 shadow-sm border border-slate-300 rounded-lg max-w-4xl mx-auto min-h-[1050px] flex flex-col justify-between text-slate-900 relative print:shadow-none print:border-none print:m-0 print:p-8 print:min-h-screen">
            <div>
              <div className="text-center pb-4 border-b-2 border-slate-900 mb-6">
                <h2 className="text-base sm:text-lg font-black uppercase tracking-wider">
                  KETERANGAN TENTANG DIRI PESERTA DIDIK
                </h2>
              </div>

              <div className="space-y-3 text-xs leading-relaxed max-w-2xl mx-auto">
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-1 font-bold">1.</span>
                  <span className="col-span-4 font-semibold text-slate-700">Nama Lengkap Peserta Didik</span>
                  <span className="col-span-7 font-bold uppercase">: {student.nama}</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-1 font-bold">2.</span>
                  <span className="col-span-4 font-semibold text-slate-700">Nomor Induk Siswa (NIS)</span>
                  <span className="col-span-7 font-mono">: {student.nis}</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-1 font-bold">3.</span>
                  <span className="col-span-4 font-semibold text-slate-700">Nomor Induk Siswa Nasional (NISN)</span>
                  <span className="col-span-7 font-mono">: {student.nisn}</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-1 font-bold">4.</span>
                  <span className="col-span-4 font-semibold text-slate-700">Tempat, Tanggal Lahir</span>
                  <span className="col-span-7">: {student.tempatLahir}, {student.tanggalLahir}</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-1 font-bold">5.</span>
                  <span className="col-span-4 font-semibold text-slate-700">Jenis Kelamin</span>
                  <span className="col-span-7">: {student.jenisKelamin === 'L' ? 'Laki-Laki' : 'Perempuan'}</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-1 font-bold">6.</span>
                  <span className="col-span-4 font-semibold text-slate-700">Agama</span>
                  <span className="col-span-7">: {student.agama}</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-1 font-bold">7.</span>
                  <span className="col-span-4 font-semibold text-slate-700">Alamat Tempat Tinggal</span>
                  <span className="col-span-7">: {student.alamat}</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-1 font-bold">8.</span>
                  <span className="col-span-4 font-semibold text-slate-700">Nama Orang Tua</span>
                  <span className="col-span-7"></span>
                </div>
                <div className="grid grid-cols-12 gap-2 pl-6">
                  <span className="col-span-1">a.</span>
                  <span className="col-span-4 text-slate-600">Ayah</span>
                  <span className="col-span-7 font-semibold">: {student.namaAyah}</span>
                </div>
                <div className="grid grid-cols-12 gap-2 pl-6">
                  <span className="col-span-1">b.</span>
                  <span className="col-span-4 text-slate-600">Ibu</span>
                  <span className="col-span-7 font-semibold">: {student.namaIbu}</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-1 font-bold">9.</span>
                  <span className="col-span-4 font-semibold text-slate-700">Pekerjaan Orang Tua</span>
                  <span className="col-span-7"></span>
                </div>
                <div className="grid grid-cols-12 gap-2 pl-6">
                  <span className="col-span-1">a.</span>
                  <span className="col-span-4 text-slate-600">Ayah</span>
                  <span className="col-span-7">: {student.pekerjaanAyah || 'Wiraswasta'}</span>
                </div>
                <div className="grid grid-cols-12 gap-2 pl-6">
                  <span className="col-span-1">b.</span>
                  <span className="col-span-4 text-slate-600">Ibu</span>
                  <span className="col-span-7">: {student.pekerjaanIbu || 'Ibu Rumah Tangga'}</span>
                </div>
              </div>
            </div>

            {/* Photo Placeholder & Kepsek Signature */}
            <div className="pt-8 grid grid-cols-2 text-xs items-center">
              <div className="flex justify-center">
                <div className="w-24 h-32 border-2 border-dashed border-slate-400 rounded flex flex-col items-center justify-center text-slate-400 text-[10px]">
                  <span>Foto 3 x 4</span>
                  <span className="text-[9px]">Siswa</span>
                </div>
              </div>

              <div className="text-center space-y-1">
                <p>{school.kabupatenKota}, {teacher.tempatTanggalRapor.split(',')[1] || '19 Desember 2025'}</p>
                <p className="font-semibold">Kepala Sekolah,</p>
                <div className="h-16"></div>
                <p className="font-bold underline uppercase">{school.namaKepalaSekolah}</p>
                <p className="font-mono text-[10px] text-slate-600">NIP. {school.nipKepalaSekolah}</p>
              </div>
            </div>
          </div>
        )}

        {/* ================= SHEET 3: LAPORAN NILAI & CAPAIAN KOMPETENSI ================= */}
        {(activeSheet === 'all-sheets' || activeSheet === 'nilai') && (
          <div className="bg-white p-8 sm:p-10 shadow-sm border border-slate-300 rounded-lg max-w-4xl mx-auto min-h-[1050px] flex flex-col justify-between text-slate-900 print:shadow-none print:border-none print:m-0 print:p-6 print:min-h-screen">
            <div>
              {/* Report Header Info */}
              <div className="text-center pb-2 border-b-2 border-slate-800 mb-4">
                <h2 className="text-sm sm:text-base font-black tracking-wider uppercase">
                  LAPORAN HASIL BELAJAR (RAPOR)
                </h2>
              </div>

              {/* Student & School Info Grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs mb-4 pb-3 border-b border-slate-300">
                <div className="space-y-1">
                  <div className="grid grid-cols-3">
                    <span className="text-slate-600">Nama Siswa</span>
                    <span className="col-span-2 font-bold uppercase">: {student.nama}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="text-slate-600">NISN / NIS</span>
                    <span className="col-span-2 font-mono font-medium">: {student.nisn} / {student.nis}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="text-slate-600">Nama Sekolah</span>
                    <span className="col-span-2 font-semibold">: {school.namaSekolah}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="text-slate-600">Alamat Sekolah</span>
                    <span className="col-span-2">: {school.alamatSekolah}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="grid grid-cols-3">
                    <span className="text-slate-600">Kelas / Rombel</span>
                    <span className="col-span-2 font-bold">: {teacher.kelas}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="text-slate-600">Fase</span>
                    <span className="col-span-2 font-semibold">: {selectedFase}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="text-slate-600">Semester</span>
                    <span className="col-span-2">: {teacher.semester}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="text-slate-600">Tahun Pelajaran</span>
                    <span className="col-span-2">: {teacher.tahunPelajaran}</span>
                  </div>
                </div>
              </div>

              {/* Academic Subjects Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-slate-400">
                  <thead className="bg-slate-100 text-slate-800 font-bold uppercase text-center border-b border-slate-400">
                    <tr>
                      <th className="py-2 px-1.5 border border-slate-400 w-8">No</th>
                      <th className="py-2 px-3 border border-slate-400 w-44 text-left">
                        Mata Pelajaran
                      </th>
                      <th className="py-2 px-2 border border-slate-400 w-14">
                        Nilai Akhir
                      </th>
                      <th className="py-2 px-3 border border-slate-400 text-left">
                        Capaian Kompetensi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-300">
                    {subjects.map((subj, idx) => {
                      const g = studentGrades.find((gr) => gr.subjectId === subj.id);
                      const na = g?.nilaiAkhir || 80;
                      const deskripsi =
                        g?.deskripsiAkhir ||
                        `${g?.deskripsiCapaianTertinggi || ''} ${g?.deskripsiCapaianTerendah || ''}`.trim() ||
                        'Menunjukkan penguasaan materi pembelajaran yang baik.';

                      return (
                        <tr key={subj.id} className="align-top">
                          <td className="py-2 px-1.5 text-center font-mono border border-slate-400 font-semibold">
                            {idx + 1}
                          </td>
                          <td className="py-2 px-3 border border-slate-400 font-semibold text-slate-900">
                            {subj.nama}
                          </td>
                          <td className="py-2 px-2 text-center font-mono font-bold text-slate-900 border border-slate-400 bg-slate-50/50">
                            {na}
                          </td>
                          <td className="py-2 px-3 border border-slate-400 text-slate-800 leading-relaxed text-[11px]">
                            {deskripsi}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Ekstrakurikuler, Presensi & Catatan Wali Kelas */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Ekstrakurikuler Table (6 cols) */}
                <div className="md:col-span-7">
                  <table className="w-full text-xs text-left border border-slate-400">
                    <thead className="bg-slate-100 text-slate-800 font-bold text-center border-b border-slate-400">
                      <tr>
                        <th className="py-1.5 px-2 border border-slate-400 w-8">No</th>
                        <th className="py-1.5 px-3 border border-slate-400 text-left">Kegiatan Ekstrakurikuler</th>
                        <th className="py-1.5 px-2 border border-slate-400 w-20">Predikat</th>
                        <th className="py-1.5 px-2 border border-slate-400 text-left">Keterangan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentEkstra.length > 0 ? (
                        studentEkstra.map((ek, i) => (
                          <tr key={ek.id} className="text-[11px]">
                            <td className="py-1 px-2 text-center border border-slate-400 font-mono">{i + 1}</td>
                            <td className="py-1 px-3 border border-slate-400 font-medium">{ek.namaKegiatan}</td>
                            <td className="py-1 px-2 text-center border border-slate-400 font-semibold">{ek.predikat}</td>
                            <td className="py-1 px-2 border border-slate-400 text-slate-700">{ek.keterangan}</td>
                          </tr>
                        ))
                      ) : (
                        <tr className="text-[11px]">
                          <td colSpan={4} className="py-2 text-center text-slate-400 border border-slate-400">
                            Pramuka (Wajib) - Predikat: Baik
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Presensi (5 cols) */}
                <div className="md:col-span-5">
                  <table className="w-full text-xs text-left border border-slate-400">
                    <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-400">
                      <tr>
                        <th colSpan={2} className="py-1.5 px-3 text-center border border-slate-400">
                          Ketidakhadiran
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-[11px]">
                      <tr>
                        <td className="py-1 px-3 border border-slate-400">Sakit</td>
                        <td className="py-1 px-3 text-center border border-slate-400 font-mono font-bold">
                          {studentAtt.sakit} hari
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1 px-3 border border-slate-400">Izin</td>
                        <td className="py-1 px-3 text-center border border-slate-400 font-mono font-bold">
                          {studentAtt.izin} hari
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1 px-3 border border-slate-400">Tanpa Keterangan</td>
                        <td className="py-1 px-3 text-center border border-slate-400 font-mono font-bold">
                          {studentAtt.tanpaKeterangan} hari
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Catatan Wali Kelas */}
              <div className="mt-4 p-3 border border-slate-400 rounded text-xs space-y-1">
                <span className="font-bold text-slate-800 block">Catatan Wali Kelas:</span>
                <p className="text-slate-800 italic leading-relaxed text-[11px]">
                  "{studentNote?.catatan || 'Pertahankan semangat belajar dan budi pekerti yang terpuji. Teruslah berprestasi!'}"
                </p>
              </div>
            </div>

            {/* Official Signatures Section */}
            <div className="mt-8 pt-4 grid grid-cols-3 text-xs text-center text-slate-900 border-t border-slate-200">
              <div>
                <p>Mengetahui,</p>
                <p className="font-semibold">Orang Tua / Wali,</p>
                <div className="h-16"></div>
                <p className="font-bold underline">..........................................</p>
              </div>

              <div>
                <p>Mengetahui,</p>
                <p className="font-semibold">Kepala {school.namaSekolah}</p>
                <div className="h-16"></div>
                <p className="font-bold underline uppercase">{school.namaKepalaSekolah}</p>
                <p className="font-mono text-[10px] text-slate-600">NIP. {school.nipKepalaSekolah}</p>
              </div>

              <div>
                <p>{teacher.tempatTanggalRapor}</p>
                <p className="font-semibold">Guru Kelas {teacher.kelas},</p>
                <div className="h-16"></div>
                <p className="font-bold underline uppercase">{teacher.namaGuru}</p>
                <p className="font-mono text-[10px] text-slate-600">NIP. {teacher.nip}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Control Bar (Hidden when printing) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
            <Printer className="w-5 h-5 text-sky-600" />
            Cetak Rapor Kurikulum Merdeka (Standar BSKAP)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Format lembar resmi siap cetak ke format PDF atau printer kertas ukuran A4.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Mode Selector */}
          <div className="bg-slate-100 p-1 rounded-lg flex text-xs">
            <button
              onClick={() => setPrintMode('single')}
              className={`px-3 py-1 rounded-md font-semibold transition ${
                printMode === 'single' ? 'bg-white shadow text-sky-800' : 'text-slate-600'
              }`}
            >
              Per Siswa
            </button>
            <button
              onClick={() => setPrintMode('all')}
              className={`px-3 py-1 rounded-md font-semibold transition ${
                printMode === 'all' ? 'bg-white shadow text-sky-800' : 'text-slate-600'
              }`}
            >
              Semua Siswa (1 Kelas)
            </button>
          </div>

          {/* Sheet Selector */}
          {printMode === 'single' && (
            <div className="bg-slate-100 p-1 rounded-lg flex text-xs">
              <button
                onClick={() => setActiveSheet('all-sheets')}
                className={`px-2.5 py-1 rounded-md font-semibold ${
                  activeSheet === 'all-sheets' ? 'bg-white shadow text-slate-900' : 'text-slate-600'
                }`}
              >
                Semua Halaman
              </button>
              <button
                onClick={() => setActiveSheet('nilai')}
                className={`px-2.5 py-1 rounded-md font-semibold ${
                  activeSheet === 'nilai' ? 'bg-white shadow text-slate-900' : 'text-slate-600'
                }`}
              >
                Lembar Nilai
              </button>
              <button
                onClick={() => setActiveSheet('cover')}
                className={`px-2.5 py-1 rounded-md font-semibold ${
                  activeSheet === 'cover' ? 'bg-white shadow text-slate-900' : 'text-slate-600'
                }`}
              >
                Sampul
              </button>
              <button
                onClick={() => setActiveSheet('biodata')}
                className={`px-2.5 py-1 rounded-md font-semibold ${
                  activeSheet === 'biodata' ? 'bg-white shadow text-slate-900' : 'text-slate-600'
                }`}
              >
                Biodata
              </button>
            </div>
          )}

          {/* Print button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition"
          >
            <Printer className="w-4 h-4" />
            Cetak / Simpan PDF
          </button>
        </div>
      </div>

      {/* Student Navigation Bar (Only in Single Mode) */}
      {printMode === 'single' && (
        <div className="bg-slate-900 text-white rounded-xl p-3 px-4 shadow-sm flex items-center justify-between print:hidden">
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevStudent}
              disabled={selectedStudentIndex <= 0}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40"
              title="Siswa Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold">
              Siswa {selectedStudentIndex + 1} dari {students.length}
            </span>
            <button
              onClick={handleNextStudent}
              disabled={selectedStudentIndex >= students.length - 1}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40"
              title="Siswa Berikutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 hidden sm:inline">Pilih Cepat:</span>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 outline-none"
            >
              {students.map((s, idx) => (
                <option key={s.id} value={s.id}>
                  {idx + 1}. {s.nama}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Report Cards Preview Area */}
      <div className="space-y-8">
        {printMode === 'single' ? (
          renderStudentReport(selectedStudent)
        ) : (
          students.map((std) => renderStudentReport(std))
        )}
      </div>
    </div>
  );
};

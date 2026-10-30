import React, { useState } from 'react';
import { useRapor } from '../context/RaporContext';
import {
  Users,
  BookOpen,
  Medal,
  PenTool,
  HeartHandshake,
  Building,
  GraduationCap,
  Sparkles,
  Printer,
  FileSpreadsheet,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Edit3,
  Save,
  X
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    school,
    setSchool,
    teacher,
    setTeacher,
    students,
    subjects,
    extracurriculars,
    selectedFase,
    setActiveTab,
    addToast
  } = useRapor();

  // Edit Modals
  const [isEditingSchool, setIsEditingSchool] = useState(false);
  const [editSchoolData, setEditSchoolData] = useState(school);

  const [isEditingTeacher, setIsEditingTeacher] = useState(false);
  const [editTeacherData, setEditTeacherData] = useState(teacher);

  const handleSaveSchool = (e: React.FormEvent) => {
    e.preventDefault();
    setSchool(editSchoolData);
    setIsEditingSchool(false);
    addToast('Profil Sekolah berhasil diperbarui!', 'success');
  };

  const handleSaveTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    setTeacher(editTeacherData);
    setIsEditingTeacher(false);
    addToast('Profil Guru Kelas berhasil diperbarui!', 'success');
  };

  // Muatan Lokal subjects count
  const mulokCount = subjects.filter((s) => s.kategori === 'Muatan Lokal').length;

  return (
    <div className="space-y-6">
      {/* 5 Colorful Stat KPI Cards matching the user's attachment */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Card 1: Jumlah Siswa */}
        <div className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white rounded-xl shadow-md p-4 flex flex-col justify-between transition-transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-extrabold tracking-tight">{students.length}</span>
          </div>
          <div className="mt-3 pt-2 border-t border-white/20 flex items-center justify-between text-xs font-semibold">
            <span>Jumlah Siswa</span>
            <span className="text-[10px] bg-white/25 px-1.5 py-0.5 rounded">Aktif</span>
          </div>
        </div>

        {/* Card 2: Jumlah Mapel */}
        <div className="bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-xl shadow-md p-4 flex flex-col justify-between transition-transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-extrabold tracking-tight">{subjects.length}</span>
          </div>
          <div className="mt-3 pt-2 border-t border-white/20 flex items-center justify-between text-xs font-semibold">
            <span>Jumlah Mapel</span>
            <span className="text-[10px] bg-white/25 px-1.5 py-0.5 rounded">{selectedFase}</span>
          </div>
        </div>

        {/* Card 3: Jumlah Ekstra */}
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-xl shadow-md p-4 flex flex-col justify-between transition-transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Medal className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-extrabold tracking-tight">4</span>
          </div>
          <div className="mt-3 pt-2 border-t border-white/20 flex items-center justify-between text-xs font-semibold">
            <span>Jumlah Ekstra</span>
            <span className="text-[10px] bg-white/25 px-1.5 py-0.5 rounded">Terdaftar</span>
          </div>
        </div>

        {/* Card 4: Muatan Lokal */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-700 text-white rounded-xl shadow-md p-4 flex flex-col justify-between transition-transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <PenTool className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-extrabold tracking-tight">{mulokCount || 3}</span>
          </div>
          <div className="mt-3 pt-2 border-t border-white/20 flex items-center justify-between text-xs font-semibold">
            <span>Muatan Lokal</span>
            <span className="text-[10px] bg-white/25 px-1.5 py-0.5 rounded">Khas Sultra</span>
          </div>
        </div>

        {/* Card 5: Kokurikuler P5 */}
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-xl shadow-md p-4 flex flex-col justify-between transition-transform hover:-translate-y-0.5 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <HeartHandshake className="w-6 h-6 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-right">Aku Cinta Indonesia</span>
          </div>
          <div className="mt-3 pt-2 border-t border-white/20 flex items-center justify-between text-xs font-semibold">
            <span>Kokurikuler P5</span>
            <span className="text-[10px] bg-white/25 px-1.5 py-0.5 rounded">Fase C</span>
          </div>
        </div>
      </div>

      {/* Main Info Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Profil Sekolah & Illustration Banner (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Profil Sekolah Box */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-800 font-bold text-sm">
                <Building className="w-4 h-4 text-sky-600" />
                <span>Profil Sekolah</span>
              </div>
              <button
                onClick={() => {
                  setEditSchoolData(school);
                  setIsEditingSchool(true);
                }}
                className="text-xs text-sky-700 hover:text-sky-900 font-medium flex items-center gap-1 hover:underline"
              >
                <Edit3 className="w-3.5 h-3.5" /> Ubah Data
              </button>
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              {/* School Details */}
              <div className="md:col-span-7 space-y-2 text-xs">
                <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Nama Sekolah</span>
                  <span className="col-span-2 text-slate-900 font-bold">: {school.namaSekolah}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">NPSN</span>
                  <span className="col-span-2 text-slate-800 font-mono">: {school.npsn}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Alamat</span>
                  <span className="col-span-2 text-slate-800">: {school.alamatSekolah}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Kode Pos</span>
                  <span className="col-span-2 text-slate-800 font-mono">: {school.kodePos}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Desa / Kelurahan</span>
                  <span className="col-span-2 text-slate-800">: {school.desaKelurahan}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Kecamatan</span>
                  <span className="col-span-2 text-slate-800">: {school.kecamatan}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Kabupaten / Kota</span>
                  <span className="col-span-2 text-slate-800">: {school.kabupatenKota}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Provinsi</span>
                  <span className="col-span-2 text-slate-800">: {school.provinsi}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Kepala Sekolah</span>
                  <span className="col-span-2 text-slate-900 font-semibold">: {school.namaKepalaSekolah}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 py-1">
                  <span className="text-slate-500 font-medium">NIP Kepala</span>
                  <span className="col-span-2 text-slate-700 font-mono">: {school.nipKepalaSekolah}</span>
                </div>
              </div>

              {/* School Photo / Patriotic Badge matching screenshot */}
              <div className="md:col-span-5 flex flex-col items-center justify-center p-3 bg-gradient-to-b from-sky-50 to-amber-50 rounded-xl border border-sky-100">
                <div className="relative w-full h-44 rounded-lg overflow-hidden shadow-sm border border-slate-200 group">
                  <img
                    src="/assets/aistudio/tommy_7b58de9e.png"
                    alt="SDN 4 Palangga Selatan Kurikulum Merdeka"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback if image fails
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-white text-[11px] font-bold tracking-wide">
                      Menuju Generasi Cerdas Berkarakter
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-around w-full text-[11px] font-bold text-sky-900">
                  <div className="flex items-center gap-1">
                    <span className="text-emerald-600 font-extrabold">#</span>
                    <span>PENDIDIKAN BERMUTU</span>
                  </div>
                  <div className="text-amber-700">SEKOLAH RAMAH ANAK</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="bg-gradient-to-r from-slate-900 to-sky-950 text-white rounded-xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-amber-300">Pusat Aksi Cepat Guru</h3>
              <p className="text-xs text-slate-300">Akses langsung modul penilaian dan pencetakan tanpa berbelit</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab('input-nilai')}
                className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition shadow"
              >
                <PenTool className="w-3.5 h-3.5" />
                Input Nilai
              </button>
              <button
                onClick={() => setActiveTab('deskripsi-ai')}
                className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition shadow"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                AI Deskripsi
              </button>
              <button
                onClick={() => setActiveTab('cetak-rapor')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition shadow"
              >
                <Printer className="w-3.5 h-3.5" />
                Cetak Rapor
              </button>
              <button
                onClick={() => setActiveTab('leger')}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition border border-slate-700"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                Buku Leger
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Profil Guru & Info Aplikasi (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Profil Guru Box */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-800 font-bold text-sm">
                <GraduationCap className="w-4 h-4 text-amber-600" />
                <span>Profil Guru Kelas</span>
              </div>
              <button
                onClick={() => {
                  setEditTeacherData(teacher);
                  setIsEditingTeacher(true);
                }}
                className="text-xs text-sky-700 hover:text-sky-900 font-medium flex items-center gap-1 hover:underline"
              >
                <Edit3 className="w-3.5 h-3.5" /> Ubah
              </button>
            </div>

            <div className="p-5 space-y-2 text-xs">
              <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Nama Guru Kelas</span>
                <span className="col-span-2 text-slate-900 font-bold">: {teacher.namaGuru}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">NIP / NIPPPK</span>
                <span className="col-span-2 text-slate-800 font-mono">: {teacher.nip}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Kelas / Rombel</span>
                <span className="col-span-2 text-slate-800 font-semibold">: Kelas {teacher.kelas}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Fase Kurikulum</span>
                <span className="col-span-2 text-sky-800 font-semibold">: {selectedFase}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Tahun Pelajaran</span>
                <span className="col-span-2 text-slate-800">: {teacher.tahunPelajaran}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Semester</span>
                <span className="col-span-2 text-slate-800">: {teacher.semester}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Tempat/Tgl Rapor</span>
                <span className="col-span-2 text-slate-800">: {teacher.tempatTanggalRapor}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 py-1">
                <span className="text-slate-500 font-medium">Jumlah Peserta Didik</span>
                <span className="col-span-2 text-emerald-700 font-bold">: {students.length} Siswa Terdaftar</span>
              </div>
            </div>
          </div>

          {/* Informasi Sistem & Enkripsi */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
              <span className="text-slate-800 font-bold text-sm">Informasi Aplikasi & Standar</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Terkoneksi
              </span>
            </div>

            <div className="p-5 space-y-2.5 text-xs text-slate-600">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span>Versi Aplikasi</span>
                <span className="font-semibold text-slate-900">v. 2025.2 (Kurikulum Merdeka BSKAP)</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span>Keamanan Data</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Terenkripsi Lokal & Daring
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span>Mesin AI Deskripsi</span>
                <span className="text-violet-700 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-violet-600" /> Gemini 3.8 Flash Aktif
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span>Format Standar Rapor</span>
                <span className="font-semibold text-slate-900">Permendikbudristek No. 21 Th 2022</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span>Status Penyimpanan</span>
                <span className="text-sky-700 font-medium">Sinkronisasi Otomatis Real-Time</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Edit Profil Sekolah */}
      {isEditingSchool && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Building className="w-4 h-4 text-sky-400" />
                Ubah Profil Sekolah
              </h3>
              <button
                onClick={() => setIsEditingSchool(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSchool} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Sekolah</label>
                <input
                  type="text"
                  value={editSchoolData.namaSekolah}
                  onChange={(e) => setEditSchoolData({ ...editSchoolData, namaSekolah: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">NPSN</label>
                  <input
                    type="text"
                    value={editSchoolData.npsn}
                    onChange={(e) => setEditSchoolData({ ...editSchoolData, npsn: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kode Pos</label>
                  <input
                    type="text"
                    value={editSchoolData.kodePos}
                    onChange={(e) => setEditSchoolData({ ...editSchoolData, kodePos: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Alamat Sekolah</label>
                <input
                  type="text"
                  value={editSchoolData.alamatSekolah}
                  onChange={(e) => setEditSchoolData({ ...editSchoolData, alamatSekolah: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kecamatan</label>
                  <input
                    type="text"
                    value={editSchoolData.kecamatan}
                    onChange={(e) => setEditSchoolData({ ...editSchoolData, kecamatan: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kabupaten / Kota</label>
                  <input
                    type="text"
                    value={editSchoolData.kabupatenKota}
                    onChange={(e) => setEditSchoolData({ ...editSchoolData, kabupatenKota: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Kepala Sekolah</label>
                  <input
                    type="text"
                    value={editSchoolData.namaKepalaSekolah}
                    onChange={(e) => setEditSchoolData({ ...editSchoolData, namaKepalaSekolah: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">NIP Kepala Sekolah</label>
                  <input
                    type="text"
                    value={editSchoolData.nipKepalaSekolah}
                    onChange={(e) => setEditSchoolData({ ...editSchoolData, nipKepalaSekolah: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditingSchool(false)}
                  className="px-4 py-2 border rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-lg flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" /> Simpan Profil
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Profil Guru */}
      {isEditingTeacher && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-amber-400" />
                Ubah Profil Guru Kelas
              </h3>
              <button
                onClick={() => setIsEditingTeacher(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTeacher} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap Guru (dengan Gelar)</label>
                <input
                  type="text"
                  value={editTeacherData.namaGuru}
                  onChange={(e) => setEditTeacherData({ ...editTeacherData, namaGuru: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">NIP / NIPPPK</label>
                <input
                  type="text"
                  value={editTeacherData.nip}
                  onChange={(e) => setEditTeacherData({ ...editTeacherData, nip: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kelas</label>
                  <input
                    type="text"
                    value={editTeacherData.kelas}
                    onChange={(e) => setEditTeacherData({ ...editTeacherData, kelas: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Semester</label>
                  <select
                    value={editTeacherData.semester}
                    onChange={(e) => setEditTeacherData({ ...editTeacherData, semester: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                  >
                    <option value="I (Ganjil)">I (Ganjil)</option>
                    <option value="II (Genap)">II (Genap)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tempat & Tanggal Titimangsa Rapor</label>
                <input
                  type="text"
                  value={editTeacherData.tempatTanggalRapor}
                  onChange={(e) => setEditTeacherData({ ...editTeacherData, tempatTanggalRapor: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditingTeacher(false)}
                  className="px-4 py-2 border rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" /> Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

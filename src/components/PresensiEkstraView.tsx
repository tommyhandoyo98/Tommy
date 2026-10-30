import React, { useState } from 'react';
import { useRapor } from '../context/RaporContext';
import {
  CalendarCheck,
  Medal,
  FileText,
  Save,
  Plus,
  Trash2,
  Sparkles,
  Heart
} from 'lucide-react';

export const PresensiEkstraView: React.FC = () => {
  const {
    students,
    attendances,
    updateAttendance,
    extracurriculars,
    setExtracurriculars,
    homeroomNotes,
    updateHomeroomNote,
    addToast
  } = useRapor();

  const [activeTab, setActiveTab] = useState<'presensi' | 'ekstra' | 'catatan'>('presensi');
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || 'std-1');

  // Ekstra Modal / Form
  const [newEkstraName, setNewEkstraName] = useState('Pramuka (Wajib)');
  const [newEkstraPredikat, setNewEkstraPredikat] = useState<'Sangat Baik' | 'Baik' | 'Cukup' | 'Kurang'>('Baik');
  const [newEkstraKet, setNewEkstraKet] = useState('Aktif dan bersemangat dalam setiap kegiatan.');

  const handleAddEkstra = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord = {
      id: `ek-${Date.now()}`,
      studentId: selectedStudentId,
      namaKegiatan: newEkstraName,
      predikat: newEkstraPredikat,
      keterangan: newEkstraKet,
    };
    setExtracurriculars((prev) => [...prev, newRecord]);
    addToast('Kegiatan ekstrakurikuler berhasil ditambahkan.', 'success');
  };

  const handleDeleteEkstra = (id: string) => {
    setExtracurriculars((prev) => prev.filter((e) => e.id !== id));
    addToast('Ekstrakurikuler berhasil dihapus.', 'info');
  };

  const handleHomeroomNotePreset = (note: string) => {
    updateHomeroomNote(selectedStudentId, note);
    addToast('Catatan wali kelas terisi.', 'success');
  };

  const studentEkstra = extracurriculars.filter((e) => e.studentId === selectedStudentId);
  const currentNote = homeroomNotes.find((n) => n.studentId === selectedStudentId);
  const selectedStudent = students.find((s) => s.id === selectedStudentId);

  return (
    <div className="space-y-5">
      {/* Header and Sub-navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-sky-600" />
            Presensi, Ekstrakurikuler & Catatan Wali Kelas
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Komponen pelengkap resmi halaman akhir Rapor Kurikulum Merdeka.
          </p>
        </div>

        <div className="bg-slate-100 p-1 rounded-xl flex text-xs">
          <button
            onClick={() => setActiveTab('presensi')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'presensi' ? 'bg-white shadow text-sky-700' : 'text-slate-600'
            }`}
          >
            Presensi / Kehadiran
          </button>
          <button
            onClick={() => setActiveTab('ekstra')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'ekstra' ? 'bg-white shadow text-sky-700' : 'text-slate-600'
            }`}
          >
            Ekstrakurikuler
          </button>
          <button
            onClick={() => setActiveTab('catatan')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'catatan' ? 'bg-white shadow text-sky-700' : 'text-slate-600'
            }`}
          >
            Catatan Wali Kelas
          </button>
        </div>
      </div>

      {/* Tab: Presensi (Table of all students) */}
      {activeTab === 'presensi' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800">
              Rekapitulasi Ketidakhadiran Semester (Hari)
            </span>
            <span className="text-slate-500">
              Input jumlah hari Sakit (S), Izin (I), dan Tanpa Keterangan (A)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200 uppercase">
                <tr>
                  <th className="py-3 px-3 text-center w-12">No</th>
                  <th className="py-3 px-3">Nama Peserta Didik</th>
                  <th className="py-3 px-3 text-center w-28 bg-blue-50/80 text-blue-900">
                    Sakit (S)
                  </th>
                  <th className="py-3 px-3 text-center w-28 bg-amber-50/80 text-amber-900">
                    Izin (I)
                  </th>
                  <th className="py-3 px-3 text-center w-28 bg-rose-50/80 text-rose-900">
                    Tanpa Keterangan (A)
                  </th>
                  <th className="py-3 px-3 text-center w-28">Total Tidak Hadir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((std, idx) => {
                  const att = attendances.find((a) => a.studentId === std.id) || {
                    sakit: 0,
                    izin: 0,
                    tanpaKeterangan: 0,
                  };
                  const total = att.sakit + att.izin + att.tanpaKeterangan;

                  return (
                    <tr key={std.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 text-center font-mono text-slate-500">{idx + 1}</td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">{std.nama}</td>
                      <td className="py-1.5 px-3 text-center bg-blue-50/30">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={att.sakit}
                          onChange={(e) => updateAttendance(std.id, 'sakit', Number(e.target.value))}
                          className="w-16 px-2 py-1 text-center font-bold font-mono border rounded-lg bg-white"
                        />
                      </td>
                      <td className="py-1.5 px-3 text-center bg-amber-50/30">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={att.izin}
                          onChange={(e) => updateAttendance(std.id, 'izin', Number(e.target.value))}
                          className="w-16 px-2 py-1 text-center font-bold font-mono border rounded-lg bg-white"
                        />
                      </td>
                      <td className="py-1.5 px-3 text-center bg-rose-50/30">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={att.tanpaKeterangan}
                          onChange={(e) => updateAttendance(std.id, 'tanpaKeterangan', Number(e.target.value))}
                          className="w-16 px-2 py-1 text-center font-bold font-mono border rounded-lg bg-white"
                        />
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold font-mono text-slate-700">
                        {total} hari
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Ekstrakurikuler */}
      {activeTab === 'ekstra' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Student picker */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3">
            <h3 className="font-bold text-xs text-slate-800">Pilih Siswa</h3>
            <div className="max-h-[500px] overflow-y-auto space-y-1">
              {students.map((std, i) => (
                <button
                  key={std.id}
                  onClick={() => setSelectedStudentId(std.id)}
                  className={`w-full p-2.5 rounded-lg text-left text-xs font-semibold transition flex items-center justify-between ${
                    selectedStudentId === std.id
                      ? 'bg-sky-600 text-white shadow'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="truncate">{std.nama}</span>
                  <span className="text-[10px] opacity-75">{i + 1}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Ekstra editor */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-sm text-slate-900">
                  Ekstrakurikuler: {selectedStudent?.nama}
                </h3>
              </div>

              {/* Add form */}
              <form onSubmit={handleAddEkstra} className="p-4 bg-slate-50 rounded-xl space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Nama Kegiatan</label>
                    <select
                      value={newEkstraName}
                      onChange={(e) => setNewEkstraName(e.target.value)}
                      className="w-full px-3 py-1.5 border rounded-lg bg-white"
                    >
                      <option value="Pramuka (Wajib)">Pramuka (Wajib)</option>
                      <option value="Dokter Kecil / UKS">Dokter Kecil / UKS</option>
                      <option value="Seni Tari Tradisional">Seni Tari Tradisional</option>
                      <option value="Futsal / Olahraga">Futsal / Olahraga</option>
                      <option value="Karate / Pencak Silat">Karate / Pencak Silat</option>
                      <option value="PMR / Kesenian">PMR / Kesenian</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Predikat</label>
                    <select
                      value={newEkstraPredikat}
                      onChange={(e) => setNewEkstraPredikat(e.target.value as any)}
                      className="w-full px-3 py-1.5 border rounded-lg bg-white"
                    >
                      <option value="Sangat Baik">Sangat Baik</option>
                      <option value="Baik">Baik</option>
                      <option value="Cukup">Cukup</option>
                      <option value="Kurang">Kurang</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Keterangan / Catatan Prestasi Kegiatan
                  </label>
                  <input
                    type="text"
                    value={newEkstraKet}
                    onChange={(e) => setNewEkstraKet(e.target.value)}
                    placeholder="Contoh: Sangat aktif dalam kegiatan tali-temali dan baris-berbaris."
                    className="w-full px-3 py-1.5 border rounded-lg bg-white"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-lg flex items-center gap-1 shadow"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tambah Kegiatan
                  </button>
                </div>
              </form>

              {/* Ekstra list */}
              <div className="space-y-2 pt-2 text-xs">
                {studentEkstra.map((ek) => (
                  <div
                    key={ek.id}
                    className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{ek.namaKegiatan}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {ek.predikat}
                        </span>
                      </div>
                      <p className="text-slate-600 text-[11px] mt-1">{ek.keterangan}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteEkstra(ek.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Catatan Wali Kelas */}
      {activeTab === 'catatan' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3">
            <h3 className="font-bold text-xs text-slate-800">Pilih Siswa</h3>
            <div className="max-h-[500px] overflow-y-auto space-y-1">
              {students.map((std, i) => (
                <button
                  key={std.id}
                  onClick={() => setSelectedStudentId(std.id)}
                  className={`w-full p-2.5 rounded-lg text-left text-xs font-semibold transition flex items-center justify-between ${
                    selectedStudentId === std.id
                      ? 'bg-sky-600 text-white shadow'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="truncate">{std.nama}</span>
                  <span className="text-[10px] opacity-75">{i + 1}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-bold text-sm text-slate-900">
                  Catatan Wali Kelas untuk Ananda {selectedStudent?.nama}
                </h3>
                <p className="text-xs text-slate-500">
                  Catatan personal dan motivasi yang akan dicetak pada lembar rapor resmi.
                </p>
              </div>

              <textarea
                rows={4}
                value={currentNote?.catatan || ''}
                onChange={(e) => updateHomeroomNote(selectedStudentId, e.target.value)}
                placeholder="Tuliskan catatan kemajuan belajar, etika, dan dorongan semangat bagi siswa..."
                className="w-full p-3 border rounded-xl text-xs leading-relaxed focus:ring-2 focus:ring-sky-500 outline-none"
              />

              {/* Quick Inspiration Templates */}
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Pilihan Inspirasi Catatan Motivatif:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  {[
                    'Ananda memiliki semangat belajar dan budi pekerti yang sangat terpuji. Pertahankan prestasimu dan teruslah menjadi teladan!',
                    'Prestasi ananda sangat membanggakan di semester ini. Tingkatkan terus literasi membaca dan kemampuan berhitung.',
                    'Menunjukkan kemandirian belajar yang luar biasa. Tingkatkan keaktifan bertanya saat diskusi pembelajaran di kelas.',
                    'Ananda sangat santun, ramah, dan disukai teman-temannya. Tetap fokus dan tekun saat menyelesaikan tugas mandiri.',
                  ].map((temp, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleHomeroomNotePreset(temp)}
                      className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 text-left hover:bg-sky-50 hover:border-sky-300 transition"
                    >
                      "{temp}"
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

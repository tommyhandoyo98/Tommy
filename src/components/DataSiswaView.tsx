import React, { useState } from 'react';
import { useRapor } from '../context/RaporContext';
import { Student } from '../types';
import {
  Users,
  UserPlus,
  Search,
  Edit2,
  Trash2,
  Download,
  X,
  Save,
  CheckCircle2
} from 'lucide-react';

export const DataSiswaView: React.FC = () => {
  const { students, setStudents, addToast } = useRapor();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const initialFormState: Student = {
    id: '',
    nis: '',
    nisn: '',
    nama: '',
    jenisKelamin: 'L',
    tempatLahir: '',
    tanggalLahir: '',
    agama: 'Islam',
    alamat: '',
    namaAyah: '',
    pekerjaanAyah: '',
    namaIbu: '',
    pekerjaanIbu: '',
    teleponOrtu: '',
  };

  const [formData, setFormData] = useState<Student>(initialFormState);

  const filteredStudents = students.filter(
    (s) =>
      s.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nis.includes(searchQuery) ||
      s.nisn.includes(searchQuery)
  );

  const handleOpenAdd = () => {
    setEditingStudent(null);
    setFormData({
      ...initialFormState,
      id: `std-${Date.now()}`,
      nis: `${2100 + students.length + 1}`,
      nisn: `014${Math.floor(1000000 + Math.random() * 9000000)}`,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData(student);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, nama: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus siswa "${nama}"?`)) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
      addToast(`Siswa ${nama} berhasil dihapus.`, 'info');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama.trim()) {
      addToast('Nama siswa tidak boleh kosong.', 'warning');
      return;
    }

    if (editingStudent) {
      setStudents((prev) => prev.map((s) => (s.id === formData.id ? formData : s)));
      addToast(`Data siswa ${formData.nama} berhasil diperbarui.`, 'success');
    } else {
      setStudents((prev) => [...prev, formData]);
      addToast(`Siswa baru ${formData.nama} berhasil ditambahkan!`, 'success');
    }

    setIsModalOpen(false);
  };

  const exportCSV = () => {
    const headers = ['No', 'NIS', 'NISN', 'Nama Lengkap', 'L/P', 'Tempat Lahir', 'Tanggal Lahir', 'Agama', 'Alamat', 'Nama Ayah', 'Nama Ibu'];
    const rows = students.map((s, idx) => [
      idx + 1,
      s.nis,
      s.nisn,
      `"${s.nama}"`,
      s.jenisKelamin,
      s.tempatLahir,
      s.tanggalLahir,
      s.agama,
      `"${s.alamat}"`,
      `"${s.namaAyah}"`,
      `"${s.namaIbu}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DATA_SISWA_SDN_4_PALANGGA_SELATAN.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('File CSV Data Siswa berhasil diunduh.', 'success');
  };

  return (
    <div className="space-y-5">
      {/* Top Banner and Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
            <Users className="w-5 h-5 text-sky-600" />
            Data Siswa / Buku Induk Rombel
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Total {students.length} peserta didik terdaftar pada kelas ini. Terhubung otomatis dengan nilai & rapor.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Cari nama, NIS, NISN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none w-48 sm:w-60"
            />
          </div>

          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition"
          >
            <Download className="w-3.5 h-3.5" />
            Ekspor CSV
          </button>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white rounded-lg transition shadow"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Tambah Siswa
          </button>
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-50 text-slate-700 font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-3 text-center w-12">No</th>
                <th className="py-3 px-3 w-24">NIS / NISN</th>
                <th className="py-3 px-3">Nama Lengkap</th>
                <th className="py-3 px-3 text-center w-12">L/P</th>
                <th className="py-3 px-3 hidden md:table-cell">Tempat, Tgl Lahir</th>
                <th className="py-3 px-3 hidden sm:table-cell">Agama</th>
                <th className="py-3 px-3 hidden lg:table-cell">Nama Orang Tua</th>
                <th className="py-3 px-3 hidden xl:table-cell">Alamat</th>
                <th className="py-3 px-3 text-center w-20">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((s, idx) => (
                  <tr key={s.id} className="hover:bg-sky-50/50 transition">
                    <td className="py-3 px-3 text-center font-medium text-slate-500">{idx + 1}</td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-600">
                      <div>{s.nis}</div>
                      <div className="text-slate-400">{s.nisn}</div>
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900">{s.nama}</td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          s.jenisKelamin === 'L'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-pink-100 text-pink-700'
                        }`}
                      >
                        {s.jenisKelamin}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600 hidden md:table-cell">
                      {s.tempatLahir}, {s.tanggalLahir}
                    </td>
                    <td className="py-3 px-3 text-slate-600 hidden sm:table-cell">{s.agama}</td>
                    <td className="py-3 px-3 text-slate-600 hidden lg:table-cell">
                      <div>Ayah: {s.namaAyah}</div>
                      <div className="text-slate-400 text-[11px]">Ibu: {s.namaIbu}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-500 truncate max-w-xs hidden xl:table-cell">
                      {s.alamat}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <button
                          onClick={() => handleOpenEdit(s)}
                          className="p-1 text-sky-600 hover:text-sky-800 hover:bg-sky-50 rounded"
                          title="Ubah Siswa"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(s.id, s.nama)}
                          className="p-1 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded"
                          title="Hapus Siswa"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400">
                    Tidak ditemukan data siswa yang cocok dengan pencarian "{searchQuery}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit Student */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-sky-400" />
                {editingStudent ? 'Ubah Data Siswa' : 'Tambah Siswa Baru'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap Siswa</label>
                  <input
                    type="text"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value.toUpperCase() })}
                    placeholder="Contoh: ACHMAD FAIZ AL-FARABI"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none uppercase font-semibold"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Jenis Kelamin</label>
                  <select
                    value={formData.jenisKelamin}
                    onChange={(e) => setFormData({ ...formData, jenisKelamin: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                  >
                    <option value="L">Laki-Laki (L)</option>
                    <option value="P">Perempuan (P)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">NIS</label>
                  <input
                    type="text"
                    value={formData.nis}
                    onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">NISN</label>
                  <input
                    type="text"
                    value={formData.nisn}
                    onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tempat Lahir</label>
                  <input
                    type="text"
                    value={formData.tempatLahir}
                    onChange={(e) => setFormData({ ...formData, tempatLahir: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tanggal Lahir</label>
                  <input
                    type="date"
                    value={formData.tanggalLahir}
                    onChange={(e) => setFormData({ ...formData, tanggalLahir: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Agama</label>
                  <select
                    value={formData.agama}
                    onChange={(e) => setFormData({ ...formData, agama: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                  >
                    <option value="Islam">Islam</option>
                    <option value="Kristen">Kristen</option>
                    <option value="Katolik">Katolik</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Buddha">Buddha</option>
                    <option value="Khonghucu">Khonghucu</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Telepon / WhatsApp Ortu</label>
                  <input
                    type="text"
                    value={formData.teleponOrtu || ''}
                    onChange={(e) => setFormData({ ...formData, teleponOrtu: e.target.value })}
                    placeholder="0812xxxxxxxx"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Alamat Domisili Siswa</label>
                <input
                  type="text"
                  value={formData.alamat}
                  onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                  placeholder="Nama jalan, RT/RW, Dusun, Desa"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Ayah</label>
                  <input
                    type="text"
                    value={formData.namaAyah}
                    onChange={(e) => setFormData({ ...formData, namaAyah: e.target.value })}
                    className="w-full px-3 py-1.5 border rounded-lg bg-white"
                  />
                  <label className="block font-semibold text-slate-700 mt-2 mb-1">Pekerjaan Ayah</label>
                  <input
                    type="text"
                    value={formData.pekerjaanAyah}
                    onChange={(e) => setFormData({ ...formData, pekerjaanAyah: e.target.value })}
                    className="w-full px-3 py-1.5 border rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Ibu</label>
                  <input
                    type="text"
                    value={formData.namaIbu}
                    onChange={(e) => setFormData({ ...formData, namaIbu: e.target.value })}
                    className="w-full px-3 py-1.5 border rounded-lg bg-white"
                  />
                  <label className="block font-semibold text-slate-700 mt-2 mb-1">Pekerjaan Ibu</label>
                  <input
                    type="text"
                    value={formData.pekerjaanIbu}
                    onChange={(e) => setFormData({ ...formData, pekerjaanIbu: e.target.value })}
                    className="w-full px-3 py-1.5 border rounded-lg bg-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-lg flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  {editingStudent ? 'Simpan Perubahan' : 'Tambahkan Siswa'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useRapor } from '../context/RaporContext';
import { Subject, FaseType } from '../types';
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  CheckCircle,
  GraduationCap
} from 'lucide-react';

export const MataPelajaranView: React.FC = () => {
  const { subjects, setSubjects, selectedFase, learningObjectives, addToast } = useRapor();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubj, setEditingSubj] = useState<Subject | null>(null);

  const initialForm: Subject = {
    id: '',
    kode: '',
    nama: '',
    kategori: 'Wajib',
    fase: ['Fase A', 'Fase B', 'Fase C'],
    kktp: 75,
    guruPengampu: '',
  };

  const [formData, setFormData] = useState<Subject>(initialForm);

  const handleOpenAdd = () => {
    setEditingSubj(null);
    setFormData({
      ...initialForm,
      id: `mapel-${Date.now()}`,
      kode: `MAPEL${subjects.length + 1}`,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (subj: Subject) => {
    setEditingSubj(subj);
    setFormData(subj);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, nama: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus mata pelajaran "${nama}"?`)) {
      setSubjects((prev) => prev.filter((s) => s.id !== id));
      addToast(`Mata pelajaran ${nama} berhasil dihapus.`, 'info');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama.trim() || !formData.kode.trim()) {
      addToast('Kode dan Nama Mata Pelajaran harus diisi.', 'warning');
      return;
    }

    if (editingSubj) {
      setSubjects((prev) => prev.map((s) => (s.id === formData.id ? formData : s)));
      addToast(`Mata pelajaran ${formData.nama} berhasil diperbarui.`, 'success');
    } else {
      setSubjects((prev) => [...prev, formData]);
      addToast(`Mata pelajaran ${formData.nama} berhasil ditambahkan!`, 'success');
    }

    setIsModalOpen(false);
  };

  const toggleFaseInForm = (fase: FaseType) => {
    const current = formData.fase;
    if (current.includes(fase)) {
      if (current.length === 1) {
        addToast('Mata pelajaran harus aktif minimal pada 1 fase.', 'warning');
        return;
      }
      setFormData({ ...formData, fase: current.filter((f) => f !== fase) });
    } else {
      setFormData({ ...formData, fase: [...current, fase] });
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-600" />
            Mata Pelajaran Kurikulum Merdeka ({selectedFase})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Daftar muatan kurikulum, Kriteria Ketercapaian (KKTP), dan guru pengampu.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white rounded-lg transition shadow"
        >
          <Plus className="w-3.5 h-3.5" />
          Tambah Mapel
        </button>
      </div>

      {/* Grid of subjects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subj, index) => {
          const tpCount = learningObjectives.filter(
            (tp) => tp.subjectId === subj.id && tp.fase === selectedFase && tp.aktif
          ).length;

          return (
            <div
              key={subj.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
                    {subj.kode}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      subj.kategori === 'Wajib'
                        ? 'bg-emerald-100 text-emerald-800'
                        : subj.kategori === 'Muatan Lokal'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {subj.kategori}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm mt-2 line-clamp-2">
                  {subj.nama}
                </h3>

                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{subj.guruPengampu || 'Tommy Handoyo, S.Pd'}</span>
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block">KKTP</span>
                    <span className="font-bold text-sky-700">{subj.kktp}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Tujuan Pembelajaran</span>
                    <span className="font-bold text-slate-700">{tpCount} TP Aktif</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleOpenEdit(subj)}
                    className="p-1 text-sky-600 hover:text-sky-800 hover:bg-sky-50 rounded"
                    title="Ubah Mapel"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(subj.id, subj.nama)}
                    className="p-1 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded"
                    title="Hapus Mapel"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Add / Edit Subject */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-400" />
                {editingSubj ? 'Ubah Mata Pelajaran' : 'Tambah Mata Pelajaran Baru'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kode Mapel</label>
                  <input
                    type="text"
                    value={formData.kode}
                    onChange={(e) => setFormData({ ...formData, kode: e.target.value.toUpperCase() })}
                    placeholder="Contoh: MTK"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none uppercase font-mono font-bold"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={formData.kategori}
                    onChange={(e) => setFormData({ ...formData, kategori: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                  >
                    <option value="Wajib">Mata Pelajaran Wajib</option>
                    <option value="Muatan Lokal">Muatan Lokal</option>
                    <option value="Pilihan">Mata Pelajaran Pilihan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Mata Pelajaran</label>
                <input
                  type="text"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  placeholder="Contoh: Matematika"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Standar KKTP Minimal</label>
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={formData.kktp}
                    onChange={(e) => setFormData({ ...formData, kktp: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Guru Pengampu</label>
                  <input
                    type="text"
                    value={formData.guruPengampu || ''}
                    onChange={(e) => setFormData({ ...formData, guruPengampu: e.target.value })}
                    placeholder="Nama & gelar guru"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Berlaku untuk Fase</label>
                <div className="flex gap-2">
                  {(['Fase A', 'Fase B', 'Fase C'] as FaseType[]).map((f) => {
                    const isChecked = formData.fase.includes(f);
                    return (
                      <button
                        type="button"
                        key={f}
                        onClick={() => toggleFaseInForm(f)}
                        className={`flex-1 py-1.5 px-2 rounded-lg font-semibold border text-center transition ${
                          isChecked
                            ? 'bg-sky-600 text-white border-sky-600'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {f}
                      </button>
                    );
                  })}
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
                  {editingSubj ? 'Simpan Perubahan' : 'Tambahkan Mapel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

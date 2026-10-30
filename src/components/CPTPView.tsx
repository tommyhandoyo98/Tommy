import React, { useState } from 'react';
import { useRapor } from '../context/RaporContext';
import { LearningObjective, LearningOutcomeCP } from '../types';
import {
  Target,
  BookOpen,
  Plus,
  ShieldCheck,
  Lock,
  Edit3,
  Trash2,
  CheckCircle2,
  X,
  Save,
  Globe,
  Sparkles
} from 'lucide-react';

export const CPTPView: React.FC = () => {
  const {
    subjects,
    selectedFase,
    learningObjectives,
    setLearningObjectives,
    learningOutcomes,
    setLearningOutcomes,
    addToast
  } = useRapor();

  const [activeSubjectId, setActiveSubjectId] = useState<string>(subjects[0]?.id || 'mapel-1');
  const [activeView, setActiveView] = useState<'TP' | 'CP'>('TP');

  // Modal Add / Edit TP
  const [isTPModalOpen, setIsTPModalOpen] = useState(false);
  const [editingTP, setEditingTP] = useState<LearningObjective | null>(null);
  const [tpForm, setTpForm] = useState<LearningObjective>({
    id: '',
    subjectId: activeSubjectId,
    fase: selectedFase,
    semester: 'I (Ganjil)',
    kodeTP: '',
    deskripsi: '',
    ringkasan: '',
    aktif: true,
  });

  const selectedSubject = subjects.find((s) => s.id === activeSubjectId) || subjects[0];

  const currentTPs = learningObjectives.filter(
    (tp) => tp.subjectId === activeSubjectId && tp.fase === selectedFase
  );

  const currentCP = learningOutcomes.find(
    (cp) => cp.subjectId === activeSubjectId && cp.fase === selectedFase
  );

  const handleOpenAddTP = () => {
    setEditingTP(null);
    const count = currentTPs.length + 1;
    setTpForm({
      id: `tp-${activeSubjectId}-${Date.now()}`,
      subjectId: activeSubjectId,
      fase: selectedFase,
      semester: 'I (Ganjil)',
      kodeTP: `TP ${count}`,
      deskripsi: '',
      ringkasan: '',
      aktif: true,
    });
    setIsTPModalOpen(true);
  };

  const handleOpenEditTP = (tp: LearningObjective) => {
    setEditingTP(tp);
    setTpForm(tp);
    setIsTPModalOpen(true);
  };

  const handleDeleteTP = (id: string) => {
    if (confirm('Hapus Tujuan Pembelajaran ini?')) {
      setLearningObjectives((prev) => prev.filter((t) => t.id !== id));
      addToast('Tujuan Pembelajaran berhasil dihapus.', 'info');
    }
  };

  const handleSaveTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tpForm.deskripsi.trim() || !tpForm.ringkasan.trim()) {
      addToast('Deskripsi dan frasa ringkasan harus diisi.', 'warning');
      return;
    }

    if (editingTP) {
      setLearningObjectives((prev) => prev.map((t) => (t.id === tpForm.id ? tpForm : t)));
      addToast('Tujuan Pembelajaran berhasil diperbarui.', 'success');
    } else {
      setLearningObjectives((prev) => [...prev, tpForm]);
      addToast('Tujuan Pembelajaran baru berhasil ditambahkan.', 'success');
    }
    setIsTPModalOpen(false);
  };

  const toggleTPActive = (id: string) => {
    setLearningObjectives((prev) =>
      prev.map((t) => (t.id === id ? { ...t, aktif: !t.aktif } : t))
    );
  };

  return (
    <div className="space-y-5">
      {/* Top Banner with Encryption Status */}
      <div className="bg-gradient-to-r from-sky-900 via-indigo-900 to-slate-900 text-white rounded-xl shadow-md p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 border border-sky-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
              <Target className="w-5 h-5 text-amber-400" />
              Capaian Pembelajaran (CP) & Tujuan Pembelajaran (TP)
            </h2>
            <span className="text-[10px] bg-sky-500/30 text-sky-200 border border-sky-400/30 px-2 py-0.5 rounded-full font-bold">
              {selectedFase}
            </span>
          </div>
          <p className="text-xs text-sky-200 mt-1">
            Basis penyusunan asesmen dan narasi rapor otomatis Kurikulum Merdeka Kemendikbudristek.
          </p>
        </div>

        {/* Encrypted Online Access Badge */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl px-3.5 py-2 border border-white/10 flex items-center gap-3 text-xs">
          <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-white flex items-center gap-1.5">
              <span>Akses Daring Terenkripsi</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <div className="text-[10px] text-sky-300">Protokol SSL/AES & Cadangan Aman</div>
          </div>
        </div>
      </div>

      {/* Subject Navigation Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {subjects.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSubjectId(s.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeSubjectId === s.id
                ? 'bg-sky-600 text-white shadow'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>{s.kode}</span>
            <span className="text-[10px] opacity-80 truncate max-w-[120px]">{s.nama}</span>
          </button>
        ))}
      </div>

      {/* Main Content: CP and TP Toggle */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
              {selectedSubject?.kode} - {selectedSubject?.kategori}
            </span>
            <h3 className="text-base font-extrabold text-slate-900">{selectedSubject?.nama}</h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-slate-100 p-1 rounded-lg flex text-xs">
              <button
                onClick={() => setActiveView('TP')}
                className={`px-3 py-1 rounded-md font-semibold transition ${
                  activeView === 'TP' ? 'bg-white shadow text-sky-700' : 'text-slate-600'
                }`}
              >
                Tujuan Pembelajaran (TP)
              </button>
              <button
                onClick={() => setActiveView('CP')}
                className={`px-3 py-1 rounded-md font-semibold transition ${
                  activeView === 'CP' ? 'bg-white shadow text-sky-700' : 'text-slate-600'
                }`}
              >
                Capaian Pembelajaran (CP)
              </button>
            </div>

            {activeView === 'TP' && (
              <button
                onClick={handleOpenAddTP}
                className="flex items-center gap-1 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow transition"
              >
                <Plus className="w-3.5 h-3.5" /> Tambah TP
              </button>
            )}
          </div>
        </div>

        {/* View Content */}
        {activeView === 'TP' ? (
          <div className="space-y-3">
            <div className="text-xs text-slate-500 flex items-center justify-between">
              <span>
                Menampilkan <b>{currentTPs.length}</b> Tujuan Pembelajaran untuk semester ini.
              </span>
              <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Frasa ringkasan akan disisipkan otomatis ke kalimat deskripsi Rapor
              </span>
            </div>

            {currentTPs.length > 0 ? (
              <div className="space-y-2.5">
                {currentTPs.map((tp) => (
                  <div
                    key={tp.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      tp.aktif
                        ? 'bg-slate-50/70 border-slate-200 hover:border-sky-300'
                        : 'bg-slate-100/50 border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleTPActive(tp.id)}
                          className={`mt-0.5 p-1 rounded transition ${
                            tp.aktif ? 'text-emerald-600' : 'text-slate-400'
                          }`}
                          title={tp.aktif ? 'Klik untuk non-aktifkan' : 'Klik untuk aktifkan'}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs text-sky-800 bg-sky-100 px-2 py-0.5 rounded">
                              {tp.kodeTP}
                            </span>
                            <span className="text-[11px] text-slate-400 font-medium">
                              Semester {tp.semester}
                            </span>
                          </div>
                          <p className="text-xs text-slate-800 font-medium mt-1 leading-relaxed">
                            {tp.deskripsi}
                          </p>
                          <div className="mt-2 text-[11px] text-slate-600 bg-white p-2 rounded-lg border border-slate-200 inline-block">
                            <span className="text-slate-400 font-semibold mr-1">Frasa Rapor:</span>
                            <span className="text-indigo-900 font-semibold">"{tp.ringkasan}"</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1 shrink-0">
                        <button
                          onClick={() => handleOpenEditTP(tp)}
                          className="p-1.5 text-sky-600 hover:text-sky-800 hover:bg-white rounded-lg border border-transparent hover:border-slate-200"
                          title="Ubah TP"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTP(tp.id)}
                          className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-white rounded-lg border border-transparent hover:border-slate-200"
                          title="Hapus TP"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300 p-6">
                <Target className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs text-slate-600 font-medium">
                  Belum ada Tujuan Pembelajaran untuk {selectedSubject?.nama} di {selectedFase}.
                </p>
                <button
                  onClick={handleOpenAddTP}
                  className="mt-3 px-3.5 py-1.5 text-xs font-semibold bg-sky-600 text-white rounded-lg hover:bg-sky-500"
                >
                  Tambah TP Pertama
                </button>
              </div>
            )}
          </div>
        ) : (
          /* CP View */
          <div className="space-y-4">
            <div className="p-4 bg-sky-50 rounded-xl border border-sky-200">
              <div className="flex items-center gap-2 text-sky-900 font-bold text-xs mb-1">
                <BookOpen className="w-4 h-4 text-sky-700" />
                <span>Elemen Pembelajaran: {currentCP?.elemen || 'Komprehensif'}</span>
              </div>
              <p className="text-xs text-slate-800 leading-relaxed mt-2">
                {currentCP?.deskripsiCP ||
                  `Peserta didik pada ${selectedFase} diharapkan menguasai kompetensi dasar, keterampilan berpikir kritis, dan karakter Profil Pelajar Pancasila sesuai dengan Capaian Pembelajaran standar Badan Standar, Kurikulum, dan Asesmen Pendidikan (BSKAP).`}
              </p>
            </div>

            <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center justify-between">
              <span>
                Dokumen CP bersumber dari Keputusan Kepala BSKAP Kemendikbudristek Nomor 033/H/KR/2022.
              </span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Terverifikasi
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Modal Add / Edit TP */}
      {isTPModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-400" />
                {editingTP ? 'Ubah Tujuan Pembelajaran' : 'Tambah Tujuan Pembelajaran'}
              </h3>
              <button
                onClick={() => setIsTPModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTP} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kode TP</label>
                  <input
                    type="text"
                    value={tpForm.kodeTP}
                    onChange={(e) => setTpForm({ ...tpForm, kodeTP: e.target.value })}
                    placeholder="Contoh: TP 1.1"
                    className="w-full px-3 py-2 border rounded-lg font-mono font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Semester</label>
                  <select
                    value={tpForm.semester}
                    onChange={(e) => setTpForm({ ...tpForm, semester: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="I (Ganjil)">I (Ganjil)</option>
                    <option value="II (Genap)">II (Genap)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Deskripsi Lengkap Tujuan Pembelajaran (RPP / Modul Ajar)
                </label>
                <textarea
                  rows={3}
                  value={tpForm.deskripsi}
                  onChange={(e) => setTpForm({ ...tpForm, deskripsi: e.target.value })}
                  placeholder="Contoh: Menjelaskan dan melakukan operasi hitung penjumlahan dan pengurangan pecahan berbeda penyebut"
                  className="w-full px-3 py-2 border rounded-lg leading-relaxed"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Frasa Ringkasan untuk Deskripsi Rapor (Singkat & Jelas)
                </label>
                <input
                  type="text"
                  value={tpForm.ringkasan}
                  onChange={(e) => setTpForm({ ...tpForm, ringkasan: e.target.value })}
                  placeholder="Contoh: operasi hitung penjumlahan dan pengurangan pecahan"
                  className="w-full px-3 py-2 border rounded-lg font-medium text-sky-900"
                  required
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  Akan dirangkai ke: "Menunjukkan penguasaan yang sangat baik dalam [Frasa Ringkasan]..."
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsTPModalOpen(false)}
                  className="px-4 py-2 border rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-lg flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  Simpan TP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

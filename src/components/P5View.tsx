import React, { useState } from 'react';
import { useRapor } from '../context/RaporContext';
import { P5Record } from '../types';
import {
  Compass,
  HeartHandshake,
  CheckCircle,
  Save,
  Sparkles,
  Users
} from 'lucide-react';

export const P5View: React.FC = () => {
  const { students, p5Records, setP5Records, addToast } = useRapor();
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || 'std-1');

  const selectedStudent = students.find((s) => s.id === selectedStudentId);
  const currentRecord = p5Records.find((p) => p.studentId === selectedStudentId) || {
    studentId: selectedStudentId,
    temaProjek: 'Gaya Hidup Berkelanjutan',
    judulProjek: 'Memilah Sampah Menjadi Berkah dan Pupuk Kompos Alami',
    deskripsiProjek: 'Projek penguatan profil pelajar pancasila mengenai kesadaran kelestarian lingkungan hidup.',
    dimensi: {
      berimanBertakwa: 'BSH',
      kebinekaanGlobal: 'BSH',
      bergotongRoyong: 'SAB',
      mandiri: 'BSH',
      bernalarKritis: 'BSH',
      kreatif: 'SAB',
    },
    catatanProjek: `Ananda aktif bekerja sama dalam pembuatan kompos alami.`,
  };

  const handleDimensiChange = (
    key: keyof P5Record['dimensi'],
    val: 'MB' | 'SB' | 'BSH' | 'SAB'
  ) => {
    setP5Records((prev) => {
      const idx = prev.findIndex((p) => p.studentId === selectedStudentId);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          dimensi: { ...updated[idx].dimensi, [key]: val },
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            ...currentRecord,
            dimensi: { ...currentRecord.dimensi, [key]: val },
          },
        ];
      }
    });
    addToast('Capaian dimensi P5 diperbarui.', 'info');
  };

  const handleUpdateNotes = (val: string) => {
    setP5Records((prev) => {
      const idx = prev.findIndex((p) => p.studentId === selectedStudentId);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], catatanProjek: val };
        return updated;
      } else {
        return [...prev, { ...currentRecord, catatanProjek: val }];
      }
    });
  };

  const handleApplyDimensionsToClass = () => {
    setP5Records((prev) =>
      prev.map((p) => ({
        ...p,
        temaProjek: currentRecord.temaProjek,
        judulProjek: currentRecord.judulProjek,
        deskripsiProjek: currentRecord.deskripsiProjek,
      }))
    );
    addToast('Tema dan judul projek P5 diseragamkan untuk seluruh kelas.', 'success');
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-600" />
            Kokurikuler: Projek Penguatan Profil Pelajar Pancasila (P5)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Penilaian 6 Dimensi Karakter Pelajar Pancasila Kurikulum Merdeka.
          </p>
        </div>

        <button
          onClick={handleApplyDimensionsToClass}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition shadow"
        >
          <HeartHandshake className="w-3.5 h-3.5" />
          Terapkan Tema ke Seluruh Kelas
        </button>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Student picker */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3">
          <h3 className="font-bold text-xs text-slate-800">Pilih Peserta Didik</h3>
          <div className="max-h-[520px] overflow-y-auto space-y-1">
            {students.map((std, i) => (
              <button
                key={std.id}
                onClick={() => setSelectedStudentId(std.id)}
                className={`w-full p-2.5 rounded-lg text-left text-xs font-semibold transition flex items-center justify-between ${
                  selectedStudentId === std.id
                    ? 'bg-amber-600 text-white shadow'
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span className="truncate">{std.nama}</span>
                <span className="text-[10px] opacity-75">{i + 1}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dimension Assessment and Project details */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                Tema & Asesmen Projek
              </span>
              <h3 className="text-base font-extrabold text-slate-900">{selectedStudent?.nama}</h3>
              <p className="text-xs text-slate-600 font-medium mt-1">
                Projek: <b>{currentRecord.judulProjek}</b> ({currentRecord.temaProjek})
              </p>
            </div>

            {/* 6 Dimensions Rating */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Dimensi Profil Pelajar Pancasila</span>
                <div className="flex gap-2 text-[10px] font-bold">
                  <span className="text-slate-400">MB (Mulai)</span>
                  <span className="text-amber-600">SB (Sedang)</span>
                  <span className="text-blue-600">BSH (Sesuai Harapan)</span>
                  <span className="text-emerald-600">SAB (Sangat Berkembang)</span>
                </div>
              </div>

              {[
                { key: 'berimanBertakwa', label: '1. Beriman, Bertakwa kepada Tuhan YME, dan Berakhlak Mulia' },
                { key: 'kebinekaanGlobal', label: '2. Berkebinekaan Global' },
                { key: 'bergotongRoyong', label: '3. Bergotong Royong' },
                { key: 'mandiri', label: '4. Mandiri' },
                { key: 'bernalarKritis', label: '5. Bernalar Kritis' },
                { key: 'kreatif', label: '6. Kreatif' },
              ].map((dim) => {
                const currentVal = currentRecord.dimensi[dim.key as keyof P5Record['dimensi']];

                return (
                  <div
                    key={dim.key}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs"
                  >
                    <span className="font-semibold text-slate-800">{dim.label}</span>
                    <div className="flex items-center gap-1.5">
                      {(['MB', 'SB', 'BSH', 'SAB'] as const).map((grade) => (
                        <button
                          key={grade}
                          type="button"
                          onClick={() =>
                            handleDimensiChange(dim.key as keyof P5Record['dimensi'], grade)
                          }
                          className={`px-2.5 py-1 rounded-md font-bold text-xs transition ${
                            currentVal === grade
                              ? grade === 'SAB'
                                ? 'bg-emerald-600 text-white shadow'
                                : grade === 'BSH'
                                ? 'bg-blue-600 text-white shadow'
                                : grade === 'SB'
                                ? 'bg-amber-600 text-white shadow'
                                : 'bg-slate-700 text-white shadow'
                              : 'bg-white text-slate-600 border hover:bg-slate-100'
                          }`}
                        >
                          {grade}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Project Notes */}
            <div className="pt-2 text-xs">
              <label className="block font-semibold text-slate-700 mb-1">
                Catatan Penilaian Projek Siswa
              </label>
              <textarea
                rows={3}
                value={currentRecord.catatanProjek}
                onChange={(e) => handleUpdateNotes(e.target.value)}
                className="w-full p-2.5 border rounded-lg text-xs"
                placeholder="Catatan perkembangan karakter profil pelajar pancasila siswa..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

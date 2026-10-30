import React, { useState } from 'react';
import { useRapor } from '../context/RaporContext';
import { KKTPConfig } from '../types';
import {
  Sliders,
  CheckCircle2,
  Info,
  Save,
  RotateCcw,
  BookOpen,
  PieChart
} from 'lucide-react';

export const KKTPView: React.FC = () => {
  const { kktpConfig, setKktpConfig, subjects, setSubjects, addToast } = useRapor();
  const [localConfig, setLocalConfig] = useState<KKTPConfig>(kktpConfig);
  const [activeApproach, setActiveApproach] = useState<'interval' | 'rubrik' | 'skala'>('interval');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate bobot
    const totalBobot =
      localConfig.bobotNilai.formatif +
      localConfig.bobotNilai.sumatifLingkupMateri +
      localConfig.bobotNilai.sumatifAkhirSemester;

    if (totalBobot !== 100) {
      addToast(`Total bobot nilai harus tepat 100% (saat ini ${totalBobot}%).`, 'warning');
      return;
    }

    setKktpConfig(localConfig);
    addToast('Konfigurasi KKTP dan Bobot Penilaian berhasil disimpan!', 'success');
  };

  const applyToAllSubjects = () => {
    setSubjects((prev) =>
      prev.map((s) => ({ ...s, kktp: localConfig.kriteriaMinimal }))
    );
    addToast(`Standar KKTP ${localConfig.kriteriaMinimal} diterapkan ke seluruh mata pelajaran.`, 'info');
  };

  const handleResetDefaults = () => {
    const defaults: KKTPConfig = {
      kriteriaMinimal: 75,
      interval: {
        perluBimbinganMax: 69,
        cukupMax: 79,
        baikMax: 89,
        sangatBaikMin: 90,
      },
      bobotNilai: {
        formatif: 30,
        sumatifLingkupMateri: 40,
        sumatifAkhirSemester: 30,
      },
    };
    setLocalConfig(defaults);
    setKktpConfig(defaults);
    addToast('Konfigurasi KKTP dikembalikan ke rekomendasi resmi BSKAP.', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-sky-600" />
            Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Panduan Pembelajaran dan Asesmen (PPA) Kurikulum Merdeka Kemendikbudristek RI.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetDefaults}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Standar
          </button>
          <button
            onClick={applyToAllSubjects}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition shadow"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Terapkan ke Semua Mapel
          </button>
        </div>
      </div>

      {/* Approach Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <button
          onClick={() => setActiveApproach('interval')}
          className={`p-4 rounded-xl text-left border transition-all ${
            activeApproach === 'interval'
              ? 'bg-sky-50 border-sky-400 shadow-sm ring-1 ring-sky-400'
              : 'bg-white border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-slate-900">Pendekatan Interval Nilai</span>
            <span className="text-[10px] bg-sky-200 text-sky-900 font-bold px-1.5 py-0.5 rounded">
              Direkomendasikan
            </span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
            Menentukan interval skor untuk 4 tingkatan ketercapaian (Perlu Bimbingan, Cukup, Baik, Sangat Baik).
          </p>
        </button>

        <button
          onClick={() => setActiveApproach('rubrik')}
          className={`p-4 rounded-xl text-left border transition-all ${
            activeApproach === 'rubrik'
              ? 'bg-sky-50 border-sky-400 shadow-sm ring-1 ring-sky-400'
              : 'bg-white border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-slate-900">Pendekatan Deskripsi Kriteria</span>
            <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
              Kualitatif
            </span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
            Guru menetapkan deskripsi kriteria ketercapaian pada setiap tahapan perkembangan siswa.
          </p>
        </button>

        <button
          onClick={() => setActiveApproach('skala')}
          className={`p-4 rounded-xl text-left border transition-all ${
            activeApproach === 'skala'
              ? 'bg-sky-50 border-sky-400 shadow-sm ring-1 ring-sky-400'
              : 'bg-white border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-slate-900">Pendekatan Skala Persentase</span>
            <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
              Proporsional
            </span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
            Ketercapaian diukur berdasarkan persentase ketuntasan indikator capaian tujuan pembelajaran.
          </p>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Interval Setting (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-sky-600" />
                Interval Nilai & Kriteria Tindak Lanjut
              </h3>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium">KKTP Minimal Acuan:</span>
                <input
                  type="number"
                  min="50"
                  max="100"
                  value={localConfig.kriteriaMinimal}
                  onChange={(e) =>
                    setLocalConfig({ ...localConfig, kriteriaMinimal: Number(e.target.value) })
                  }
                  className="w-16 px-2 py-1 text-center font-bold text-sky-800 border rounded-lg bg-sky-50"
                />
              </div>
            </div>

            {/* 4 Tiers Interval Cards */}
            <div className="space-y-3 text-xs">
              {/* Tier 1: Perlu Bimbingan */}
              <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/60 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-rose-800 text-sm">0 - {localConfig.interval.perluBimbinganMax}</span>
                    <span className="bg-rose-200 text-rose-900 font-bold px-2 py-0.5 rounded text-[10px]">
                      Perlu Bimbingan
                    </span>
                  </div>
                  <p className="text-rose-900/80 text-[11px] mt-1">
                    Belum mencapai ketuntasan. Wajib remedial dan pendampingan khusus pada seluruh TP.
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <span className="text-[10px] text-slate-500 block mb-1">Batas Maksimal</span>
                  <input
                    type="number"
                    value={localConfig.interval.perluBimbinganMax}
                    onChange={(e) =>
                      setLocalConfig({
                        ...localConfig,
                        interval: { ...localConfig.interval, perluBimbinganMax: Number(e.target.value) },
                      })
                    }
                    className="w-16 px-2 py-1 text-center font-bold border rounded-lg bg-white"
                  />
                </div>
              </div>

              {/* Tier 2: Cukup */}
              <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/60 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-800 text-sm">
                      {localConfig.interval.perluBimbinganMax + 1} - {localConfig.interval.cukupMax}
                    </span>
                    <span className="bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded text-[10px]">
                      Cukup
                    </span>
                  </div>
                  <p className="text-amber-900/80 text-[11px] mt-1">
                    Mencapai kriteria minimal. Perlu pembiasaan latihan pada materi yang belum dikuasai.
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <span className="text-[10px] text-slate-500 block mb-1">Batas Maksimal</span>
                  <input
                    type="number"
                    value={localConfig.interval.cukupMax}
                    onChange={(e) =>
                      setLocalConfig({
                        ...localConfig,
                        interval: { ...localConfig.interval, cukupMax: Number(e.target.value) },
                      })
                    }
                    className="w-16 px-2 py-1 text-center font-bold border rounded-lg bg-white"
                  />
                </div>
              </div>

              {/* Tier 3: Baik */}
              <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/60 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-blue-800 text-sm">
                      {localConfig.interval.cukupMax + 1} - {localConfig.interval.baikMax}
                    </span>
                    <span className="bg-blue-200 text-blue-900 font-bold px-2 py-0.5 rounded text-[10px]">
                      Baik
                    </span>
                  </div>
                  <p className="text-blue-900/80 text-[11px] mt-1">
                    Tuntas dan menguasai sebagian besar TP. Lanjutkan dengan pemantapan mandiri.
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <span className="text-[10px] text-slate-500 block mb-1">Batas Maksimal</span>
                  <input
                    type="number"
                    value={localConfig.interval.baikMax}
                    onChange={(e) =>
                      setLocalConfig({
                        ...localConfig,
                        interval: { ...localConfig.interval, baikMax: Number(e.target.value) },
                      })
                    }
                    className="w-16 px-2 py-1 text-center font-bold border rounded-lg bg-white"
                  />
                </div>
              </div>

              {/* Tier 4: Sangat Baik */}
              <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/60 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-800 text-sm">
                      {localConfig.interval.sangatBaikMin} - 100
                    </span>
                    <span className="bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded text-[10px]">
                      Sangat Baik
                    </span>
                  </div>
                  <p className="text-emerald-900/80 text-[11px] mt-1">
                    Melampaui kriteria ketuntasan. Diberikan materi pengayaan atau tutor sebaya.
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <span className="text-[10px] text-slate-500 block mb-1">Batas Minimal</span>
                  <input
                    type="number"
                    value={localConfig.interval.sangatBaikMin}
                    onChange={(e) =>
                      setLocalConfig({
                        ...localConfig,
                        interval: { ...localConfig.interval, sangatBaikMin: Number(e.target.value) },
                      })
                    }
                    className="w-16 px-2 py-1 text-center font-bold border rounded-lg bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bobot Nilai & Subject KKTP (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Bobot Nilai Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-sky-600" />
                  Bobot Penilaian Rapor
                </h3>
                <span className="text-xs font-bold text-slate-600">Total: 100%</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>1. Asesmen Formatif (Aktivitas Harian)</span>
                    <span className="text-sky-700">{localConfig.bobotNilai.formatif}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    step="5"
                    value={localConfig.bobotNilai.formatif}
                    onChange={(e) =>
                      setLocalConfig({
                        ...localConfig,
                        bobotNilai: { ...localConfig.bobotNilai, formatif: Number(e.target.value) },
                      })
                    }
                    className="w-full accent-sky-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>2. Sumatif Lingkup Materi (Ulangan Bab / TP)</span>
                    <span className="text-sky-700">{localConfig.bobotNilai.sumatifLingkupMateri}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="70"
                    step="5"
                    value={localConfig.bobotNilai.sumatifLingkupMateri}
                    onChange={(e) =>
                      setLocalConfig({
                        ...localConfig,
                        bobotNilai: { ...localConfig.bobotNilai, sumatifLingkupMateri: Number(e.target.value) },
                      })
                    }
                    className="w-full accent-sky-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>3. Sumatif Akhir Semester (SAS / SAT)</span>
                    <span className="text-sky-700">{localConfig.bobotNilai.sumatifAkhirSemester}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="5"
                    value={localConfig.bobotNilai.sumatifAkhirSemester}
                    onChange={(e) =>
                      setLocalConfig({
                        ...localConfig,
                        bobotNilai: { ...localConfig.bobotNilai, sumatifAkhirSemester: Number(e.target.value) },
                      })
                    }
                    className="w-full accent-sky-600"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg text-[11px] text-slate-600 flex items-start gap-2 border border-slate-200">
                <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span>
                  Nilai Akhir Rapor dihitung secara otomatis menggunakan formula berbobot yang dapat Anda ubah sesuai ketetapan rapat dewan guru.
                </span>
              </div>
            </div>

            {/* KKTP Per Subject Quick View */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-600" />
                KKTP Per Mata Pelajaran
              </h3>
              <div className="max-h-48 overflow-y-auto divide-y divide-slate-100 text-xs">
                {subjects.map((s) => (
                  <div key={s.id} className="py-2 flex items-center justify-between">
                    <span className="text-slate-800 font-medium">{s.nama}</span>
                    <span className="font-bold font-mono px-2 py-0.5 bg-sky-50 text-sky-800 rounded border border-sky-100">
                      {s.kktp}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-md transition"
          >
            <Save className="w-4 h-4" />
            Simpan Konfigurasi KKTP
          </button>
        </div>
      </form>
    </div>
  );
};

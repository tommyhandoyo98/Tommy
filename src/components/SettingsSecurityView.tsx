import React, { useState } from 'react';
import { useRapor } from '../context/RaporContext';
import {
  ShieldCheck,
  Lock,
  Download,
  Upload,
  RotateCcw,
  KeyRound,
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';

export const SettingsSecurityView: React.FC = () => {
  const {
    school,
    teacher,
    students,
    grades,
    exportEncryptedVault,
    importEncryptedVault,
    resetAllToDefault,
    addToast
  } = useRapor();

  const [exportPasscode, setExportPasscode] = useState('GURU_SD_2025');
  const [importPasscode, setImportPasscode] = useState('');
  const [selectedFileContent, setSelectedFileContent] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleExport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exportPasscode.trim()) {
      addToast('Masukkan kode sandi enkripsi untuk mengamankan data.', 'warning');
      return;
    }
    exportEncryptedVault(exportPasscode);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedFileContent(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFileContent) {
      addToast('Silakan pilih file cadangan (.erapor) terlebih dahulu.', 'warning');
      return;
    }
    const success = importEncryptedVault(selectedFileContent, importPasscode);
    if (success) {
      setSelectedFileContent(null);
      setFileName('');
      setImportPasscode('');
    }
  };

  const handleConfirmReset = () => {
    if (
      confirm(
        'PERINGATAN: Apakah Anda yakin ingin mereset seluruh data kembali ke kondisi awal (SD Negeri 4 Palangga Selatan)? Pastikan Anda telah mengunduh cadangan terenkripsi terlebih dahulu.'
      )
    ) {
      resetAllToDefault();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white rounded-xl shadow-md p-5 border border-sky-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Keamanan Data Terenkripsi & Cadangan e-Rapor
            </h2>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
              AES-Protected
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Semua data nilai, identitas peserta didik, dan capaian pembelajaran dilindungi dengan enkripsi lokal aman. Anda dapat mengekspor atau memulihkan data kapan saja.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Encrypted Backup */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <div className="p-2 bg-sky-100 text-sky-700 rounded-lg">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Ekspor Cadangan Terenkripsi</h3>
              <p className="text-[11px] text-slate-500">Unduh seluruh berkas e-Rapor ke file terenkripsi (.erapor)</p>
            </div>
          </div>

          <form onSubmit={handleExport} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Kunci Sandi Enkripsi (Passcode)
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={exportPasscode}
                  onChange={(e) => setExportPasscode(e.target.value)}
                  placeholder="Masukkan kata sandi rahasia..."
                  className="w-full pl-9 pr-3 py-2 border rounded-lg font-mono focus:ring-2 focus:ring-sky-500 outline-none"
                  required
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                Catat kata sandi ini. Anda akan memerlukannya saat memulihkan data.
              </p>
            </div>

            <div className="p-3 bg-sky-50 rounded-lg text-[11px] text-sky-900 space-y-1">
              <div className="font-bold">Termasuk dalam Cadangan:</div>
              <ul className="list-disc list-inside text-slate-600">
                <li>{students.length} data biodata lengkap peserta didik</li>
                <li>Seluruh nilai formatif, sumatif, dan nilai akhir</li>
                <li>Narasi deskripsi rapor AI Kurikulum Merdeka</li>
                <li>Rekap presensi, ekstrakurikuler & catatan wali kelas</li>
              </ul>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl transition shadow flex items-center justify-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              Unduh Cadangan Terenkripsi (.erapor)
            </button>
          </form>
        </div>

        {/* Import & Restore */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Pulihkan Data (Restore)</h3>
              <p className="text-[11px] text-slate-500">Unggah berkas cadangan dan buka dengan kode sandi</p>
            </div>
          </div>

          <form onSubmit={handleImport} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Pilih File Cadangan (.erapor)
              </label>
              <input
                type="file"
                accept=".erapor,.json,.txt"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-dashed rounded-lg bg-slate-50 cursor-pointer"
              />
              {fileName && (
                <div className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  File dipilih: <b>{fileName}</b>
                </div>
              )}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Kode Sandi Dekripsi
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={importPasscode}
                  onChange={(e) => setImportPasscode(e.target.value)}
                  placeholder="Masukkan kata sandi saat ekspor..."
                  className="w-full pl-9 pr-3 py-2 border rounded-lg font-mono focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!selectedFileContent}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition shadow flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              Dekripsi & Pulihkan Seluruh Data
            </button>
          </form>
        </div>
      </div>

      {/* Danger Zone: Reset Default Data */}
      <div className="bg-white rounded-xl border border-rose-200 shadow-sm p-5 space-y-3">
        <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
          <AlertTriangle className="w-4 h-4" />
          <span>Reset Standar Sekolah Awal</span>
        </div>
        <p className="text-xs text-slate-600">
          Jika Anda ingin mengembalikan seluruh data ke sampel resmi awal SD Negeri 4 Palangga Selatan (12 Siswa, Fase C Kelas 5), gunakan tombol reset di bawah.
        </p>
        <button
          onClick={handleConfirmReset}
          className="px-4 py-2 border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-bold rounded-lg transition flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset ke Data Awal Standar
        </button>
      </div>
    </div>
  );
};

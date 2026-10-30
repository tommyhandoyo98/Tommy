export type FaseType = 'Fase A' | 'Fase B' | 'Fase C';

export interface SchoolProfile {
  namaSekolah: string;
  npsn: string;
  nss: string;
  alamatSekolah: string;
  kodePos: string;
  desaKelurahan: string;
  kecamatan: string;
  kabupatenKota: string;
  provinsi: string;
  website: string;
  email: string;
  namaKepalaSekolah: string;
  nipKepalaSekolah: string;
}

export interface TeacherProfile {
  namaGuru: string;
  nip: string;
  kelas: string;
  fase: FaseType;
  tahunPelajaran: string;
  semester: 'I (Ganjil)' | 'II (Genap)';
  tempatTanggalRapor: string;
}

export interface Student {
  id: string;
  nis: string;
  nisn: string;
  nama: string;
  jenisKelamin: 'L' | 'P';
  tempatLahir: string;
  tanggalLahir: string;
  agama: string;
  pendidikanSebelumnya?: string;
  alamat: string;
  namaAyah: string;
  pekerjaanAyah: string;
  namaIbu: string;
  pekerjaanIbu: string;
  namaWali?: string;
  pekerjaanWali?: string;
  teleponOrtu?: string;
}

export interface Subject {
  id: string;
  kode: string;
  nama: string;
  kategori: 'Wajib' | 'Muatan Lokal' | 'Pilihan';
  fase: FaseType[];
  kktp: number;
  guruPengampu?: string;
}

export interface LearningObjective {
  id: string;
  subjectId: string;
  fase: FaseType;
  semester: 'I (Ganjil)' | 'II (Genap)';
  kodeTP: string;
  deskripsi: string;
  ringkasan: string; // Frasa pendek untuk deskripsi rapor, mis. "menyelesaikan operasi hitung pecahan"
  aktif: boolean;
}

export interface LearningOutcomeCP {
  id: string;
  subjectId: string;
  fase: FaseType;
  elemen: string;
  deskripsiCP: string;
}

export interface KKTPConfig {
  kriteriaMinimal: number; // e.g. 75
  interval: {
    perluBimbinganMax: number; // 0 - 69
    cukupMax: number;          // 70 - 79
    baikMax: number;           // 80 - 89
    sangatBaikMin: number;     // 90 - 100
  };
  bobotNilai: {
    formatif: number; // percentage, e.g. 30
    sumatifLingkupMateri: number; // e.g. 40
    sumatifAkhirSemester: number; // e.g. 30
  };
}

export interface SubjectGrade {
  studentId: string;
  subjectId: string;
  // Nilai Formatif / Lingkup Materi per TP
  tpScores: Record<string, number>; // tpId -> score (0 - 100)
  nilaiSumatifMateri: number;
  nilaiSAS: number; // Sumatif Akhir Semester
  nilaiAkhir: number;
  // Deskripsi Kurikulum Merdeka
  capaianTertinggiTPId?: string;
  capaianTerendahTPId?: string;
  deskripsiCapaianTertinggi: string;
  deskripsiCapaianTerendah: string;
  deskripsiAkhir: string;
  isAiGenerated?: boolean;
}

export interface AttendanceRecord {
  studentId: string;
  sakit: number;
  izin: number;
  tanpaKeterangan: number;
}

export interface ExtracurricularRecord {
  id: string;
  studentId: string;
  namaKegiatan: string;
  predikat: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Kurang';
  keterangan: string;
}

export interface P5Record {
  studentId: string;
  temaProjek: string;
  judulProjek: string;
  deskripsiProjek: string;
  dimensi: {
    berimanBertakwa: 'MB' | 'SB' | 'BSH' | 'SAB';
    kebinekaanGlobal: 'MB' | 'SB' | 'BSH' | 'SAB';
    bergotongRoyong: 'MB' | 'SB' | 'BSH' | 'SAB';
    mandiri: 'MB' | 'SB' | 'BSH' | 'SAB';
    bernalarKritis: 'MB' | 'SB' | 'BSH' | 'SAB';
    kreatif: 'MB' | 'SB' | 'BSH' | 'SAB';
  };
  catatanProjek: string;
}

export interface HomeroomNote {
  studentId: string;
  catatan: string;
  statusKenaikan?: 'Naik ke kelas berikutnya' | 'Tinggal di kelas' | 'Lulus' | '-';
}

export interface EncryptedVaultData {
  version: string;
  exportedAt: string;
  school: SchoolProfile;
  teacher: TeacherProfile;
  students: Student[];
  subjects: Subject[];
  learningObjectives: LearningObjective[];
  learningOutcomes: LearningOutcomeCP[];
  kktpConfig: KKTPConfig;
  grades: SubjectGrade[];
  attendances: AttendanceRecord[];
  extracurriculars: ExtracurricularRecord[];
  p5Records: P5Record[];
  homeroomNotes: HomeroomNote[];
}

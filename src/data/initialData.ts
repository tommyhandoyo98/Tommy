import {
  SchoolProfile,
  TeacherProfile,
  Student,
  Subject,
  LearningObjective,
  LearningOutcomeCP,
  KKTPConfig,
  SubjectGrade,
  AttendanceRecord,
  ExtracurricularRecord,
  P5Record,
  HomeroomNote,
} from '../types';

export const initialSchoolProfile: SchoolProfile = {
  namaSekolah: 'SD NEGERI 4 PALANGGA SELATAN',
  npsn: '40405068',
  nss: '101200405068',
  alamatSekolah: 'Desa Mondoe, Kec. Palangga Selatan',
  kodePos: '93381',
  desaKelurahan: 'Mondoe',
  kecamatan: 'Palangga Selatan',
  kabupatenKota: 'Konawe Selatan',
  provinsi: 'Sulawesi Tenggara',
  website: 'https://sdn4palanggaselatan.sch.id',
  email: 'sdn4palanggaselatan@gmail.com',
  namaKepalaSekolah: 'ST ROSIA DEWI MUTHALIB, S.Pd',
  nipKepalaSekolah: '197412121998032001',
};

export const initialTeacherProfile: TeacherProfile = {
  namaGuru: 'TOMMY HANDOYO, S.Pd',
  nip: '198108292022211009',
  kelas: 'V (Lima)',
  fase: 'Fase C',
  tahunPelajaran: '2025/2026',
  semester: 'I (Ganjil)',
  tempatTanggalRapor: 'Palangga Selatan, 19 Desember 2025',
};

export const initialStudents: Student[] = [
  {
    id: 'std-1',
    nis: '2101',
    nisn: '0142981021',
    nama: 'ACHMAD FAIZ AL-FARABI',
    jenisKelamin: 'L',
    tempatLahir: 'Konawe Selatan',
    tanggalLahir: '2014-03-12',
    agama: 'Islam',
    alamat: 'Dusun I Desa Mondoe',
    namaAyah: 'Farhan Syarifudin',
    pekerjaanAyah: 'Petani',
    namaIbu: 'Siti Rahmawati',
    pekerjaanIbu: 'Ibu Rumah Tangga',
    teleponOrtu: '081234567801',
  },
  {
    id: 'std-2',
    nis: '2102',
    nisn: '0145892134',
    nama: 'AISYAH AZ-ZAHRA NUR',
    jenisKelamin: 'P',
    tempatLahir: 'Kendari',
    tanggalLahir: '2014-06-25',
    agama: 'Islam',
    alamat: 'Jl. Poros Palangga Selatan No. 14',
    namaAyah: 'Nurdin Wijaya',
    pekerjaanAyah: 'Wiraswasta',
    namaIbu: 'Amina Halim',
    pekerjaanIbu: 'Guru',
    teleponOrtu: '081234567802',
  },
  {
    id: 'std-3',
    nis: '2103',
    nisn: '0147612345',
    nama: 'ANDI MUHAMMAD RIZKY',
    jenisKelamin: 'L',
    tempatLahir: 'Mondoe',
    tanggalLahir: '2014-01-18',
    agama: 'Islam',
    alamat: 'Desa Mondoe RT 02 RW 01',
    namaAyah: 'Andi Baso Pratama',
    pekerjaanAyah: 'PNS',
    namaIbu: 'Sri Wahyuni',
    pekerjaanIbu: 'Wiraswasta',
    teleponOrtu: '081234567803',
  },
  {
    id: 'std-4',
    nis: '2104',
    nisn: '0149023412',
    nama: 'AQILA CLARA SALSABILA',
    jenisKelamin: 'P',
    tempatLahir: 'Konawe Selatan',
    tanggalLahir: '2014-08-09',
    agama: 'Islam',
    alamat: 'Desa Mondoe RT 03 RW 01',
    namaAyah: 'Hasan Basri',
    pekerjaanAyah: 'Pedagang',
    namaIbu: 'Nurhayati',
    pekerjaanIbu: 'Pedagang',
    teleponOrtu: '081234567804',
  },
  {
    id: 'std-5',
    nis: '2105',
    nisn: '0148194567',
    nama: 'BAYU ADITYA RAMADHAN',
    jenisKelamin: 'L',
    tempatLahir: 'Andoolo',
    tanggalLahir: '2014-07-15',
    agama: 'Islam',
    alamat: 'Jl. Melati Desa Mondoe',
    namaAyah: 'Budi Santoso',
    pekerjaanAyah: 'Karyawan Swasta',
    namaIbu: 'Lestari Handayani',
    pekerjaanIbu: 'Ibu Rumah Tangga',
    teleponOrtu: '081234567805',
  },
  {
    id: 'std-6',
    nis: '2106',
    nisn: '0146382910',
    nama: 'CHELSEA OLIVIA PUTRI',
    jenisKelamin: 'P',
    tempatLahir: 'Kendari',
    tanggalLahir: '2014-11-03',
    agama: 'Kristen',
    alamat: 'Kompleks SP Mondoe',
    namaAyah: 'Daniel Simatupang',
    pekerjaanAyah: 'Wiraswasta',
    namaIbu: 'Martha Limbong',
    pekerjaanIbu: 'Tenaga Kesehatan',
    teleponOrtu: '081234567806',
  },
  {
    id: 'std-7',
    nis: '2107',
    nisn: '0145271890',
    nama: 'FADHIL ARKAN KHAIR',
    jenisKelamin: 'L',
    tempatLahir: 'Mondoe',
    tanggalLahir: '2014-04-19',
    agama: 'Islam',
    alamat: 'Desa Mondoe RT 01 RW 02',
    namaAyah: 'Khairul Anwar',
    pekerjaanAyah: 'Petani',
    namaIbu: 'Fatmawati',
    pekerjaanIbu: 'Ibu Rumah Tangga',
    teleponOrtu: '081234567807',
  },
  {
    id: 'std-8',
    nis: '2108',
    nisn: '0149381023',
    nama: 'GITA KHAIRUNNISA',
    jenisKelamin: 'P',
    tempatLahir: 'Konawe Selatan',
    tanggalLahir: '2014-09-30',
    agama: 'Islam',
    alamat: 'Dusun II Desa Mondoe',
    namaAyah: 'Gunawan Prasetyo',
    pekerjaanAyah: 'Buruh Tani',
    namaIbu: 'Kartini',
    pekerjaanIbu: 'Ibu Rumah Tangga',
    teleponOrtu: '081234567808',
  },
  {
    id: 'std-9',
    nis: '2109',
    nisn: '0144182901',
    nama: 'HAFIDZ NUR ALAMSYAH',
    jenisKelamin: 'L',
    tempatLahir: 'Palangga',
    tanggalLahir: '2014-05-14',
    agama: 'Islam',
    alamat: 'Jl. Garuda RT 04 Desa Mondoe',
    namaAyah: 'Mansyur Alamsyah',
    pekerjaanAyah: 'Sopir',
    namaIbu: 'Mariana',
    pekerjaanIbu: 'Ibu Rumah Tangga',
    teleponOrtu: '081234567809',
  },
  {
    id: 'std-10',
    nis: '2110',
    nisn: '0143892019',
    nama: 'INTAN PERMATASARI',
    jenisKelamin: 'P',
    tempatLahir: 'Konawe Selatan',
    tanggalLahir: '2014-12-10',
    agama: 'Islam',
    alamat: 'Desa Mondoe RT 02 RW 02',
    namaAyah: 'Surya Saputra',
    pekerjaanAyah: 'Tukang Kayu',
    namaIbu: 'Endang Suwarni',
    pekerjaanIbu: 'Pedagang Kue',
    teleponOrtu: '081234567810',
  },
  {
    id: 'std-11',
    nis: '2111',
    nisn: '0141908273',
    nama: 'KENZO ARYA PRADIPTA',
    jenisKelamin: 'L',
    tempatLahir: 'Kendari',
    tanggalLahir: '2014-02-28',
    agama: 'Islam',
    alamat: 'Jl. Poros Tinanggea Mondoe',
    namaAyah: 'Hendra Pradipta',
    pekerjaanAyah: 'PNS',
    namaIbu: 'Ratna Juwita',
    pekerjaanIbu: 'PNS',
    teleponOrtu: '081234567811',
  },
  {
    id: 'std-12',
    nis: '2112',
    nisn: '0146019283',
    nama: 'NAURA SHAKILA AZIZAH',
    jenisKelamin: 'P',
    tempatLahir: 'Mondoe',
    tanggalLahir: '2014-10-16',
    agama: 'Islam',
    alamat: 'Dusun III Desa Mondoe',
    namaAyah: 'Abdul Aziz',
    pekerjaanAyah: 'Peternak',
    namaIbu: 'Salmiah',
    pekerjaanIbu: 'Ibu Rumah Tangga',
    teleponOrtu: '081234567812',
  },
];

export const initialSubjects: Subject[] = [
  {
    id: 'mapel-1',
    kode: 'PABP',
    nama: 'Pendidikan Agama dan Budi Pekerti',
    kategori: 'Wajib',
    fase: ['Fase A', 'Fase B', 'Fase C'],
    kktp: 75,
    guruPengampu: 'Ust. Ahmad Dahlan, S.Pd.I',
  },
  {
    id: 'mapel-2',
    kode: 'PPKN',
    nama: 'Pendidikan Pancasila',
    kategori: 'Wajib',
    fase: ['Fase A', 'Fase B', 'Fase C'],
    kktp: 75,
    guruPengampu: 'Tommy Handoyo, S.Pd',
  },
  {
    id: 'mapel-3',
    kode: 'BINDO',
    nama: 'Bahasa Indonesia',
    kategori: 'Wajib',
    fase: ['Fase A', 'Fase B', 'Fase C'],
    kktp: 75,
    guruPengampu: 'Tommy Handoyo, S.Pd',
  },
  {
    id: 'mapel-4',
    kode: 'MTK',
    nama: 'Matematika',
    kategori: 'Wajib',
    fase: ['Fase A', 'Fase B', 'Fase C'],
    kktp: 70,
    guruPengampu: 'Tommy Handoyo, S.Pd',
  },
  {
    id: 'mapel-5',
    kode: 'IPAS',
    nama: 'Ilmu Pengetahuan Alam dan Sosial (IPAS)',
    kategori: 'Wajib',
    fase: ['Fase B', 'Fase C'],
    kktp: 75,
    guruPengampu: 'Tommy Handoyo, S.Pd',
  },
  {
    id: 'mapel-6',
    kode: 'PJOK',
    nama: 'Pendidikan Jasmani, Olahraga, dan Kesehatan',
    kategori: 'Wajib',
    fase: ['Fase A', 'Fase B', 'Fase C'],
    kktp: 75,
    guruPengampu: 'Rahmat Hidayat, S.Pd',
  },
  {
    id: 'mapel-7',
    kode: 'SENI',
    nama: 'Seni Rupa dan Budaya',
    kategori: 'Wajib',
    fase: ['Fase A', 'Fase B', 'Fase C'],
    kktp: 75,
    guruPengampu: 'Dewi Lestari, S.Pd',
  },
  {
    id: 'mapel-8',
    kode: 'BING',
    nama: 'Bahasa Inggris',
    kategori: 'Pilihan',
    fase: ['Fase A', 'Fase B', 'Fase C'],
    kktp: 70,
    guruPengampu: 'Linda Marlina, S.Pd',
  },
  {
    id: 'mapel-9',
    kode: 'MULOK1',
    nama: 'Muatan Lokal: Bahasa Daerah (Tolaki)',
    kategori: 'Muatan Lokal',
    fase: ['Fase A', 'Fase B', 'Fase C'],
    kktp: 75,
    guruPengampu: 'Tommy Handoyo, S.Pd',
  },
  {
    id: 'mapel-10',
    kode: 'MULOK2',
    nama: 'Muatan Lokal: Pendidikan Lingkungan Hidup',
    kategori: 'Muatan Lokal',
    fase: ['Fase B', 'Fase C'],
    kktp: 75,
    guruPengampu: 'Tommy Handoyo, S.Pd',
  },
  {
    id: 'mapel-11',
    kode: 'MULOK3',
    nama: 'Muatan Lokal: Kesenian Tradisional Daerah',
    kategori: 'Muatan Lokal',
    fase: ['Fase A', 'Fase B', 'Fase C'],
    kktp: 75,
    guruPengampu: 'Dewi Lestari, S.Pd',
  },
];

export const initialKKTPConfig: KKTPConfig = {
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

export const initialLearningObjectives: LearningObjective[] = [
  // PABP (Fase C)
  {
    id: 'tp-pabp-1',
    subjectId: 'mapel-1',
    fase: 'Fase C',
    semester: 'I (Ganjil)',
    kodeTP: 'TP 1.1',
    deskripsi: 'Membaca dan memahami pesan pokok Surah Al-Ma\'un dengan tartil dan benar',
    ringkasan: 'membaca dan memahami pesan pokok Surah Al-Ma\'un',
    aktif: true,
  },
  {
    id: 'tp-pabp-2',
    subjectId: 'mapel-1',
    fase: 'Fase C',
    semester: 'I (Ganjil)',
    kodeTP: 'TP 1.2',
    deskripsi: 'Mengenal Asmaulhusna Al-Qawiyyu, Al-Qayyum, Al-Muhyi, Al-Mumit, dan Al-Ba’its serta artinya',
    ringkasan: 'memahami makna Asmaulhusna dan implementasinya dalam keseharian',
    aktif: true,
  },
  {
    id: 'tp-pabp-3',
    subjectId: 'mapel-1',
    fase: 'Fase C',
    semester: 'I (Ganjil)',
    kodeTP: 'TP 1.3',
    deskripsi: 'Menerapkan perilaku saling menghargai dan menyayangi sesama manusia yang beraneka ragam',
    ringkasan: 'menerapkan perilaku toleransi dan saling menghargai keragaman',
    aktif: true,
  },
  {
    id: 'tp-pabp-4',
    subjectId: 'mapel-1',
    fase: 'Fase C',
    semester: 'I (Ganjil)',
    kodeTP: 'TP 1.4',
    deskripsi: 'Menjelaskan makna zakat, infak, sedekah, dan hadiah beserta hikmahnya',
    ringkasan: 'memahami ketentuan dan hikmah zakat, infak, serta sedekah',
    aktif: true,
  },

  // PPKN (Fase C)
  {
    id: 'tp-ppkn-1',
    subjectId: 'mapel-2',
    fase: 'Fase C',
    semester: 'I (Ganjil)',
    kodeTP: 'TP 2.1',
    deskripsi: 'Memahami hubungan antara sila-sila Pancasila dalam satu kesatuan yang utuh',
    ringkasan: 'memahami hubungan sila-sila Pancasila sebagai satu kesatuan utuh',
    aktif: true,
  },
  {
    id: 'tp-ppkn-2',
    subjectId: 'mapel-2',
    fase: 'Fase C',
    semester: 'I (Ganjil)',
    kodeTP: 'TP 2.2',
    deskripsi: 'Menerapkan nilai-nilai Pancasila dalam kehidupan sehari-hari di lingkungan sekolah dan rumah',
    ringkasan: 'menerapkan pengamalan nilai-nilai Pancasila dalam kehidupan sehari-hari',
    aktif: true,
  },
  {
    id: 'tp-ppkn-3',
    subjectId: 'mapel-2',
    fase: 'Fase C',
    semester: 'I (Ganjil)',
    kodeTP: 'TP 2.3',
    deskripsi: 'Menjelaskan hak, kewajiban, dan tanggung jawab sebagai anggota keluarga dan warga sekolah',
    ringkasan: 'melaksanakan hak dan kewajiban secara seimbang di lingkungan sekolah',
    aktif: true,
  },
  {
    id: 'tp-ppkn-4',
    subjectId: 'mapel-2',
    fase: 'Fase C',
    semester: 'I (Ganjil)',
    kodeTP: 'TP 2.4',
    deskripsi: 'Menunjukkan sikap menghargai keberagaman budaya, suku, dan adat istiadat di Indonesia',
    ringkasan: 'menghargai keberagaman budaya dan tradisi di nusantara',
    aktif: true,
  },

  // Bahasa Indonesia (Fase C)
  {
    id: 'tp-bindo-1',
    subjectId: 'mapel-3',
    fase: 'Fase C',
    semester: 'I (Ganjil)',
    kodeTP: 'TP 3.1',
    deskripsi: 'Menemukan informasi penting dan ide pokok dalam teks eksplanasi dan narasi',
    ringkasan: 'menemukan ide pokok serta informasi penting dalam teks bacaan',
    aktif: true,
  },
  {
    id: 'tp-bindo-2',
    subjectId: 'mapel-3',
    fase: 'Fase C',
    semester: 'I (Ganjil)',
    kodeTP: 'TP 3.2',
    deskripsi: 'Mengidentifikasi unsur intrinsik cerita (tokoh, watak, alur, latar, dan amanat)',
    ringkasan: 'menganalisis unsur intrinsik cerita fiksi dengan kritis',
    aktif: true,
  },
  {
    id: 'tp-bindo-3',
    subjectId: 'mapel-3',
    fase: 'Fase C',
    semester: 'I (Ganjil)',
    kodeTP: 'TP 3.3',
    deskripsi: 'Menulis teks deskripsi dan narasi dengan struktur runtut serta kosakata baku',
    ringkasan: 'menulis karangan deskripsi menggunakan kaidah kebahasaan yang runtut',
    aktif: true,
  },
  {
    id: 'tp-bindo-4',
    subjectId: 'mapel-3',
    fase: 'Fase C',
    semester: 'I (Ganjil)',
    kodeTP: 'TP 3.4',
    deskripsi: 'Mempresentasikan pendapat secara lisan dengan intonasi jelas dan santun',
    ringkasan: 'berbicara dan mempresentasikan gagasan dengan intonasi yang santun',
    aktif: true,
  },

  // Matematika (Fase C)
  {
    id: 'tp-mtk-1',
    subjectId: 'mapel-4',
    fase: 'Fase C',
    semester: 'I (Ganjil)',
    kodeTP: 'TP 4.1',
    deskripsi: 'Melakukan operasi hitung penjumlahan dan pengurangan pecahan berbeda penyebut',
    ringkasan: 'menguasai operasi hitung penjumlahan dan pengurangan pecahan',
    aktif: true,
  },
  {
    id: 'tp-mtk-2',
    subjectId: 'mapel-4',
    fase: 'Fase C',
    semester: 'I (Ganjil)',
    kodeTP: 'TP 4.2',
    deskripsi: 'Menyelesaikan permasalahan perkalian dan pembagian pecahan serta desimal dalam kehidupan nyata',
    ringkasan: 'menyelesaikan soal cerita perkalian pecahan dan desimal',
    aktif: true,
  },
  {
    id: 'tp-mtk-3',
    subjectId: 'mapel-4',
    fase: 'Fase C',
    semester: 'I (Ganjil)',
    kodeTP: 'TP 4.3',
    deskripsi: 'Menentukan keliling dan luas bangun datar gabungan secara tepat',
    ringkasan: 'menghitung keliling dan luas bangun datar gabungan',
    aktif: true,
  },
  {
    id: 'tp-mtk-4',
    subjectId: 'mapel-4',
    fase: 'Fase C',
    semester: 'I (Ganjil)',
    kodeTP: 'TP 4.4',
    deskripsi: 'Mengolah dan menyajikan data dalam bentuk tabel frekuensi dan diagram batang',
    ringkasan: 'menyajikan dan menginterpretasikan data dalam diagram batang',
    aktif: true,
  },

  // IPAS (Fase C)
  {
    id: 'tp-ipas-1',
    subjectId: 'mapel-5',
    fase: 'Fase C',
    semester: 'I (Ganjil)',
    kodeTP: 'TP 5.1',
    deskripsi: 'Menjelaskan mekanisme organ pernapasan dan pencernaan manusia beserta fungsinya',
    ringkasan: 'memahami sistem organ pernapasan dan pencernaan manusia',
    aktif: true,
  },
  {
    id: 'tp-ipas-2',
    subjectId: 'mapel-5',
    fase: 'Fase C',
    semester: 'I (Ganjil)',
    kodeTP: 'TP 5.2',
    deskripsi: 'Menganalisis hubungan antarmakhluk hidup dalam rantai makanan dan jaring-jaring makanan ekosistem',
    ringkasan: 'menganalisis interaksi rantai makanan dalam ekosistem',
    aktif: true,
  },
  {
    id: 'tp-ipas-3',
    subjectId: 'mapel-5',
    fase: 'Fase C',
    semester: 'I (Ganjil)',
    kodeTP: 'TP 5.3',
    deskripsi: 'Menyelidiki sifat-sifat bunyi dan cahaya melalui serangkaian percobaan sederhana',
    ringkasan: 'menyelidiki sifat-sifat perambatan bunyi dan pantulan cahaya',
    aktif: true,
  },
  {
    id: 'tp-ipas-4',
    subjectId: 'mapel-5',
    fase: 'Fase C',
    semester: 'I (Ganjil)',
    kodeTP: 'TP 5.4',
    deskripsi: 'Mengidentifikasi kenampakan alam dan buatan serta bentang alam wilayah Indonesia',
    ringkasan: 'mengidentifikasi bentang alam dan pemanfaatan sumber daya alam nusantara',
    aktif: true,
  },

  // PJOK (Fase C)
  {
    id: 'tp-pjok-1',
    subjectId: 'mapel-6',
    fase: 'Fase C',
    semester: 'I (Ganjil)',
    kodeTP: 'TP 6.1',
    deskripsi: 'Mempraktikkan variasi pola gerak dasar lokomotor dan manipulatif dalam permainan bola besar',
    ringkasan: 'mempraktikkan gerak dasar permainan bola besar dengan sportif',
    aktif: true,
  },
  {
    id: 'tp-pjok-2',
    subjectId: 'mapel-6',
    fase: 'Fase C',
    semester: 'I (Ganjil)',
    kodeTP: 'TP 6.2',
    deskripsi: 'Mempraktikkan gerak dasar kebugaran jasmani untuk melatih daya tahan dan kelenturan tubuh',
    ringkasan: 'menjaga kebugaran jasmani dan koordinasi gerak tubuh',
    aktif: true,
  },

  // SENI (Fase C)
  {
    id: 'tp-seni-1',
    subjectId: 'mapel-7',
    fase: 'Fase C',
    semester: 'I (Ganjil)',
    kodeTP: 'TP 7.1',
    deskripsi: 'Membuat karya seni rupa dua dimensi menggunakan prinsip ritme dan proporsi warna',
    ringkasan: 'membuat karya seni visual dengan komposisi warna yang serasi',
    aktif: true,
  },
  {
    id: 'tp-seni-2',
    subjectId: 'mapel-7',
    fase: 'Fase C',
    semester: 'I (Ganjil)',
    kodeTP: 'TP 7.2',
    deskripsi: 'Mengapresiasi motif ragam hias tradisional nusantara dan membuat karya ornamen daerah',
    ringkasan: 'mengapresiasi dan menggambar ragam hias ornamen tradisional',
    aktif: true,
  },

  // Bahasa Inggris (Fase C)
  {
    id: 'tp-bing-1',
    subjectId: 'mapel-8',
    fase: 'Fase C',
    semester: 'I (Ganjil)',
    kodeTP: 'TP 8.1',
    deskripsi: 'Using simple expressions to describe daily routines and hobbies with appropriate vocabulary',
    ringkasan: 'mengungkapkan rutinitas harian dan hobi dalam Bahasa Inggris sederhana',
    aktif: true,
  },
  {
    id: 'tp-bing-2',
    subjectId: 'mapel-8',
    fase: 'Fase C',
    semester: 'I (Ganjil)',
    kodeTP: 'TP 8.2',
    deskripsi: 'Identifying telling time and expressing activities in schedule context',
    ringkasan: 'menyatakan waktu dan jadwal kegiatan dalam Bahasa Inggris',
    aktif: true,
  },

  // Muatan Lokal: Bahasa Tolaki (Fase C)
  {
    id: 'tp-mulok1-1',
    subjectId: 'mapel-9',
    fase: 'Fase C',
    semester: 'I (Ganjil)',
    kodeTP: 'TP 9.1',
    deskripsi: 'Mengenal kosa kata bahasa daerah Tolaki tentang silsilah kekerabatan dan lingkungan sekitar',
    ringkasan: 'memahami kosa kata kekerabatan dalam bahasa daerah Tolaki',
    aktif: true,
  },
  {
    id: 'tp-mulok1-2',
    subjectId: 'mapel-9',
    fase: 'Fase C',
    semester: 'I (Ganjil)',
    kodeTP: 'TP 9.2',
    deskripsi: 'Melafalkan ungkapan kesantunan dan pepatah adat Kalosara dengan baik',
    ringkasan: 'menerapkan ungkapan adat kesantunan Kalosara khas daerah Konawe',
    aktif: true,
  },

  // Muatan Lokal: PLH (Fase C)
  {
    id: 'tp-mulok2-1',
    subjectId: 'mapel-10',
    fase: 'Fase C',
    semester: 'I (Ganjil)',
    kodeTP: 'TP 10.1',
    deskripsi: 'Mempraktikkan cara pemilahan sampah organik dan anorganik di lingkungan sekolah',
    ringkasan: 'terampil memilah sampah dan menjaga keasrian lingkungan sekolah',
    aktif: true,
  },

  // Muatan Lokal: Kesenian Tradisional (Fase C)
  {
    id: 'tp-mulok3-1',
    subjectId: 'mapel-11',
    fase: 'Fase C',
    semester: 'I (Ganjil)',
    kodeTP: 'TP 11.1',
    deskripsi: 'Menampilkan gerakan tari tradisional Lulo dengan irama dan kekompakan yang tepat',
    ringkasan: 'mempraktikkan gerak tari tradisional Lulo dengan kompak',
    aktif: true,
  },
];

export const initialLearningOutcomesCP: LearningOutcomeCP[] = [
  {
    id: 'cp-pabp-c',
    subjectId: 'mapel-1',
    fase: 'Fase C',
    elemen: 'Al-Qur\'an dan Hadis',
    deskripsiCP: 'Peserta didik mampu membaca, menghafal, dan memahami pesan pokok surah-surah pendek Al-Qur\'an serta hadis tentang keragaman dan tolong-menolong dengan baik dan benar.',
  },
  {
    id: 'cp-ppkn-c',
    subjectId: 'mapel-2',
    fase: 'Fase C',
    elemen: 'Pancasila & UUD 1945',
    deskripsiCP: 'Peserta didik memahami hubungan antarsila Pancasila, menerapkan nilai-nilai luhur Pancasila dalam keseharian, serta melaksanakan hak dan kewajiban sebagai warga negara secara bertanggung jawab.',
  },
  {
    id: 'cp-bindo-c',
    subjectId: 'mapel-3',
    fase: 'Fase C',
    elemen: 'Membaca, Memirsa & Menulis',
    deskripsiCP: 'Peserta didik mampu membaca lancar, memahami teks narasi dan eksplanasi, menganalisis ide pokok, serta menyusun tulisan secara runut dan santun menggunakan kaidah bahasa Indonesia yang baik.',
  },
  {
    id: 'cp-mtk-c',
    subjectId: 'mapel-4',
    fase: 'Fase C',
    elemen: 'Bilangan & Geometri',
    deskripsiCP: 'Peserta didik dapat menyelesaikan operasi aritmetika pada pecahan dan desimal, menghitung keliling dan luas bangun datar gabungan, serta menyajikan dan menganalisis data sederhana.',
  },
  {
    id: 'cp-ipas-c',
    subjectId: 'mapel-5',
    fase: 'Fase C',
    elemen: 'Pemahaman IPAS & Keterampilan Proses',
    deskripsiCP: 'Peserta didik memahami sistem pernapasan dan pencernaan manusia, interaksi ekosistem dan jaring makanan, sifat cahaya dan bunyi, serta bentang alam nusantara melalui penyelidikan ilmiah sederhana.',
  },
  {
    id: 'cp-pjok-c',
    subjectId: 'mapel-6',
    fase: 'Fase C',
    elemen: 'Terampil Bergerak & Bugar',
    deskripsiCP: 'Peserta didik mempraktikkan keterampilan gerak spesifik dalam olahraga permainan, aktivitas senam, kebugaran jasmani, dan memahami prinsip hidup bersih serta pola makan sehat.',
  },
];

// Helper to generate realistic initial grades
export function generateInitialGrades(students: Student[], subjects: Subject[], learningObjectives: LearningObjective[]): SubjectGrade[] {
  const grades: SubjectGrade[] = [];

  // Seeded variation for each student
  students.forEach((std, idx) => {
    subjects.forEach((subj) => {
      const subjTPs = learningObjectives.filter((tp) => tp.subjectId === subj.id && tp.aktif);
      const tpScores: Record<string, number> = {};

      // Student ability profile baseline (75 - 95)
      const baseVariation = (idx % 3 === 0 ? 8 : idx % 2 === 0 ? 5 : 2);
      const subjBonus = subj.kode === 'PPKN' || subj.kode === 'PABP' ? 3 : subj.kode === 'MTK' ? -3 : 0;
      const baseScore = Math.min(96, Math.max(72, 80 + baseVariation + subjBonus));

      subjTPs.forEach((tp, tpIdx) => {
        const score = Math.min(98, Math.max(68, baseScore + ((tpIdx % 2 === 0 ? 4 : -4) + (idx % 4))));
        tpScores[tp.id] = score;
      });

      // Calculate Sumatif Lingkup Materi
      const tpScoreValues = Object.values(tpScores);
      const avgMateri = tpScoreValues.length > 0
        ? Math.round(tpScoreValues.reduce((a, b) => a + b, 0) / tpScoreValues.length)
        : baseScore;

      const nilaiSAS = Math.min(98, Math.max(68, avgMateri + (idx % 3 === 0 ? 2 : -2)));
      // Nilai Akhir: 40% Materi + 30% Formatif + 30% SAS (di sini formatif disetarakan materi)
      const nilaiAkhir = Math.round((avgMateri * 0.7) + (nilaiSAS * 0.3));

      // Find highest and lowest TP
      let maxScore = -1;
      let minScore = 999;
      let highestTPId = '';
      let lowestTPId = '';

      Object.entries(tpScores).forEach(([tpId, sc]) => {
        if (sc > maxScore) {
          maxScore = sc;
          highestTPId = tpId;
        }
        if (sc < minScore) {
          minScore = sc;
          lowestTPId = tpId;
        }
      });

      const highestTPObj = subjTPs.find((tp) => tp.id === highestTPId);
      const lowestTPObj = subjTPs.find((tp) => tp.id === lowestTPId);

      const highDesc = highestTPObj
        ? `Menunjukkan penguasaan yang sangat baik dalam ${highestTPObj.ringkasan}.`
        : `Menunjukkan penguasaan materi pembelajaran yang sangat baik.`;

      const lowDesc = (lowestTPObj && lowestTPObj.id !== highestTPId && minScore < 85)
        ? `Perlu bimbingan dan peningkatan dalam ${lowestTPObj.ringkasan}.`
        : `Perlu mempertahankan prestasi belajar serta memperluas latihan mandiri.`;

      grades.push({
        studentId: std.id,
        subjectId: subj.id,
        tpScores,
        nilaiSumatifMateri: avgMateri,
        nilaiSAS,
        nilaiAkhir,
        capaianTertinggiTPId: highestTPId,
        capaianTerendahTPId: lowestTPId,
        deskripsiCapaianTertinggi: highDesc,
        deskripsiCapaianTerendah: lowDesc,
        deskripsiAkhir: `${highDesc} ${lowDesc}`,
        isAiGenerated: false,
      });
    });
  });

  return grades;
}

export const initialAttendances: AttendanceRecord[] = [
  { studentId: 'std-1', sakit: 0, izin: 1, tanpaKeterangan: 0 },
  { studentId: 'std-2', sakit: 1, izin: 0, tanpaKeterangan: 0 },
  { studentId: 'std-3', sakit: 0, izin: 0, tanpaKeterangan: 0 },
  { studentId: 'std-4', sakit: 2, izin: 1, tanpaKeterangan: 0 },
  { studentId: 'std-5', sakit: 0, izin: 0, tanpaKeterangan: 0 },
  { studentId: 'std-6', sakit: 1, izin: 1, tanpaKeterangan: 0 },
  { studentId: 'std-7', sakit: 0, izin: 0, tanpaKeterangan: 0 },
  { studentId: 'std-8', sakit: 1, izin: 0, tanpaKeterangan: 0 },
  { studentId: 'std-9', sakit: 0, izin: 2, tanpaKeterangan: 0 },
  { studentId: 'std-10', sakit: 0, izin: 0, tanpaKeterangan: 0 },
  { studentId: 'std-11', sakit: 0, izin: 0, tanpaKeterangan: 0 },
  { studentId: 'std-12', sakit: 1, izin: 0, tanpaKeterangan: 0 },
];

export const initialExtracurriculars: ExtracurricularRecord[] = [
  { id: 'ek-1', studentId: 'std-1', namaKegiatan: 'Pramuka (Wajib)', predikat: 'Sangat Baik', keterangan: 'Sangat aktif dalam kegiatan tali-temali dan kedisiplinan baris-berbaris.' },
  { id: 'ek-2', studentId: 'std-1', namaKegiatan: 'Dokter Kecil / UKS', predikat: 'Baik', keterangan: 'Memiliki kepedulian tinggi terhadap kebersihan dan pertolongan pertama.' },
  { id: 'ek-3', studentId: 'std-2', namaKegiatan: 'Pramuka (Wajib)', predikat: 'Sangat Baik', keterangan: 'Disiplin dan memiliki jiwa kepemimpinan regu yang prima.' },
  { id: 'ek-4', studentId: 'std-2', namaKegiatan: 'Seni Tari Tradisional', predikat: 'Sangat Baik', keterangan: 'Mampu menampilkan tarian daerah dengan luwes dan kompak.' },
  { id: 'ek-5', studentId: 'std-3', namaKegiatan: 'Pramuka (Wajib)', predikat: 'Baik', keterangan: 'Aktif dan disiplin dalam setiap latihan pramuka.' },
  { id: 'ek-6', studentId: 'std-3', namaKegiatan: 'Futsal / Olahraga', predikat: 'Sangat Baik', keterangan: 'Menunjukkan kemampuan kerja sama tim dan teknik dasar futsal yang baik.' },
  { id: 'ek-7', studentId: 'std-4', namaKegiatan: 'Pramuka (Wajib)', predikat: 'Sangat Baik', keterangan: 'Bersemangat dan selalu berinisiatif dalam kegiatan kelompok.' },
  { id: 'ek-8', studentId: 'std-5', namaKegiatan: 'Pramuka (Wajib)', predikat: 'Baik', keterangan: 'Tertib dan selalu berpartisipasi dengan baik.' },
  { id: 'ek-9', studentId: 'std-6', namaKegiatan: 'Pramuka (Wajib)', predikat: 'Baik', keterangan: 'Menunjukkan sikap kerja sama dan kekompakan tim.' },
  { id: 'ek-10', studentId: 'std-7', namaKegiatan: 'Pramuka (Wajib)', predikat: 'Baik', keterangan: 'Disiplin dalam menghadiri jadwal kegiatan ekstrakurikuler.' },
  { id: 'ek-11', studentId: 'std-8', namaKegiatan: 'Pramuka (Wajib)', predikat: 'Baik', keterangan: 'Sopan dan aktif dalam kegiatan kepramukaan.' },
  { id: 'ek-12', studentId: 'std-9', namaKegiatan: 'Pramuka (Wajib)', predikat: 'Baik', keterangan: 'Mengikuti instruksi pembina dengan seksama.' },
  { id: 'ek-13', studentId: 'std-10', namaKegiatan: 'Pramuka (Wajib)', predikat: 'Sangat Baik', keterangan: 'Teliti dan bertanggung jawab terhadap perlengkapan regu.' },
  { id: 'ek-14', studentId: 'std-11', namaKegiatan: 'Pramuka (Wajib)', predikat: 'Sangat Baik', keterangan: 'Memiliki kecakapan morse dan navigasi dasar yang baik.' },
  { id: 'ek-15', studentId: 'std-12', namaKegiatan: 'Pramuka (Wajib)', predikat: 'Baik', keterangan: 'Rutin dan disiplin dalam berkegiatan.' },
];

export const initialP5Records: P5Record[] = initialStudents.map((std) => ({
  studentId: std.id,
  temaProjek: 'Gaya Hidup Berkelanjutan',
  judulProjek: 'Memilah Sampah Menjadi Berkah dan Pupuk Kompos Alami',
  deskripsiProjek: 'Projek penguatan profil pelajar pancasila yang melatih kesadaran menjaga kelestarian lingkungan sekolah dan mengolah sampah organik secara mandiri.',
  dimensi: {
    berimanBertakwa: 'BSH',
    kebinekaanGlobal: 'BSH',
    bergotongRoyong: 'SAB',
    mandiri: 'BSH',
    bernalarKritis: 'BSH',
    kreatif: 'SAB',
  },
  catatanProjek: `Ananda ${std.nama} sangat aktif bekerja sama dalam kelompok saat praktik pemilahan dan pembuatan pupuk kompos dari daun kering di taman sekolah.`,
}));

export const initialHomeroomNotes: HomeroomNote[] = initialStudents.map((std, i) => {
  const notes = [
    'Ananda memiliki semangat belajar dan budi pekerti yang sangat terpuji. Pertahankan prestasimu dan teruslah menjadi teladan!',
    'Prestasi ananda sangat membanggakan di semester ini. Tingkatkan terus literasi membaca dan kemampuan berhitung.',
    'Menunjukkan kemandirian belajar yang luar biasa. Tingkatkan keaktifan bertanya saat pembelajaran di kelas.',
    'Ananda sangat santun, ramah, dan disukai teman-temannya. Tetap fokus saat menyelesaikan tugas mandiri.',
  ];
  return {
    studentId: std.id,
    catatan: notes[i % notes.length],
    statusKenaikan: '-',
  };
});

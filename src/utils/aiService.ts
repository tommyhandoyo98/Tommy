/**
 * AI Service for communicating with backend Gemini API
 */

export interface GenerateNarrationParams {
  studentName: string;
  subjectName: string;
  phase: string;
  grade: string;
  finalScore: number;
  highestTP: string;
  lowestTP: string;
  kktpMin: number;
  tone?: 'resmi' | 'motivatif' | 'ringkas';
}

export interface NarrationResult {
  success: boolean;
  source: string;
  highestAchievement: string;
  lowestAchievement: string;
  fullDescription: string;
  warning?: string;
}

export async function requestAINarration(params: GenerateNarrationParams): Promise<NarrationResult> {
  try {
    const res = await fetch('/api/ai/generate-narration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.warn('AI narration request error, using client-side fallback:', error);
    // Intelligent fallback compliant with Kurikulum Merdeka
    const high = `Menunjukkan penguasaan yang sangat baik dalam ${params.highestTP || 'materi pokok'}.`;
    const low = params.lowestTP
      ? `Perlu bimbingan dan peningkatan dalam ${params.lowestTP}.`
      : `Perlu mempertahankan prestasi belajar.`;
    return {
      success: true,
      source: 'client-fallback',
      highestAchievement: high,
      lowestAchievement: low,
      fullDescription: `${high} ${low}`,
    };
  }
}

export interface ClassAnalysisParams {
  classStats: {
    totalStudents: number;
    classAverage: number;
    highestSubject: string;
    lowestSubject: string;
    topStudents: string[];
    needSupportStudents: string[];
  };
  phase: string;
}

export interface ClassAnalysisResult {
  success: boolean;
  source: string;
  summary: string;
  strengths: string[];
  challenges: string[];
  recommendations: string[];
}

export async function requestClassProgressAnalysis(params: ClassAnalysisParams): Promise<ClassAnalysisResult> {
  try {
    const res = await fetch('/api/ai/analyze-progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.warn('AI class analysis request error, using fallback:', error);
    return {
      success: true,
      source: 'client-fallback',
      summary: `Analisis Pembelajaran ${params.phase}: Secara umum mayoritas peserta didik telah mencapai Kriteria Ketercapaian Tujuan Pembelajaran (KKTP) dengan rata-rata kelas ${params.classStats.classAverage}.`,
      strengths: [
        `Partisipasi kelas aktif terutama pada mata pelajaran ${params.classStats.highestSubject}`,
        'Penguasaan kompetensi dasar pada sebagian besar Tujuan Pembelajaran sudah tuntas',
      ],
      challenges: [
        `Mata pelajaran ${params.classStats.lowestSubject} memerlukan pendekatan kontekstual dan jam remedial terstruktur`,
        'Beberapa siswa masih butuh bimbingan mandiri dalam literasi bacaan analitis',
      ],
      recommendations: [
        'Lakukan asesmen diagnostik berkala untuk mendeteksi kesulitan konsep sedini mungkin',
        'Terapkan pembelajaran berdiferensiasi konten dan proses sesuai minat murid',
        'Bangun komunikasi sinergis dengan orang tua terkait catatan capaian rapor siswa',
      ],
    };
  }
}

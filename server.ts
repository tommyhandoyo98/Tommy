import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Helper for fallback rule-based descriptions
function generateRuleBasedDescription(
  studentName: string,
  subjectName: string,
  highestTP: string,
  lowestTP: string,
  finalScore: number,
  kktpMin: number = 75
): { highestAchievement: string; lowestAchievement: string; fullDescription: string } {
  let highest = '';
  let lowest = '';

  if (finalScore >= 85) {
    highest = `Ananda ${studentName} menunjukkan penguasaan materi yang amat istimewa dan melampaui kriteria dalam hal ${highestTP.toLowerCase()}.`;
  } else if (finalScore >= kktpMin) {
    highest = `Ananda ${studentName} menunjukkan penguasaan yang sangat baik dan terampil dalam ${highestTP.toLowerCase()}.`;
  } else {
    highest = `Ananda ${studentName} mulai menunjukkan pemahaman dan usaha yang baik dalam hal ${highestTP.toLowerCase()}.`;
  }

  if (lowestTP && lowestTP.trim().length > 0) {
    if (finalScore >= 85) {
      lowest = `Perlu terus mempertahankan motivasi dan memperdalam pemahaman pada tujuan pembelajaran mengenai ${lowestTP.toLowerCase()}.`;
    } else if (finalScore >= kktpMin) {
      lowest = `Perlu bimbingan dan pembiasaan latihan secara mandiri untuk memantapkan pemahaman mengenai ${lowestTP.toLowerCase()}.`;
    } else {
      lowest = `Memerlukan pendampingan remedial dan perhatian khusus dari guru serta orang tua dalam ${lowestTP.toLowerCase()}.`;
    }
  } else {
    lowest = `Tidak ada catatan materi yang tertinggal. Tetap pertahankan prestasi belajar.`;
  }

  const fullDescription = `${highest} ${lowest}`;
  return { highestAchievement: highest, lowestAchievement: lowest, fullDescription };
}

// Endpoint: Generate Description with AI for Single Student Subject
app.post('/api/ai/generate-narration', async (req: Request, res: Response) => {
  try {
    const {
      studentName = 'Siswa',
      subjectName = 'Mata Pelajaran',
      phase = 'Fase C',
      grade = 'Kelas 5',
      finalScore = 80,
      highestTP = '',
      lowestTP = '',
      kktpMin = 75,
      tone = 'resmi', // 'resmi' | 'motivatif' | 'ringkas'
    } = req.body;

    // If Gemini client is not initialized, use rule-based fallback
    if (!ai) {
      const fallback = generateRuleBasedDescription(studentName, subjectName, highestTP || 'seluruh materi pokok', lowestTP || 'aspek pemahaman konsep lanjutan', finalScore, kktpMin);
      return res.json({
        success: true,
        source: 'rule-based',
        ...fallback,
      });
    }

    const systemPrompt = `Anda adalah asisten cerdas guru sekolah dasar (SD) di Indonesia yang menguasai pedoman resmi penilaian Kurikulum Merdeka Kemendikbudristek RI.
Tugas Anda adalah menyusun narasi Capaian Pembelajaran / Deskripsi Nilai Rapor siswa yang santun, objektif, bermakna, dan sesuai panduan resmi penilaian Kurikulum Merdeka untuk jenjang SD ${phase} (${grade}).

Format narasi Rapor Kurikulum Merdeka terbagi menjadi 2 elemen penting:
1. Capaian Tertinggi: Menjelaskan kemampuan yang telah dikuasai dengan sangat baik oleh siswa berdasarkan Tujuan Pembelajaran (TP).
2. Perlu Peningkatan: Menjelaskan kemampuan yang perlu bimbingan atau pendampingan lebih lanjut.

Nada bicara: ${
      tone === 'motivatif'
        ? 'Hangat, apresiatif, memotivasi, dan suportif bagi perkembangan anak'
        : tone === 'ringkas'
        ? 'Padat, tegas, to the point, dan lugas'
        : 'Formal, edukatif, profesional sesuai standar dokumen resmi rapor Kemendikbudristek'
    }.

Berikan jawaban HANYA dalam format JSON valid tanpa tanda markdown (tidak boleh ada \`\`\`json):
{
  "highestAchievement": "...",
  "lowestAchievement": "...",
  "fullDescription": "..."
}`;

    const userPrompt = `Nama Siswa: ${studentName}
Mata Pelajaran: ${subjectName}
Fase / Kelas: ${phase} / ${grade}
Nilai Akhir: ${finalScore} (KKTP Minimum: ${kktpMin})
Tujuan Pembelajaran yang Paling Dikuasai: ${highestTP || 'Materi inti dan pemahaman konsep dasar'}
Tujuan Pembelajaran yang Masih Perlu Peningkatan: ${lowestTP || 'Penerapan konsep dalam penyelesaian masalah konkret'}

Tolong susun narasi deskripsi capaian rapor Kurikulum Merdeka untuk siswa ini.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text || '';
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch {
      parsedData = generateRuleBasedDescription(studentName, subjectName, highestTP, lowestTP, finalScore, kktpMin);
    }

    return res.json({
      success: true,
      source: 'gemini-3.8-flash',
      highestAchievement: parsedData.highestAchievement || parsedData.capaianTertinggi || '',
      lowestAchievement: parsedData.lowestAchievement || parsedData.perluBimbingan || '',
      fullDescription: parsedData.fullDescription || `${parsedData.highestAchievement} ${parsedData.lowestAchievement}`,
    });
  } catch (error: any) {
    console.error('Error generating AI narration:', error);
    // Fallback gracefully on any API error
    const { studentName = 'Siswa', subjectName = 'Mata Pelajaran', highestTP = '', lowestTP = '', finalScore = 80, kktpMin = 75 } = req.body || {};
    const fallback = generateRuleBasedDescription(studentName, subjectName, highestTP || 'materi pokok', lowestTP || 'pemahaman lanjutan', finalScore, kktpMin);
    return res.json({
      success: true,
      source: 'fallback',
      ...fallback,
      warning: 'Menggunakan algoritma deskripsi Kurikulum Merdeka lokal.',
    });
  }
});

// Endpoint: AI Class Progress Analysis & Teacher Pedagogical Recommendations
app.post('/api/ai/analyze-progress', async (req: Request, res: Response) => {
  try {
    const { classStats, studentsSummary, subjectsSummary, phase = 'Fase C' } = req.body;

    if (!ai) {
      return res.json({
        success: true,
        source: 'rule-based',
        summary: `Analisis Pembelajaran ${phase}: Seluruh siswa menunjukkan tren perkembangan yang positif. Rekomendasi: Lakukan pengayaan pada siswa dengan nilai di atas 85 dan remedial kolaboratif untuk siswa yang belum tuntas KKTP.`,
        strengths: ['Tingkat partisipasi kelas aktif', 'Sebagian besar siswa melampaui KKTP standar'],
        challenges: ['Beberapa siswa memerlukan bimbingan pada mata pelajaran hitungan dan literasi mendalam'],
        recommendations: [
          'Terapkan pembelajaran berdiferensiasi (Differentiated Learning)',
          'Gunakan media visual dan kontekstual untuk materi yang sulit dipahami',
          'Libatkan peran aktif orang tua melalui komunikasi berkala catatan perkembangan rapor'
        ]
      });
    }

    const systemPrompt = `Anda adalah konsultan pedagogis kurikulum merdeka SD. Berikan analisis kemajuan belajar kelas secara mendalam, santun, dan aplikatif bagi guru kelas.`;
    const promptText = `Berikut adalah data ringkasan kelas:
Fase: ${phase}
Jumlah Siswa: ${classStats?.totalStudents || 12}
Rata-rata Nilai Kelas: ${classStats?.classAverage || 82}
Mapel dengan Nilai Tertinggi: ${classStats?.highestSubject || 'Pendidikan Pancasila'}
Mapel yang Perlu Perhatian: ${classStats?.lowestSubject || 'Matematika'}
Siswa Berprestasi Tinggi: ${JSON.stringify(classStats?.topStudents || [])}
Siswa Butuh Remedial / Pendampingan: ${JSON.stringify(classStats?.needSupportStudents || [])}

Tolong berikan analisis komprehensif dalam format JSON:
{
  "summary": "...",
  "strengths": ["...", "..."],
  "challenges": ["...", "..."],
  "recommendations": ["...", "...", "..."]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({
      success: true,
      source: 'gemini-3.8-flash',
      ...parsed,
    });
  } catch (error: any) {
    console.error('Error analyzing class progress:', error);
    return res.json({
      success: true,
      source: 'fallback',
      summary: 'Analisis kemajuan belajar menunjukkan stabilitas capaian kompetensi dasar.',
      strengths: ['Partisipasi siswa baik', 'Ketuntasan tujuan pembelajaran sesuai target'],
      challenges: ['Perlu pendalaman materi aplikatif'],
      recommendations: ['Tingkatkan kegiatan refleksi bersama siswa di akhir pembelajaran.'],
    });
  }
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    appName: 'Rapor Digital SD Kurikulum Merdeka',
    hasGeminiKey: Boolean(apiKey),
    timestamp: new Date().toISOString(),
  });
});

// Mount Vite or serve static files
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

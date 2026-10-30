import { KKTPConfig, SubjectGrade, LearningObjective, Student } from '../types';

export function getKKTPCategory(score: number, config: KKTPConfig): {
  label: 'Perlu Bimbingan' | 'Cukup' | 'Baik' | 'Sangat Baik';
  color: string;
  badgeBg: string;
} {
  if (score >= config.interval.sangatBaikMin) {
    return { label: 'Sangat Baik', color: 'text-emerald-700', badgeBg: 'bg-emerald-100 border-emerald-300' };
  }
  if (score > config.interval.cukupMax) {
    return { label: 'Baik', color: 'text-blue-700', badgeBg: 'bg-blue-100 border-blue-300' };
  }
  if (score > config.interval.perluBimbinganMax) {
    return { label: 'Cukup', color: 'text-amber-700', badgeBg: 'bg-amber-100 border-amber-300' };
  }
  return { label: 'Perlu Bimbingan', color: 'text-rose-700', badgeBg: 'bg-rose-100 border-rose-300' };
}

export function computeGradeForStudent(
  tpScores: Record<string, number>,
  nilaiSAS: number,
  config: KKTPConfig,
  allTPsForSubject: LearningObjective[],
  studentName: string
): Partial<SubjectGrade> {
  const scoreEntries = Object.entries(tpScores).filter(([_, sc]) => !isNaN(sc) && sc >= 0);
  const values = scoreEntries.map(([_, sc]) => sc);

  const avgMateri = values.length > 0
    ? Math.round(values.reduce((sum, v) => sum + v, 0) / values.length)
    : 0;

  // Weight calculation
  const bMateri = config.bobotNilai.sumatifLingkupMateri / 100;
  const bSAS = config.bobotNilai.sumatifAkhirSemester / 100;
  const bFormatif = config.bobotNilai.formatif / 100;
  // If formatif is configured together with materi, balance weights:
  const totalWeight = bMateri + bSAS + bFormatif;
  const normalizedMateri = (bMateri + bFormatif) / totalWeight;
  const normalizedSAS = bSAS / totalWeight;

  const nilaiAkhir = Math.round((avgMateri * normalizedMateri) + (nilaiSAS * normalizedSAS));

  // Determine highest and lowest TP
  let maxScore = -1;
  let minScore = 999;
  let highestTPId = '';
  let lowestTPId = '';

  scoreEntries.forEach(([tpId, score]) => {
    if (score > maxScore) {
      maxScore = score;
      highestTPId = tpId;
    }
    if (score < minScore) {
      minScore = score;
      lowestTPId = tpId;
    }
  });

  const highTP = allTPsForSubject.find((tp) => tp.id === highestTPId);
  const lowTP = allTPsForSubject.find((tp) => tp.id === lowestTPId);

  let highDesc = highTP
    ? `Menunjukkan penguasaan yang sangat baik dalam ${highTP.ringkasan}.`
    : `Menunjukkan penguasaan materi yang baik.`;

  let lowDesc = '';
  if (lowTP && lowTP.id !== highestTPId && minScore < config.kriteriaMinimal) {
    lowDesc = `Perlu bimbingan dan pendampingan remedial dalam ${lowTP.ringkasan}.`;
  } else if (lowTP && lowTP.id !== highestTPId && minScore < 85) {
    lowDesc = `Perlu meningkatkan pemahaman dan latihan mandiri dalam ${lowTP.ringkasan}.`;
  } else {
    lowDesc = `Perlu terus mempertahankan motivasi belajar dan capaian yang telah diraih.`;
  }

  const deskripsiAkhir = `${highDesc} ${lowDesc}`.trim();

  return {
    tpScores,
    nilaiSumatifMateri: avgMateri,
    nilaiSAS,
    nilaiAkhir,
    capaianTertinggiTPId: highestTPId,
    capaianTerendahTPId: lowestTPId,
    deskripsiCapaianTertinggi: highDesc,
    deskripsiCapaianTerendah: lowDesc,
    deskripsiAkhir,
  };
}

export interface StudentRankRecord {
  student: Student;
  totalScore: number;
  averageScore: number;
  rank: number;
  completedSubjects: number;
  belowKKTPCount: number;
}

export function computeClassLeger(
  students: Student[],
  grades: SubjectGrade[],
  kktpMin: number = 75
): StudentRankRecord[] {
  const records: StudentRankRecord[] = students.map((std) => {
    const studentGrades = grades.filter((g) => g.studentId === std.id);
    const validScores = studentGrades.map((g) => g.nilaiAkhir).filter((s) => s > 0);
    const totalScore = validScores.reduce((a, b) => a + b, 0);
    const averageScore = validScores.length > 0 ? Number((totalScore / validScores.length).toFixed(1)) : 0;
    const belowKKTPCount = validScores.filter((s) => s < kktpMin).length;

    return {
      student: std,
      totalScore,
      averageScore,
      rank: 1,
      completedSubjects: validScores.length,
      belowKKTPCount,
    };
  });

  // Sort descending by averageScore, then totalScore
  records.sort((a, b) => b.averageScore - a.averageScore || b.totalScore - a.totalScore);
  records.forEach((rec, index) => {
    rec.rank = index + 1;
  });

  return records;
}

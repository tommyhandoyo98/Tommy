import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
  FaseType,
  EncryptedVaultData,
} from '../types';
import {
  initialSchoolProfile,
  initialTeacherProfile,
  initialStudents,
  initialSubjects,
  initialLearningObjectives,
  initialLearningOutcomesCP,
  initialKKTPConfig,
  generateInitialGrades,
  initialAttendances,
  initialExtracurriculars,
  initialP5Records,
  initialHomeroomNotes,
} from '../data/initialData';
import { computeGradeForStudent } from '../utils/calculations';
import { requestAINarration } from '../utils/aiService';
import { exportEncryptedFile, simpleDecrypt } from '../utils/crypto';

interface NotificationToast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface RaporContextType {
  school: SchoolProfile;
  setSchool: React.Dispatch<React.SetStateAction<SchoolProfile>>;
  teacher: TeacherProfile;
  setTeacher: React.Dispatch<React.SetStateAction<TeacherProfile>>;
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  subjects: Subject[];
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
  learningObjectives: LearningObjective[];
  setLearningObjectives: React.Dispatch<React.SetStateAction<LearningObjective[]>>;
  learningOutcomes: LearningOutcomeCP[];
  setLearningOutcomes: React.Dispatch<React.SetStateAction<LearningOutcomeCP[]>>;
  kktpConfig: KKTPConfig;
  setKktpConfig: React.Dispatch<React.SetStateAction<KKTPConfig>>;
  grades: SubjectGrade[];
  setGrades: React.Dispatch<React.SetStateAction<SubjectGrade[]>>;
  attendances: AttendanceRecord[];
  setAttendances: React.Dispatch<React.SetStateAction<AttendanceRecord[]>>;
  extracurriculars: ExtracurricularRecord[];
  setExtracurriculars: React.Dispatch<React.SetStateAction<ExtracurricularRecord[]>>;
  p5Records: P5Record[];
  setP5Records: React.Dispatch<React.SetStateAction<P5Record[]>>;
  homeroomNotes: HomeroomNote[];
  setHomeroomNotes: React.Dispatch<React.SetStateAction<HomeroomNote[]>>;

  // Navigation & selection
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedFase: FaseType;
  setSelectedFase: (fase: FaseType) => void;
  selectedStudentId: string;
  setSelectedStudentId: (id: string) => void;
  selectedSubjectId: string;
  setSelectedSubjectId: (id: string) => void;

  // Grade operations
  updateStudentGrade: (studentId: string, subjectId: string, tpScores: Record<string, number>, nilaiSAS: number) => void;
  quickFillRealisticGrades: (subjectId: string) => void;
  generateAIDescriptionForStudent: (studentId: string, subjectId: string, tone?: 'resmi' | 'motivatif' | 'ringkas') => Promise<void>;
  generateAIDescriptionsForWholeClass: (subjectId: string, tone?: 'resmi' | 'motivatif' | 'ringkas') => Promise<void>;
  updateGradeDescriptionsManually: (studentId: string, subjectId: string, highestDesc: string, lowestDesc: string) => void;

  // Attendance & Extracurriculars
  updateAttendance: (studentId: string, field: 'sakit' | 'izin' | 'tanpaKeterangan', val: number) => void;
  updateHomeroomNote: (studentId: string, note: string, statusKenaikan?: string) => void;

  // Backup & Restore
  exportEncryptedVault: (passcode: string) => void;
  importEncryptedVault: (fileContent: string, passcode: string) => boolean;
  resetAllToDefault: () => void;

  // Toast
  toasts: NotificationToast[];
  addToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const RaporContext = createContext<RaporContextType | undefined>(undefined);

const STORAGE_KEY = 'erapor_sd_merdeka_v1';

export const RaporProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load from LocalStorage or seed with initial data
  const [school, setSchool] = useState<SchoolProfile>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_school`);
      return saved ? JSON.parse(saved) : initialSchoolProfile;
    } catch {
      return initialSchoolProfile;
    }
  });

  const [teacher, setTeacher] = useState<TeacherProfile>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_teacher`);
      return saved ? JSON.parse(saved) : initialTeacherProfile;
    } catch {
      return initialTeacherProfile;
    }
  });

  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_students`);
      return saved ? JSON.parse(saved) : initialStudents;
    } catch {
      return initialStudents;
    }
  });

  const [subjects, setSubjects] = useState<Subject[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_subjects`);
      return saved ? JSON.parse(saved) : initialSubjects;
    } catch {
      return initialSubjects;
    }
  });

  const [learningObjectives, setLearningObjectives] = useState<LearningObjective[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_tps`);
      return saved ? JSON.parse(saved) : initialLearningObjectives;
    } catch {
      return initialLearningObjectives;
    }
  });

  const [learningOutcomes, setLearningOutcomes] = useState<LearningOutcomeCP[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_cps`);
      return saved ? JSON.parse(saved) : initialLearningOutcomesCP;
    } catch {
      return initialLearningOutcomesCP;
    }
  });

  const [kktpConfig, setKktpConfig] = useState<KKTPConfig>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_kktp`);
      return saved ? JSON.parse(saved) : initialKKTPConfig;
    } catch {
      return initialKKTPConfig;
    }
  });

  const [grades, setGrades] = useState<SubjectGrade[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_grades`);
      return saved ? JSON.parse(saved) : generateInitialGrades(initialStudents, initialSubjects, initialLearningObjectives);
    } catch {
      return generateInitialGrades(initialStudents, initialSubjects, initialLearningObjectives);
    }
  });

  const [attendances, setAttendances] = useState<AttendanceRecord[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_attendances`);
      return saved ? JSON.parse(saved) : initialAttendances;
    } catch {
      return initialAttendances;
    }
  });

  const [extracurriculars, setExtracurriculars] = useState<ExtracurricularRecord[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_extra`);
      return saved ? JSON.parse(saved) : initialExtracurriculars;
    } catch {
      return initialExtracurriculars;
    }
  });

  const [p5Records, setP5Records] = useState<P5Record[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_p5`);
      return saved ? JSON.parse(saved) : initialP5Records;
    } catch {
      return initialP5Records;
    }
  });

  const [homeroomNotes, setHomeroomNotes] = useState<HomeroomNote[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_notes`);
      return saved ? JSON.parse(saved) : initialHomeroomNotes;
    } catch {
      return initialHomeroomNotes;
    }
  });

  // UI state
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedFase, setSelectedFase] = useState<FaseType>(teacher.fase || 'Fase C');
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || 'std-1');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0]?.id || 'mapel-1');
  const [toasts, setToasts] = useState<NotificationToast[]>([]);

  const addToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_school`, JSON.stringify(school));
      localStorage.setItem(`${STORAGE_KEY}_teacher`, JSON.stringify(teacher));
      localStorage.setItem(`${STORAGE_KEY}_students`, JSON.stringify(students));
      localStorage.setItem(`${STORAGE_KEY}_subjects`, JSON.stringify(subjects));
      localStorage.setItem(`${STORAGE_KEY}_tps`, JSON.stringify(learningObjectives));
      localStorage.setItem(`${STORAGE_KEY}_cps`, JSON.stringify(learningOutcomes));
      localStorage.setItem(`${STORAGE_KEY}_kktp`, JSON.stringify(kktpConfig));
      localStorage.setItem(`${STORAGE_KEY}_grades`, JSON.stringify(grades));
      localStorage.setItem(`${STORAGE_KEY}_attendances`, JSON.stringify(attendances));
      localStorage.setItem(`${STORAGE_KEY}_extra`, JSON.stringify(extracurriculars));
      localStorage.setItem(`${STORAGE_KEY}_p5`, JSON.stringify(p5Records));
      localStorage.setItem(`${STORAGE_KEY}_notes`, JSON.stringify(homeroomNotes));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }, [
    school,
    teacher,
    students,
    subjects,
    learningObjectives,
    learningOutcomes,
    kktpConfig,
    grades,
    attendances,
    extracurriculars,
    p5Records,
    homeroomNotes,
  ]);

  // Update grade for a student in a subject
  const updateStudentGrade = (
    studentId: string,
    subjectId: string,
    tpScores: Record<string, number>,
    nilaiSAS: number
  ) => {
    const student = students.find((s) => s.id === studentId);
    const subTPs = learningObjectives.filter((tp) => tp.subjectId === subjectId && tp.aktif);

    const computed = computeGradeForStudent(
      tpScores,
      nilaiSAS,
      kktpConfig,
      subTPs,
      student?.nama || 'Siswa'
    );

    setGrades((prev) => {
      const idx = prev.findIndex((g) => g.studentId === studentId && g.subjectId === subjectId);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          ...computed,
        } as SubjectGrade;
        return updated;
      } else {
        return [
          ...prev,
          {
            studentId,
            subjectId,
            tpScores,
            nilaiSumatifMateri: computed.nilaiSumatifMateri || 0,
            nilaiSAS: computed.nilaiSAS || 0,
            nilaiAkhir: computed.nilaiAkhir || 0,
            capaianTertinggiTPId: computed.capaianTertinggiTPId,
            capaianTerendahTPId: computed.capaianTerendahTPId,
            deskripsiCapaianTertinggi: computed.deskripsiCapaianTertinggi || '',
            deskripsiCapaianTerendah: computed.deskripsiCapaianTerendah || '',
            deskripsiAkhir: computed.deskripsiAkhir || '',
            isAiGenerated: false,
          },
        ];
      }
    });
  };

  // Quick fill realistic grades for a subject
  const quickFillRealisticGrades = (subjectId: string) => {
    const subTPs = learningObjectives.filter((tp) => tp.subjectId === subjectId && tp.aktif);
    const subj = subjects.find((s) => s.id === subjectId);

    setGrades((prev) => {
      const newGrades = [...prev];
      students.forEach((std, i) => {
        const tpScores: Record<string, number> = {};
        const base = Math.min(96, Math.max(72, 80 + (i % 3 === 0 ? 6 : i % 2 === 0 ? 3 : -1)));

        subTPs.forEach((tp, tpIdx) => {
          tpScores[tp.id] = Math.min(98, Math.max(70, base + (tpIdx % 2 === 0 ? 4 : -3)));
        });

        const sas = Math.min(98, Math.max(70, base + (i % 2 === 0 ? 2 : -2)));
        const computed = computeGradeForStudent(tpScores, sas, kktpConfig, subTPs, std.nama);

        const idx = newGrades.findIndex((g) => g.studentId === std.id && g.subjectId === subjectId);
        if (idx >= 0) {
          newGrades[idx] = {
            ...newGrades[idx],
            ...computed,
          } as SubjectGrade;
        } else {
          newGrades.push({
            studentId: std.id,
            subjectId,
            tpScores,
            nilaiSumatifMateri: computed.nilaiSumatifMateri || 0,
            nilaiSAS: sas,
            nilaiAkhir: computed.nilaiAkhir || 0,
            capaianTertinggiTPId: computed.capaianTertinggiTPId,
            capaianTerendahTPId: computed.capaianTerendahTPId,
            deskripsiCapaianTertinggi: computed.deskripsiCapaianTertinggi || '',
            deskripsiCapaianTerendah: computed.deskripsiCapaianTerendah || '',
            deskripsiAkhir: computed.deskripsiAkhir || '',
            isAiGenerated: false,
          });
        }
      });
      return newGrades;
    });

    addToast(`Nilai simulasi realistis untuk ${subj?.nama || 'mata pelajaran'} berhasil digenerate!`, 'success');
  };

  // Generate AI Description for Single Student Subject
  const generateAIDescriptionForStudent = async (
    studentId: string,
    subjectId: string,
    tone: 'resmi' | 'motivatif' | 'ringkas' = 'resmi'
  ) => {
    const student = students.find((s) => s.id === studentId);
    const subject = subjects.find((s) => s.id === subjectId);
    const gradeRec = grades.find((g) => g.studentId === studentId && g.subjectId === subjectId);
    const subTPs = learningObjectives.filter((tp) => tp.subjectId === subjectId && tp.aktif);

    if (!student || !subject || !gradeRec) {
      addToast('Data nilai siswa belum diinput lengkap.', 'warning');
      return;
    }

    const highTP = subTPs.find((tp) => tp.id === gradeRec.capaianTertinggiTPId);
    const lowTP = subTPs.find((tp) => tp.id === gradeRec.capaianTerendahTPId);

    try {
      const res = await requestAINarration({
        studentName: student.nama,
        subjectName: subject.nama,
        phase: selectedFase,
        grade: teacher.kelas,
        finalScore: gradeRec.nilaiAkhir,
        highestTP: highTP?.ringkasan || highTP?.deskripsi || 'materi pokok semester',
        lowestTP: lowTP && lowTP.id !== highTP?.id ? (lowTP?.ringkasan || lowTP?.deskripsi) : '',
        kktpMin: subject.kktp || kktpConfig.kriteriaMinimal,
        tone,
      });

      setGrades((prev) => {
        return prev.map((g) => {
          if (g.studentId === studentId && g.subjectId === subjectId) {
            return {
              ...g,
              deskripsiCapaianTertinggi: res.highestAchievement,
              deskripsiCapaianTerendah: res.lowestAchievement,
              deskripsiAkhir: res.fullDescription,
              isAiGenerated: true,
            };
          }
          return g;
        });
      });

      addToast(`Narasi AI untuk ${student.nama} (${subject.kode}) berhasil disusun!`, 'success');
    } catch {
      addToast('Terjadi kendala saat menyusun narasi AI.', 'error');
    }
  };

  // Generate AI Descriptions for the Whole Class in a Subject
  const generateAIDescriptionsForWholeClass = async (
    subjectId: string,
    tone: 'resmi' | 'motivatif' | 'ringkas' = 'resmi'
  ) => {
    const subject = subjects.find((s) => s.id === subjectId);
    const subTPs = learningObjectives.filter((tp) => tp.subjectId === subjectId && tp.aktif);

    addToast(`Menyusun narasi AI untuk seluruh kelas pada mapel ${subject?.nama}...`, 'info');

    // Run parallel or batch
    const promises = students.map(async (student) => {
      const gradeRec = grades.find((g) => g.studentId === student.id && g.subjectId === subjectId);
      if (!gradeRec) return null;

      const highTP = subTPs.find((tp) => tp.id === gradeRec.capaianTertinggiTPId);
      const lowTP = subTPs.find((tp) => tp.id === gradeRec.capaianTerendahTPId);

      const res = await requestAINarration({
        studentName: student.nama,
        subjectName: subject?.nama || 'Mata Pelajaran',
        phase: selectedFase,
        grade: teacher.kelas,
        finalScore: gradeRec.nilaiAkhir,
        highestTP: highTP?.ringkasan || highTP?.deskripsi || 'materi pokok',
        lowestTP: lowTP && lowTP.id !== highTP?.id ? (lowTP?.ringkasan || lowTP?.deskripsi) : '',
        kktpMin: subject?.kktp || kktpConfig.kriteriaMinimal,
        tone,
      });

      return {
        studentId: student.id,
        highestAchievement: res.highestAchievement,
        lowestAchievement: res.lowestAchievement,
        fullDescription: res.fullDescription,
      };
    });

    const results = await Promise.all(promises);

    setGrades((prev) => {
      return prev.map((g) => {
        if (g.subjectId === subjectId) {
          const match = results.find((r) => r?.studentId === g.studentId);
          if (match) {
            return {
              ...g,
              deskripsiCapaianTertinggi: match.highestAchievement,
              deskripsiCapaianTerendah: match.lowestAchievement,
              deskripsiAkhir: match.fullDescription,
              isAiGenerated: true,
            };
          }
        }
        return g;
      });
    });

    addToast(`Narasi AI untuk 1 kelas (${subject?.nama}) selesai dibuat!`, 'success');
  };

  // Update descriptions manually
  const updateGradeDescriptionsManually = (
    studentId: string,
    subjectId: string,
    highestDesc: string,
    lowestDesc: string
  ) => {
    setGrades((prev) =>
      prev.map((g) => {
        if (g.studentId === studentId && g.subjectId === subjectId) {
          return {
            ...g,
            deskripsiCapaianTertinggi: highestDesc,
            deskripsiCapaianTerendah: lowestDesc,
            deskripsiAkhir: `${highestDesc} ${lowestDesc}`.trim(),
            isAiGenerated: false,
          };
        }
        return g;
      })
    );
    addToast('Perubahan deskripsi berhasil disimpan.', 'success');
  };

  // Update attendance
  const updateAttendance = (studentId: string, field: 'sakit' | 'izin' | 'tanpaKeterangan', val: number) => {
    setAttendances((prev) => {
      const idx = prev.findIndex((a) => a.studentId === studentId);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], [field]: Math.max(0, val) };
        return updated;
      } else {
        return [...prev, { studentId, sakit: 0, izin: 0, tanpaKeterangan: 0, [field]: Math.max(0, val) }];
      }
    });
  };

  // Update homeroom note
  const updateHomeroomNote = (studentId: string, note: string, statusKenaikan?: string) => {
    setHomeroomNotes((prev) => {
      const idx = prev.findIndex((h) => h.studentId === studentId);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          catatan: note,
          statusKenaikan: (statusKenaikan as any) || updated[idx].statusKenaikan,
        };
        return updated;
      } else {
        return [...prev, { studentId, catatan: note, statusKenaikan: (statusKenaikan as any) || '-' }];
      }
    });
  };

  // Export encrypted backup
  const exportEncryptedVault = (passcode: string) => {
    const vaultData: EncryptedVaultData = {
      version: '2025.1-merdeka',
      exportedAt: new Date().toISOString(),
      school,
      teacher,
      students,
      subjects,
      learningObjectives,
      learningOutcomes,
      kktpConfig,
      grades,
      attendances,
      extracurriculars,
      p5Records,
      homeroomNotes,
    };

    exportEncryptedFile(vaultData, `E-RAPOR_${school.namaSekolah.replace(/\s+/g, '_')}`, passcode);
    addToast('Cadangan data terenkripsi berhasil diunduh dengan aman.', 'success');
  };

  // Import encrypted backup
  const importEncryptedVault = (fileContent: string, passcode: string): boolean => {
    try {
      const decrypted = simpleDecrypt(fileContent.trim(), passcode);
      const parsed: EncryptedVaultData = JSON.parse(decrypted);

      if (parsed.school && parsed.students && parsed.grades) {
        setSchool(parsed.school);
        setTeacher(parsed.teacher || initialTeacherProfile);
        setStudents(parsed.students);
        setSubjects(parsed.subjects || initialSubjects);
        setLearningObjectives(parsed.learningObjectives || initialLearningObjectives);
        setLearningOutcomes(parsed.learningOutcomes || initialLearningOutcomesCP);
        setKktpConfig(parsed.kktpConfig || initialKKTPConfig);
        setGrades(parsed.grades);
        setAttendances(parsed.attendances || initialAttendances);
        setExtracurriculars(parsed.extracurriculars || initialExtracurriculars);
        setP5Records(parsed.p5Records || initialP5Records);
        setHomeroomNotes(parsed.homeroomNotes || initialHomeroomNotes);

        addToast('Data e-Rapor berhasil dipulihkan dari cadangan terenkripsi!', 'success');
        return true;
      } else {
        throw new Error('Format data tidak valid');
      }
    } catch (err: any) {
      addToast(err.message || 'Gagal mendekripsi file cadangan. Periksa kode sandi.', 'error');
      return false;
    }
  };

  // Reset all to default
  const resetAllToDefault = () => {
    setSchool(initialSchoolProfile);
    setTeacher(initialTeacherProfile);
    setStudents(initialStudents);
    setSubjects(initialSubjects);
    setLearningObjectives(initialLearningObjectives);
    setLearningOutcomes(initialLearningOutcomesCP);
    setKktpConfig(initialKKTPConfig);
    setGrades(generateInitialGrades(initialStudents, initialSubjects, initialLearningObjectives));
    setAttendances(initialAttendances);
    setExtracurriculars(initialExtracurriculars);
    setP5Records(initialP5Records);
    setHomeroomNotes(initialHomeroomNotes);
    localStorage.clear();
    addToast('Data telah direset kembali ke standar awal SD Negeri 4 Palangga Selatan.', 'info');
  };

  return (
    <RaporContext.Provider
      value={{
        school,
        setSchool,
        teacher,
        setTeacher,
        students,
        setStudents,
        subjects,
        setSubjects,
        learningObjectives,
        setLearningObjectives,
        learningOutcomes,
        setLearningOutcomes,
        kktpConfig,
        setKktpConfig,
        grades,
        setGrades,
        attendances,
        setAttendances,
        extracurriculars,
        setExtracurriculars,
        p5Records,
        setP5Records,
        homeroomNotes,
        setHomeroomNotes,
        activeTab,
        setActiveTab,
        selectedFase,
        setSelectedFase,
        selectedStudentId,
        setSelectedStudentId,
        selectedSubjectId,
        setSelectedSubjectId,
        updateStudentGrade,
        quickFillRealisticGrades,
        generateAIDescriptionForStudent,
        generateAIDescriptionsForWholeClass,
        updateGradeDescriptionsManually,
        updateAttendance,
        updateHomeroomNote,
        exportEncryptedVault,
        importEncryptedVault,
        resetAllToDefault,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </RaporContext.Provider>
  );
};

export const useRapor = () => {
  const context = useContext(RaporContext);
  if (!context) {
    throw new Error('useRapor must be used within a RaporProvider');
  }
  return context;
};

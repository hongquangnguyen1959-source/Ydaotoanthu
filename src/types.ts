export interface PatientInfo {
  name: string;
  age: number | string;
  gender: 'Nam' | 'Nữ' | 'Khác';
  occupation?: string;
  contact?: string;
}

export interface Vitals {
  bloodPressure: string; // e.g. 135/85
  heartRate: string;     // e.g. 78
  temperature: string;   // e.g. 36.8
  spO2: string;          // e.g. 98
  bloodGlucose: string;  // e.g. 5.8
}

export interface Symptoms {
  mainComplaint: string;
  onset: string;
  painCharacteristics: string;
  painScale: number; // 1-10 VAS
  pastMedicalHistory: string;
}

export interface FourExaminations {
  vong: string; // Looking / Inspection
  tongue: string; // Thiệt chẩn
  van: string;  // Listening & Smelling
  van_ask: string; // Ten Questions
  thiet: string; // Pulse & Palpation
}

export interface DiagnosisResult {
  summary: string;
  westernAssessment: {
    provisionalDiagnosis: string;
    icd10: string;
    differentialDiagnoses: string[];
    guytonMechanism: string;
    investigationsNeeded: string[];
    redFlags: string[];
  };
  easternAssessment: {
    syndromePattern: string;
    batCuong: string;
    tangPhu: string;
    khiHuyet: string;
    thietChanAnalysis: string;
  };
  integratedTreatmentPlan: {
    phapTri: string;
    herbalPrescription: {
      formulaName: string;
      composition: {
        herb: string;
        grams: number;
        role: 'Quân' | 'Thần' | 'Tá' | 'Sứ';
        purpose: string;
      }[];
      decoctionGuide: string;
      modifications: string[];
    };
    acupuncturePrescription: {
      classicPoints: {
        point: string;
        location: string;
        technique: string;
        purpose: string;
      }[];
      tungPoints: {
        point: string;
        code: string;
        dongQiInstructions: string;
        purpose: string;
      }[];
      nguyenTaiThuGuidance: string;
      westernNeuroscience: string;
    };
    clinicalNutrition: {
      dietaryTherapy: string;
      foodsToEat: string[];
      foodsToAvoid: string[];
      drugNutrientInteractions: string[];
    };
    qigongAndLifestyle: string;
    westernPrescription?: {
      protocolName: string;
      sourceGuidelines: string[];
      medications: {
        drugName: string;
        activeIngredient: string;
        group: string;
        dosage: string;
        timing: string;
        mechanism: string;
        contraindications: string;
      }[];
      clinicalCautions: string[];
      monitoringParameters: string[];
    };
  };
  referencedBooks: string[];
}

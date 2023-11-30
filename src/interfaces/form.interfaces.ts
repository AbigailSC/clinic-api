export interface FormType {
  personalInfo: PersonalInfoType;
  medicalHistory: MedicalHistoryType;
  specialCare: string;
}

export interface PersonalInfoType {
  name: string;
  lastname: string;
  birthdate: string;
  document: string;
  gender: Gender;
  phone: string;
  email: string;
  address: string;
}

export interface MedicalHistoryType {
  previousIllnesses: PreviousIllnesses;
  currentMedications: string;
  allergies: Allergies;
  previousSurgicalInterventions: string;
}

interface PreviousIllnesses {
  diabetes: boolean;
  hypertension: boolean;
  highCholesterol: boolean;
  heartDisease: boolean;
  asthma: boolean;
  hepatitis: boolean;
  cancer: boolean;
  other: boolean;
}

interface Allergies {
  allergyPenicillin: boolean;
  allergyLatex: boolean;
  allergyAntiInflamatory: boolean;
  other: boolean;
}

enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

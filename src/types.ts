export type Language = 'pt' | 'en';

export interface SectorItem {
  id: string;
  number: string;
  title: string;
  category: string;
  badge: string;
  badgeColor: 'cyan' | 'amber';
  description: string;
  bulletPoints: string[];
  imageUrl: string;
  altText: string;
  availability: string;
}

export interface JobVacancy {
  id: string;
  title: string;
  department: string;
  location: string;
  contractType: string;
  status: 'Ativa' | 'Active';
  icon: string;
  accentColor: 'cyan' | 'amber';
}

export interface OperationalHub {
  id: string;
  name: string;
  role: string;
  coordinates: string;
  activeSpecialists: number;
  projectsCount: number;
  highlight: string;
}

export interface ApplicationFormData {
  fullName: string;
  phone: string;
  email: string;
  primaryArea: string;
  experience: string;
  cvFileName: string | null;
  gdprAccepted: boolean;
}

export interface B2BProposalData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  sector: string;
  specialistsNeeded: string;
  deploymentLocation: string;
  message: string;
}

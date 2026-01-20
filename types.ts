export type Language = 'en' | 'zh';

export interface LocalizedString {
  en: string;
  zh: string;
}

export interface Service {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  icon: string;
  priceStart: string;
}

export interface Doctor {
  id: string;
  name: LocalizedString;
  title: LocalizedString;
  specialty: LocalizedString;
  image: string;
  experience: LocalizedString;
  bio: LocalizedString;
  education: LocalizedString;
}

export interface Testimonial {
  id: string;
  name: LocalizedString;
  comment: LocalizedString;
  rating: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
}

export interface Appointment {
  id: string;
  name: string;
  phone: string;
  date: string;
  service: string;
  doctor: string;
  notes: string;
  status: 'pending' | 'contacted';
  createdAt: string;
}

export enum AppointmentStatus {
  IDLE = 'IDLE',
  SUBMITTING = 'SUBMITTING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
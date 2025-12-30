
export type CancerType = 'AML' | 'ALL' | 'APL' | 'CML';

export interface PatientData {
  age: number;
  weight: number;
  height: number;
  wbcCount: number;
  diagnosis: CancerType;
  geneticMarkers: string[];
  mrdStatus?: string;
}

export interface RiskCategory {
  level: 'Low' | 'Intermediate' | 'High' | 'Very High' | 'Favorable' | 'Adverse' | 'None';
  description: string;
  recommendedProtocol: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

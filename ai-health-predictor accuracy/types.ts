export enum Disease {
  INFO = 'Disease Information',
  HEART = 'Heart Disease',
  LIVER = 'Liver Disease',
  DIABETES = 'Diabetes',
  HISTORY = 'Prediction History',
}

export interface PredictionResult {
  prediction: string;
  probability: number;
  accuracy: number;
  explanation: string;
  recurrenceRisk: 'Low' | 'Medium' | 'High';
  preventiveAdvice: string;
}

export interface PredictionHistoryItem {
  id: string;
  disease: Disease;
  params: Record<string, string>;
  result: PredictionResult;
  timestamp: string;
}
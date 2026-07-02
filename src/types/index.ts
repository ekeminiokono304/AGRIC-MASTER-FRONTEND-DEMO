export interface PredictionResponse {
  prediction: string;
  reasoning: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  module: 'yield' | 'disease' | 'price' | 'livestock' | 'drought';
  inputs: Record<string, string | number>;
  result: PredictionResponse;
}

export interface APIError {
  message: string;
  isTimeout?: boolean;
}

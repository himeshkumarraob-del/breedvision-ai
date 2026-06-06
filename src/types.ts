export interface BreedStandards {
  avgWeight: number; // in kg
  annualYield: number; // in liters
  heatTolerance: string;
  diseaseResistance: string;
  fatContent: string;
  maturityAge: number; // in months
}

export interface BreedMetricsList {
  yield: number;
  fertility: number;
  weight: number;
  longevity: number;
  resistance: number;
  fat: number;
  [key: string]: number;
}

export interface Breed {
  id: string;
  name: string;
  type: "cow" | "buffalo";
  origin: string;
  utility: string;
  conservationStatus: string;
  geneticStrength: string;
  confidence: number;
  bodyConditionScore: string;
  description: string;
  fullImage: string;
  standards: BreedStandards;
  metricsList: BreedMetricsList;
}

export interface ScanResult {
  id: string;
  timestamp: string;
  breedId: string;
  breedName: string;
  confidence: number;
  imageUrl: string;
  origin: string;
  utility: string;
  conservationStatus: string;
  geneticStrength: string;
  bodyConditionScore: string;
  notes: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: string;
}

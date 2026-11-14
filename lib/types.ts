export interface Question {
  id: string;
  question: string;
  hint?: string;
}

export interface Part {
  id: string;
  name: string;
  quantity: number;
  supplier: string;
  link: string;
  price: number;
  notes: string;
}

export interface Design {
  id: string;
  projectName: string;
  description: string;
  parts: Part[];
  openScadCode: string;
  wiringPlan: string;
  wiringCode?: string;
  assemblySteps: string[];
  generatedAt: string;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

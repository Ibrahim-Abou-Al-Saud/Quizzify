export interface Test {
  id?: number;
  title: string;
  duration: number;
  description: string;
}

export interface TestResult {
  id?: number;
  userName?: string;
  testName: string;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
}

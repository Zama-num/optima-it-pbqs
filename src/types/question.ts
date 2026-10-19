export type QuestionType =
  | "multiple_choice"
  | "multi_select"
  | "scenario"
  | "drag_drop"
  | "terminal";

export interface Question {
  id: string;
  objective: string;
  domain: string;
  difficulty: string;
  type: QuestionType;
  question: string;
  answers: string[];
  correctAnswer: string | string[];
  explanation: string;
}

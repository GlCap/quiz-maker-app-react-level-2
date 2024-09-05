export interface QuizInfo {
  categoryId: string;
  difficulty: string;
}

export interface QuestionInfoQuiz {
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
}

export type QuizResultDict = Record<string, string>;

export interface QuizState {
  results: QuizResultDict;
  questionsInfo: QuestionInfoQuiz[];
}

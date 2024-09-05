import { useMemo, useState } from "react";
import { useQuestions } from "../api/questions";
import { decodeHtml } from "../utils";
import { QuestionAnswersContainer } from "./QuestionAnswersContainer";
import type { QuizState, QuizInfo, QuizResultDict } from "../types";

export interface QuizSelectorProps {
  quizInfo: QuizInfo;
  onSubmit: (data: QuizState) => void;
}

export const QuestionsSelector = (props: QuizSelectorProps) => {
  const { quizInfo, onSubmit } = props;
  const [selectedAnswersDict, setSelectedAnswersDict] =
    useState<QuizResultDict>({});

  const [questionsInfo, questionsLoading, questionsError] = useQuestions(
    quizInfo.categoryId,
    quizInfo.difficulty
  );

  const questionsInfoForQuiz = useMemo(
    () =>
      questionsInfo.map((questionInfo) => ({
        question: decodeHtml(questionInfo.question),
        correctAnswer: decodeHtml(questionInfo.correct_answer),
        incorrectAnswers: questionInfo.incorrect_answers.map((answer) =>
          decodeHtml(answer)
        ),
      })),
    [questionsInfo]
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    onSubmit({
      results: selectedAnswersDict,
      questionsInfo: questionsInfoForQuiz,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {questionsLoading ? (
        <p>Loading...</p>
      ) : (
        questionsInfoForQuiz.map((questionInfo) => (
          <QuestionAnswersContainer
            key={questionInfo.question.replace(" ", "_")}
            question={questionInfo.question}
            correctAnswer={questionInfo.correctAnswer || ""}
            incorrectAnswers={questionInfo.incorrectAnswers || []}
            selectedAnswer={selectedAnswersDict?.[questionInfo.question] || ""}
            handleSelect={(answer) => {
              setSelectedAnswersDict((prev) => ({
                ...prev,
                [questionInfo.question]: answer,
              }));
            }}
          />
        ))
      )}
      {questionsError && <strong>{questionsError.message}</strong>}

      <button type="submit">Submit</button>
    </form>
  );
};

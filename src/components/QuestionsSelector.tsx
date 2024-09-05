import "./QuestionsSelector.css";
import { useEffect, useMemo, useState } from "react";
import { useQuestions } from "../api/questions";
import { decodeHtml, randomizeArray } from "../utils";
import { QuestionAnswersContainer } from "./QuestionAnswersContainer";
import type {
  QuizState,
  QuizInfo,
  QuizResultDict,
  QuestionInfoQuiz,
} from "../types";

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

  const questionsInfoForQuiz: QuestionInfoQuiz[] = useMemo(
    () =>
      questionsInfo.map((questionInfo) => {
        const correctAnswer = decodeHtml(questionInfo.correct_answer);

        const answers = randomizeArray([
          correctAnswer,
          ...questionInfo.incorrect_answers.map((answer) => decodeHtml(answer)),
        ]);

        return {
          answers,
          question: decodeHtml(questionInfo.question),
          correctAnswer: correctAnswer,
        };
      }),
    [questionsInfo]
  );

  const questionsCount = useMemo(
    () => questionsInfoForQuiz.length,
    [questionsInfoForQuiz]
  );

  const selectedQuestions = useMemo(
    () => Object.keys(selectedAnswersDict).length,
    [selectedAnswersDict]
  );

  const isReady = useMemo(
    () => questionsCount === selectedQuestions,
    [questionsCount, selectedQuestions]
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!isReady) {
      alert("Please answer all questions before submitting.");
      return;
    }

    onSubmit({
      results: selectedAnswersDict,
      questionsInfo: questionsInfoForQuiz,
    });
  };

  useEffect(() => {
    // Reset selected answers when quiz info changes
    setSelectedAnswersDict({});
  }, [quizInfo]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="questions-container">
        {questionsLoading ? (
          <p>Loading...</p>
        ) : (
          questionsInfoForQuiz.map((questionInfo) => (
            <QuestionAnswersContainer
              key={questionInfo.question}
              question={questionInfo.question}
              correctAnswer={questionInfo.correctAnswer}
              answers={questionInfo.answers}
              selectedAnswer={
                selectedAnswersDict?.[questionInfo.question] || "invalid"
              }
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
      </div>

      {isReady && !questionsError && (
        <button className="submit-button" type="submit">
          Submit
        </button>
      )}
    </form>
  );
};

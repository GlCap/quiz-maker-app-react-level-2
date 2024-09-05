import "./QuestionAnswersContainer.css";
import { useMemo } from "react";
import { randomize } from "../utils";
import { AnswerButton } from "./AnswerButton";

export interface QuestionAnswersSelectorProps {
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  selectedAnswer: string;
  handleSelect?: (answer: string) => void;
  randomizeAnswers?: boolean;
  showResults?: boolean;
}

export const QuestionAnswersContainer = (
  props: QuestionAnswersSelectorProps
) => {
  const {
    question,
    selectedAnswer,
    correctAnswer,
    incorrectAnswers,
    randomizeAnswers,
    showResults,
    handleSelect,
  } = props;

  const answers = useMemo(() => {
    const merged = [correctAnswer, ...incorrectAnswers];
    return randomizeAnswers ? randomize(merged) : merged;
  }, [correctAnswer, incorrectAnswers, randomizeAnswers]);

  return (
    <div className="question">
      <h2>{question}</h2>
      <div className="answers-row">
        {answers.map((answer) => (
          <AnswerButton
            key={answer}
            name={answer}
            isCorrect={showResults ? correctAnswer === answer : undefined}
            isSelected={selectedAnswer === answer}
            handleToggle={handleSelect ? () => handleSelect(answer) : undefined}
          />
        ))}
      </div>
    </div>
  );
};

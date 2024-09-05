import "./QuestionAnswersContainer.css";

import { AnswerButton } from "./AnswerButton";

export interface QuestionAnswersSelectorProps {
  question: string;
  correctAnswer: string;
  answers: string[];
  selectedAnswer: string;
  handleSelect?: (answer: string) => void;
  showResults?: boolean;
}

export const QuestionAnswersContainer = (
  props: QuestionAnswersSelectorProps
) => {
  const {
    question,
    selectedAnswer,
    correctAnswer,
    answers,
    showResults,
    handleSelect,
  } = props;

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

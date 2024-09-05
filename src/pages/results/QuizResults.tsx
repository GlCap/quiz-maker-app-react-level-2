import "./QuizResults.css";
import { Location, useLocation, useNavigate } from "react-router-dom";
import { QuizState } from "../../types";
import { QuestionAnswersContainer } from "../../components/QuestionAnswersContainer";
import { useMemo } from "react";

export const QuizResults = () => {
  const navigate = useNavigate();
  const { state }: Location<QuizState> = useLocation();

  const handleNewQuiz = () => {
    navigate("/");
  };

  const totalQuestions = state.questionsInfo.length;

  const questionsDict = Object.fromEntries(
    state.questionsInfo.map((questionInfo) => [
      questionInfo.question,
      questionInfo.correctAnswer,
    ])
  );

  const correctQuestions = Object.entries(state.results || {}).filter(
    ([question, answer]) => questionsDict[question] === answer
  ).length;

  const resultClassName = useMemo(() => {
    if (correctQuestions < 2) return "results bad";

    if (correctQuestions < 4) return "results ok";

    return "results good";
  }, [correctQuestions]);

  return (
    <div className="page">
      <h1>QUIZ RESULTS</h1>

      <div className="questions-container">
        {state.questionsInfo.map((questionInfo) => (
          <QuestionAnswersContainer
            key={questionInfo.question.replace(" ", "_")}
            question={questionInfo.question}
            correctAnswer={questionInfo.correctAnswer}
            incorrectAnswers={questionInfo.incorrectAnswers}
            selectedAnswer={state.results?.[questionInfo.question]}
            showResults
          />
        ))}
      </div>

      <div className={resultClassName}>
        You scored {correctQuestions} out of {totalQuestions}
      </div>

      <button className="reset-button" onClick={handleNewQuiz}>
        Create a new quiz
      </button>
    </div>
  );
};

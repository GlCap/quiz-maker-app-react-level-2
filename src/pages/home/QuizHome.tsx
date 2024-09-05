import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../api/category";
import { QuestionsSelector } from "../../components/QuestionsSelector";
import { QuizInfoSelector } from "../../components/QuizInfoSelector";
import type { QuizInfo, QuizState } from "../../types";
import "./QuizHome.css";

export const QuizHome = () => {
  const [quizInfo, setQuizInfo] = useState<QuizInfo>();

  const navigate = useNavigate();

  const [categories, categoriesLoading, categoriesError] = useCategories();

  const handleQuizInfoChange = (data: QuizInfo) => {
    setQuizInfo(data);
  };

  const handleQuizSubmit = (state: QuizState) => {
    console.log("Selected answers", state);

    navigate("/results", { state });
  };

  return (
    <div className="page">
      <h1>QUIZ MAKER</h1>

      {categoriesLoading ? (
        <p>Loading...</p>
      ) : (
        <QuizInfoSelector
          categories={categories}
          onSubmit={handleQuizInfoChange}
        />
      )}
      <strong>{categoriesError?.message ?? ""}</strong>

      {quizInfo && (
        <QuestionsSelector quizInfo={quizInfo} onSubmit={handleQuizSubmit} />
      )}
    </div>
  );
};

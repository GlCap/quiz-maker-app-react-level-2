import { useState } from 'react';

import './App.css';
import { QuizInfo, QuizInfoSelector } from './components/QuizInfoSelector';
import { useCategories } from './api/category';
import { AnswerButton } from './components/AnswerButton';

function App() {
  const [quizInfo, setQuizInfo] = useState<QuizInfo>();

  const [categories, categoriesLoading, categoriesError] = useCategories();

  const handleQuizInfoChange = (data: QuizInfo) => {
    setQuizInfo(data);
  };

  const onToggle = () => setSelected((prev) => !prev);

  return (
    <div>
      <h1>QUIZ MAKER</h1>

      {!categoriesLoading && (
        <div>
          <QuizInfoSelector
            categories={categories}
            onSubmit={handleQuizInfoChange}
          />
          <strong>{categoriesError?.message || ''}</strong>
          {quizInfo?.categoryId || 'no category selected'}
          {'  '}
          {quizInfo?.difficulty || 'no difficulty selected'}
        </div>
      )}

      <AnswerButton name="ciccio" handleToggle={onToggle} />
    </div>
  );
}

export default App;

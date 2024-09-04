import { TriviaCategory } from '../api/category';
import { Questions } from '../api/questions';
import { TRIVIA_DIFFICULTIES } from '../constants';
import { AnswerButton } from './AnswerButton';

export interface QuizInfo {
  categoryId: string;
  difficulty: string;
}

export interface QuizSelectorProps {
  questions: Questions[];
  onSubmit: (data: QuizInfo) => void;
}

export const QuizInfoSelector = (props: QuizSelectorProps) => {
  const { questions, onSubmit } = props;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const rawData = {
      categoryId: formData.get('category'),
      difficulty: formData.get('difficulty'),
    };

    console.debug(rawData);

    if (
      typeof rawData.categoryId !== 'string' ||
      typeof rawData.difficulty !== 'string'
    ) {
      console.debug('invalid data', rawData);
      onSubmit({
        categoryId: '-1',
        difficulty: '-',
      });
      return;
    }

    const data: QuizInfo = {
      categoryId: rawData.categoryId,
      difficulty: rawData.difficulty,
    };

    console.debug(data);

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
     {questions.map( (question) => <}

      <select id="difficultySelect" name="difficulty" defaultValue="Select">
        <option key={'default'}>Select difficulty</option>
        {Object.entries(TRIVIA_DIFFICULTIES).map(([label, value]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <button id="createBtn" type="submit">
        Create
      </button>
    </form>
  );
};

import { TriviaCategory } from "../api/category";
import { TRIVIA_DIFFICULTIES } from "../constants";
import type { QuizInfo } from "../types";

export interface QuizSelectorProps {
  categories: TriviaCategory[];
  onSubmit: (data: QuizInfo) => void;
}

export const QuizInfoSelector = (props: QuizSelectorProps) => {
  const { categories, onSubmit } = props;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const rawData = {
      categoryId: formData.get("category"),
      difficulty: formData.get("difficulty"),
    };

    console.debug(rawData);

    if (
      typeof rawData.categoryId !== "string" ||
      typeof rawData.difficulty !== "string"
    ) {
      console.debug("invalid data", rawData);
      onSubmit({
        categoryId: "-1",
        difficulty: "-",
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
      <select id="categorySelect" name="category" defaultValue="Select">
        <option key={"default"} value={"-1"}>
          Select a category
        </option>
        {categories.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </select>

      <select id="difficultySelect" name="difficulty" defaultValue="Select">
        <option key={"default"}>Select difficulty</option>
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

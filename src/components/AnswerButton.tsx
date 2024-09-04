import './AnswerButton.css';

export interface AnswerButtonProps {
  name: string;
  status?: 'correct' | 'incorrect';
  isSelected?: boolean;
  handleToggle: () => void;
}

export const AnswerButton = (props: AnswerButtonProps) => {
  const { name, isSelected, status, handleToggle } = props;

  return (
    <button
      className="answer-button"
      aria-checked={isSelected || status === 'correct'}
      aria-invalid={status === 'incorrect'}
      onClick={handleToggle}
    >
      {name}
    </button>
  );
};

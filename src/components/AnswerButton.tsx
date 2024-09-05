import { useMemo } from "react";
import "./AnswerButton.css";

export interface AnswerButtonProps {
  name: string;
  isCorrect?: boolean;
  isSelected?: boolean;
  handleToggle?: () => void;
}

export const AnswerButton = (props: AnswerButtonProps) => {
  const { name, isSelected, isCorrect, handleToggle } = props;

  const isChecked = isSelected || isCorrect === true;
  const isInvalid = !isSelected && isCorrect === true;

  const cls = useMemo(() => {
    if (isInvalid) return "answer-button invalid";
    if (isChecked) return "answer-button checked";

    return "answer-button";
  }, [isInvalid, isChecked]);

  return (
    <input type="button" className={cls} onClick={handleToggle} value={name} />
  );
};

import { useEffect, useState } from "react";
import throttle from "lodash.throttle";
import { OPEN_T_DB_RATE_LIMIT, OpenTDBErrorCodes } from "../constants";

const endpoint = "https://opentdb.com/api.php";

export interface QuestionInfo {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuestionsResponse {
  response_code: number;
  results: QuestionInfo[];
}

const getQuestions = async (
  categoryId: string,
  difficulty: string,
  amount = 5
): Promise<QuestionsResponse> => {
  const url = new URL(endpoint);
  url.searchParams.set("amount", amount.toString());
  url.searchParams.set("category", categoryId);
  url.searchParams.set("difficulty", difficulty.toLowerCase());
  url.searchParams.set("type", "multiple");

  const request = new Request(url);
  const response = await fetch(request);
  const data = await response.json();

  const responseCode = data.response_code;
  if (typeof responseCode === "number" && responseCode !== 0) {
    const reason =
      OpenTDBErrorCodes[responseCode as keyof typeof OpenTDBErrorCodes] ||
      "unknown error";
    throw new Error(`Error [${responseCode}] in fetching data: ${reason}`);
  }

  if (!data.results) {
    throw new Error("No results found");
  }

  return data;
};

const getQuestionsThrottled = throttle(getQuestions, OPEN_T_DB_RATE_LIMIT);

export const useQuestions = (
  categoryId: string,
  difficulty: string,
  amount = 5
) => {
  const [questions, setQuestions] = useState<QuestionInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setLoading(true);

    getQuestionsThrottled(categoryId, difficulty, amount)
      .then((data) => {
        setError(undefined);
        setQuestions(data.results || []);
      })
      .catch((err) => {
        console.error(`Error in fetching data from ${endpoint}`, err);
        setError(err);
        setQuestions([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId, difficulty, amount]);

  return [questions, loading, error] as const;
};

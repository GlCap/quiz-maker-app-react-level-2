import { useEffect, useState } from 'react';

const endpoint = 'https://opentdb.com/api.php';

export interface Questions {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuestionsReponse {
  response_code: number;
  results: Questions[];
}

const getQuestions = async (
  categoryId: number,
  difficulty: string,
  amount = 5
): Promise<QuestionsReponse> => {
  const url = new URL(endpoint);
  url.searchParams.set('amount', amount.toString());
  url.searchParams.set('category', categoryId.toString());
  url.searchParams.set('difficulty', difficulty.toLowerCase());
  url.searchParams.set('type', 'multiple');

  const request = new Request(url);
  const response = await fetch(request);
  const data = await response.json();

  return data;
};

export const useQuestions = (
  categoryId: number,
  difficulty: string,
  amount = 5
) => {
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setLoading(true);
    getQuestions(categoryId, difficulty, amount)
      .then((data) => {
        setError(undefined);
        setQuestions(data.results);
      })
      .catch((err) => {
        console.error(`Error in fetchind data from ${endpoint}`, err);
        setError(err);
        setQuestions([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId, difficulty, amount]);

  return [questions, loading, error] as const;
};

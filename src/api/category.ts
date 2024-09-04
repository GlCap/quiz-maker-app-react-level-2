import { useEffect, useState } from 'react';

const endpoint = 'https://opentdb.com/api_category.php';

export interface TriviaCategory {
  id: number;
  name: string;
}

export interface TriviaResponse {
  trivia_categories: TriviaCategory[];
}

const getCategories = async (): Promise<TriviaResponse> => {
  const response = await fetch(endpoint);
  const data = await response.json();

  return data;
};

const comparator = Intl.Collator().compare;

export const useCategories = () => {
  const [categories, setCategories] = useState<TriviaCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setLoading(true);
    getCategories()
      .then((data) => {
        setError(undefined);
        setCategories(
          data.trivia_categories.sort((a, b) => comparator(a.name, b.name))
        );
      })
      .catch((err) => {
        console.error(`Error in fetchind data from ${endpoint}`, err);
        setError(err);
        setCategories([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return [categories, loading, error] as const;
};

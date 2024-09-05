import { useEffect, useState } from "react";
import throttle from "lodash.throttle";
import { OPEN_T_DB_RATE_LIMIT } from "../constants";

const endpoint = "https://opentdb.com/api_category.php";

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

const getCategoriesThrottled = throttle(getCategories, OPEN_T_DB_RATE_LIMIT);

const enCollator = new Intl.Collator("en");

const comparator = (a: TriviaCategory, b: TriviaCategory) =>
  enCollator.compare(a.name, b.name);

export const useCategories = () => {
  const [categories, setCategories] = useState<TriviaCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setLoading(true);
    getCategoriesThrottled()
      .then((data) => {
        data.trivia_categories.sort(comparator);
        setError(undefined);
        setCategories(data.trivia_categories);
      })
      .catch((err) => {
        console.error(`Error in fetching data from ${endpoint}`, err);
        setError(err);
        setCategories([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return [categories, loading, error] as const;
};

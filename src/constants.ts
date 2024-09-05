export const TRIVIA_DIFFICULTIES = {
  Easy: "easy",
  Medium: "medium",
  Hard: "hard",
} as const;

export const OPEN_T_DB_RATE_LIMIT = 5 * 1000; // 5 seconds in milliseconds

export const OpenTDBErrorCodes = {
  0: "Success Returned results successfully.",
  1: "No Results Could not return results. The API doesn't have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.)",
  2: "Invalid Parameter Contains an invalid parameter. Arguments passed in aren't valid. (Ex. Amount = Five)",
  3: "Token Not Found Session Token does not exist.",
  4: "Token Empty Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.",
  5: "Rate Limit Too many requests have occurred. Each IP can only access the API once every 5 seconds.",
};

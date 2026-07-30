export const PAGE_SIZE =
  process.env.NODE_ENV === "development"
    ? 20
    : 500;

export const SEARCH_LIMIT = 5;
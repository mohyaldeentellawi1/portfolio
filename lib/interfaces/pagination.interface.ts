export interface PaginationResult {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  next: number | null;
  prev: number | null;
}

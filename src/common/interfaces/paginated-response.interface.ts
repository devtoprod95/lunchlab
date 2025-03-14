export class PaginationMeta {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    take: number;
}
  
export class PaginatedResponse<T> {
    items: T[];
    meta: PaginationMeta;
}
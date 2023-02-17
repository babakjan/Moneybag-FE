interface VuetifyDataTablePagination {
  page: number;
  itemsPerPage: number;
  pageCount: number;
  itemsLength: number;
  sortBy: string[];
  sortDesc: boolean[];
}

export default VuetifyDataTablePagination;

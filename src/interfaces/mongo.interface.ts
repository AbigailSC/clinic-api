export interface QueryType {
  limit?: number;
  page?: number;
}

export interface FilterBySignType extends QueryType {
  signed?: boolean;
}

export interface FilteerByDateType extends QueryType {
  dateStart?: string;
  dateEnd?: string;
}
export interface ApiException {
  timestamp: string;
  status: number;
  code: string;
  detail: EntityError[] | string | undefined;
  path: string;
  method: string;
}

export type EntityError = {
  field: string;
  error: string;
};

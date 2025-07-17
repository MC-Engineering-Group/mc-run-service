interface CommonResponse {
  data: null | any;
  status: number;
  message: string | null;
  error: null | unknown;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}

export { CommonResponse };

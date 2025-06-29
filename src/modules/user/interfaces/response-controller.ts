export interface ResponseController<T> {
  data: T | T[];
  message: string;
}

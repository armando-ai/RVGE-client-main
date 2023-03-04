export type Response<T, E> = ok<T> | error<E>;

type ok<T> = {
  status: 'ok';
  statusCode: number;
  data: T;
}

type error<T> = T;
export interface Service<T> {
  create(object: unknown): Promise<T>;
  read(): Promise<T[]>;
  readOne(id: string): Promise<T>;
  update(id: string, object: T): Promise<T>;
  delete(id: string): Promise<T>;
}
export interface IBalance {
  id: number,
  username: string,
  account: {
    id: number,
    balance: number,
  }
}
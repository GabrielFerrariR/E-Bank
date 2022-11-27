export interface ITransaction {
  addressee: string,
  amount: number
}

type Account = {
  id: number,
    'user': {
      'id': number,
      'username': string
    }
}

export interface TransactionResponse {
  'id': number,
  'value': string,
  'updatedAt': string,
  'createdAt': string,
  'creditedAccount': Account,
  'debitedAccount': Account
}
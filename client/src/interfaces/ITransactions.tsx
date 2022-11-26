export default interface ITransactions {
  'id': number,
  'value': number,
  'createdAt': string,
  'updatedAt': string,
  'creditedAccount': {
    'id': number,
    'user': {
      'id': number,
      'username': string
    }
  },
  'debitedAccount': {
    'id': number,
    'user': {
      'id': number,
      'username': string
    }
  }
}

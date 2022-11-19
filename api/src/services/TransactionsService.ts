import { ErrorTypes } from '../errors/catalog';
import { ITransaction } from '../interfaces/ITransaction';
import AccountService from './AccountService';
import Transactions from '../database/models/Transactions';


export default class TransactionService {

  constructor(private _AccService = new AccountService(), private _model= Transactions) {}

  async create(username: string, body: ITransaction): Promise<Transactions> {
    const {addressee, amount } = body;

    const userId = await this._checkBalance(username, amount);
    this._checkSelfCashIn(username, addressee);

    const {account: { id: addresseeId }} = await this._AccService.readOne(addressee);

    await this._AccService.transfer(userId, addresseeId, amount);

    return await this._model.create({
      debitedAccountId: userId,
      creditedAccountId: addresseeId,
      value: amount
    });
  }

  private async _checkBalance(username: string, amount: number): Promise<number> {
    const {account: { balance, id }} = await this._AccService.readOne(username);
    if((balance - amount) < 0) throw new Error(ErrorTypes.InsufficientFunds);
    return id;
  }

  private _checkSelfCashIn(username:string, addressee:string): void {
    if (username === addressee) throw new Error(ErrorTypes.Forbidden);
  }
}
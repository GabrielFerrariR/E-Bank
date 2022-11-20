import { ErrorTypes } from '../errors/catalog';
import { ITransaction } from '../interfaces/ITransaction';
import AccountService from './AccountService';
import Transactions from '../database/models/Transactions';
import sequelize from '../database/models';

export default class TransactionService {

  constructor(private _AccService = new AccountService(), private _model= Transactions) {}

  async create(username: string, userId: number, body: ITransaction): Promise<Transactions> {
    const {addressee, amount } = body;

    await this._checkBalance(username, amount);
    this._checkSelfCashIn(username, addressee);

    const {account: { id: addresseeId }} = await this._AccService.readOne(addressee);

    const result = await sequelize.transaction(async (t) => {
      await this._AccService.transfer(userId, addresseeId, amount, t);
      
      return await this._model.create({
        debitedAccountId: userId,
        creditedAccountId: addresseeId,
        value: amount
      }, {transaction: t});
    });
    return result;
  }

  private async _checkBalance(username: string, amount: number): Promise<void> {
    const {account: { balance }} = await this._AccService.readOne(username);
    if((balance - amount) < 0) throw new Error(ErrorTypes.InsufficientFunds);
  }

  private _checkSelfCashIn(username:string, addressee:string): void {
    if (username === addressee) throw new Error(ErrorTypes.Forbidden);
  }

  async readCashIn(accountId: number): Promise<Transactions[]> {
    return await this._model.findAll({
      where: {
        creditedAccountId: accountId
      }
    });
  }

  async readCashOut(accountId: number): Promise<Transactions[]> {    
    return await this._model.findAll({
      where: {
        debitedAccountId: accountId
      }
    });
  }
}
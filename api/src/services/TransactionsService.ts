import { ErrorTypes } from '../errors/catalog';
import { ITransaction } from '../interfaces/ITransaction';
import AccountService from './AccountService';
import Transactions from '../database/models/Transactions';
import sequelize from '../database/models';
import { Op } from 'sequelize';
import Users from '../database/models/Users';
import Accounts from '../database/models/Accounts';

export default class TransactionService {
  private _includeUser = [ {
    model: Accounts,
    as: 'creditedAccount',
    attributes: ['id'], 
    include: [{
      model: Users,
      as: 'user',
      attributes: ['id', 'username'] 
    }],
  },
  {
    model: Accounts,
    as: 'debitedAccount',
    attributes: ['id'], 
    include: [{
      model: Users,
      as: 'user',
      attributes: ['id', 'username'] 
    }],
  }
  ];

  constructor(
    private _AccService = new AccountService(), 
    private _transactionModel= Transactions,
    private _AccountModel = Accounts,
    private _UserMOdel = Users) {}

  async create(username: string, userId: number, body: ITransaction): Promise<Transactions> {
    const {addressee, amount } = body;

    await this._checkBalance(username, amount);
    this._checkSelfCashIn(username, addressee);

    const {account: { id: addresseeId }} = await this._AccService.readOne(addressee);

    const result = await sequelize.transaction(async (t) => {
      await this._AccService.transfer(userId, addresseeId, amount, t);
      
      return await this._transactionModel.create({
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
    
    return await this._transactionModel.findAll({
      where: {
        creditedAccountId: accountId
      },
      attributes: {
        exclude: ['creditedAccountId', 'debitedAccountId']
      },
      include: this._includeUser,
      order: [['createdAt', 'DESC']],
    });
  }

  async read(accountId: number): Promise<Transactions[]> {
    return await this._transactionModel.findAll({
      where: {
        [Op.or]: [{
          debitedAccountId: accountId
        },{
          creditedAccountId: accountId
        }],
      },
      attributes: {
        exclude: ['creditedAccountId', 'debitedAccountId']
      },
      include: this._includeUser,
      order: [['createdAt', 'DESC']],
    });
  }

  async readCashOut(accountId: number): Promise<Transactions[]> {    
    return await this._transactionModel.findAll({
      where: {
        debitedAccountId: accountId
      },
      attributes: {
        exclude: ['creditedAccountId', 'debitedAccountId']
      },
      include: this._includeUser,
      order: [['createdAt', 'DESC']],
    });
  }
}
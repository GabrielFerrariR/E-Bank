import Accounts from '../database/models/Accounts';
import Users from '../database/models/Users';
import { IBalance } from '../interfaces/IBalance';
import { Service } from '../interfaces/Service';
import sequelize from '../database/models';

export default class AccountService 
implements Omit<Service<IBalance>, 'read' | 'create' | 'readOne' | 'delete'> 
{
  constructor(private _userModel = Users, private _accModel = Accounts) {}
  async readOne(username: string): Promise<IBalance> {
    const result = await this._userModel.findOne({
      where: {
        username,
      },
      attributes: {
        exclude: ['password']
      },
      include: {
        model: Accounts,
        as: 'account',
      }
    });
    return result as unknown as IBalance;
  }

  async transfer(userId:number , addresseeId:number, amount:number) {
    await sequelize.transaction(async (t) => {
      await this._accModel.decrement('balance', { 
        by: amount, 
        where: { id: userId }, 
        transaction: t});
      await this._accModel.increment('balance', { 
        by: amount, 
        where: { id: addresseeId }, 
        transaction: t});
    });
  }


  // delete(id: string): Promise<IBalance> {
  //   throw new Error('Method not implemented.');
  // }

}
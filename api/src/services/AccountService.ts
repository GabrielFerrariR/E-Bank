import Accounts from '../database/models/Accounts';
import Users from '../database/models/Users';
import { IBalance } from '../interfaces/IBalance';
import { Service } from '../interfaces/Service';

export default class AccountService 
implements Omit<Service<IBalance>, 'read' | 'create' | 'readOne'> 
{
  constructor(private _model = Users) {}
  async readOne(username: string): Promise<IBalance> {
    const result = await this._model.findOne({
      where: {
        username,
      },
      attributes: {
        exclude: ['id','password']
      },
      include: {
        model: Accounts,
        as: 'account',
        attributes: {
          exclude: ['id']
        }
      }
    });
    return result as unknown as IBalance;
  }

  update(id: string, object: IBalance): Promise<IBalance> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<IBalance> {
    throw new Error('Method not implemented.');
  }

}
import { IUser, userSchema } from '../interfaces/IUser';
import Users from '../database/models/Users';
import Accounts from '../database/models/Accounts';
import { Service } from '../interfaces/Service';
import sequelize from '../database/models';
import { ErrorTypes } from '../errors/catalog';



export default class UserService implements Service<IUser> {
  constructor(private _model = Users) {
    this._model = _model;
  }
  async create(object: unknown): Promise<IUser> {
    const parse = userSchema.safeParse(object);
    if(!parse.success) throw parse.error;
    
    const isNotUnique = await this._model.findOne({ 
      where: {
        username: parse.data.username
      }});
  
    if(isNotUnique) throw Error(ErrorTypes.AlreadyInUse);

    const result = await sequelize.transaction(async (t) => {
      const account = await Accounts.create({ transaction: t });
      const user = await this._model.create({...parse.data, accountId: account.id}, { transaction: t });
      return user;
    });
    return result as unknown as IUser;
  }
  read(): Promise<IUser[]> {
    throw new Error('Method not implemented.');
  }
  readOne(id: string): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
  update(id: string, object: IUser): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
}
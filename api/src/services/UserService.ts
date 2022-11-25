import * as bcrypt from 'bcrypt';
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
    const {password, username} = this.validateBody(object); 
    const hash = this.createHash(password);
    await this.isUniqueUsername(username);

    const result = await sequelize.transaction(async (t) => {
      const account = await Accounts.create({ transaction: t });
      const user = await this._model.create({
        username, password: hash, accountId: account.id
      }, { transaction: t });
      return user;
    });

    return result as unknown as IUser;
  }

  private validateBody(object: unknown) {
    const parse = userSchema.safeParse(object);
    if(!parse.success) throw parse.error;
    return parse.data;
  }

  private createHash(password: string) {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
  }
  
  private async isUniqueUsername(username: string) {
    const isNotUnique = await this._model.findOne({ 
      where: {
        username,
      }});
  
    if(isNotUnique) throw Error(ErrorTypes.AlreadyInUse);
  }

  async read(): Promise<IUser[]> {
    const result = await this._model.findAll({
      attributes: {
        exclude: ['password']
      }
    });
    return result;
  }

  async readOne(id: string): Promise<IUser> {
    const result = await this._model.findOne({
      where: {
        accountId: id
      },
      attributes: {
        exclude: ['password']
      }
    });
    if (!result) throw new Error(ErrorTypes.EntityNotFound);
    return result;
  }

  update(_id: string, _object: IUser): Promise<IUser> {
    throw new Error('Method not implemented.');
  }

  delete(_id: string): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
}
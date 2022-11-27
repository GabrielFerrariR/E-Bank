import * as bcrypt from 'bcrypt';
import { IUserResponse, userSchema } from '../interfaces/IUser';
import Users from '../database/models/Users';
import Accounts from '../database/models/Accounts';
import { Service } from '../interfaces/Service';
import sequelize from '../database/models';
import { ErrorTypes } from '../errors/catalog';
import { Token } from '../interfaces/Token';



export default class UserService implements 
Omit<Service<IUserResponse | Token>, 'create' | 'read' | 'update' |'delete'> {
  constructor(private _model = Users) {
    this._model = _model;
  }

  async create(object: unknown): Promise<Token> {
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

    return result as unknown as Token;
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

  async readOne(id: string): Promise<IUserResponse> {
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
}
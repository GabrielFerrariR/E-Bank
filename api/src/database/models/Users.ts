import {
  Model, DataTypes,
} from 'sequelize';
import db from '.';
import Accounts from './Accounts';

class Users extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public accountId: number;
}
Users.init({
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  accountId: DataTypes.NUMBER,
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

Users.hasOne(Accounts, {
  foreignKey: 'accountId',
  as: 'account'
});
export default Users;
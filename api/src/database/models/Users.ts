import {
  Model, DataTypes,
} from 'sequelize';
import db from '.';
import Accounts from './Accounts';

class Users extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public accountId!: number;
}
Users.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  accountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'accounts',
      key: 'id',
    },
  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

Users.hasOne(Accounts, {
  foreignKey: 'id',
  as: 'account'
});
export default Users;
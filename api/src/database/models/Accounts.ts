import {
  Model, DataTypes,
} from 'sequelize';
import db from '.';
import Transactions from './Transactions';

class Accounts extends Model {
  public id!: number;
  public balance!: number;
}
Accounts.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  balance: {
    type: DataTypes.INTEGER,
    defaultValue: 100,
  },
}, {
  sequelize: db,
  modelName: 'accounts',
  timestamps: false,
});

Accounts.hasMany(Transactions, {
  foreignKey: 'debitedAccountId',
  as: 'debitedAccount',
});
Accounts.hasMany(Transactions, {
  foreignKey: 'creditedAccountId',
  as: 'creditedAccount',
});


export default Accounts;
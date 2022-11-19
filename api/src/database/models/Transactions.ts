import {
  Model, DataTypes,
} from 'sequelize';
import db from '.';
import Accounts from './Accounts';

class Transactions extends Model {
  public id!: number;
  public debitedAccountId!: number;
  public creditedAccountId!: number;
  public value!: number;
}

Transactions.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  debitedAccountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'accounts',
      key: 'id',
    },
  },
  creditedAccountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'accounts',
      key: 'id',
    },
  },
  value: {
    type: DataTypes.DECIMAL(15,2),
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  sequelize: db,
  modelName: 'transactions',
  timestamps: true,
});


Transactions.belongsTo(Accounts, {
  foreignKey: 'debitedAccountId',
  as: 'debitedAccount',
});
Transactions.belongsTo(Accounts, {
  foreignKey: 'creditedAccountId',
  as: 'creditedAccount',
});

Accounts.hasMany(Transactions, {
  foreignKey: 'debitedAccountId',
  as: 'debitedAccount',
});
Accounts.hasMany(Transactions, {
  foreignKey: 'creditedAccountId',
  as: 'creditedAccount',
});

export default Transactions;

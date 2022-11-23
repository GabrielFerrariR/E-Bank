import {
  Model, DataTypes,
} from 'sequelize';
import db from '.';

class Accounts extends Model {
  public id!: number;
  public balance!: number;
}
Accounts.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  balance: {
    type: DataTypes.DECIMAL(15,2),
    defaultValue: 100.00,
  },
}, {
  sequelize: db,
  modelName: 'accounts',
  timestamps: false,
});


export default Accounts;
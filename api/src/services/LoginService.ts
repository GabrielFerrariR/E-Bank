import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Token } from '../interfaces/Token';
import Users from '../database/models/Users';
import { IUser } from '../interfaces/IUser';
import { ErrorTypes } from '../errors/catalog';
import 'dotenv/config';

const secret = process.env.JWT_SECRET || 'segredobemguardado';

export default class LoginService {
  async login(body: IUser): Promise<Token> {
    const {username, password} = body;
    const isRegistered = await Users.findOne({where: {username}});
    if (!isRegistered) throw Error(ErrorTypes.WrongCredentials);
    const hash = isRegistered.password;
    const isCorrect = await bcrypt.compare(password, hash);
    if (!isCorrect) throw Error(ErrorTypes.WrongCredentials);
    const token = jwt.sign({ data: { username, } }, secret, {expiresIn: '24h' });
    return {
      token,
    };
  }
}
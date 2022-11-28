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
    const user = await Users.findOne({where: {username}});
    if (!user) throw Error(ErrorTypes.WrongCredentials);
    const {password: hash, accountId } = user;
    const isCorrect = await bcrypt.compare(password, hash);
    if (!isCorrect) throw Error(ErrorTypes.WrongCredentials);
    const token = jwt.sign({ data: { username, accountId } }, secret, {expiresIn: '24h' });
    return {
      token,
    };
  }

  async validate(auth: string) {
    jwt.verify(auth, secret);
    return auth;
  }
}
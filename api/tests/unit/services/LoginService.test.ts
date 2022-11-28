import sinon from 'sinon';
import chai from 'chai';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const { expect } = chai;
import {reqUserFormMock, resUserMock, tokenMock } from '../../mocks/index';
import LoginService from '../../../src/services/LoginService';
import Users from '../../../src/database/models/Users';


describe('Login Service', () => {
  const loginService = new LoginService();

  describe('login method, on successful request', () => {

    afterEach(sinon.restore)

    it('should return an object with jwt token', async () => {
      sinon
        .stub(Users, 'findOne')
        .resolves({ ...resUserMock, password: 'P@ssw0rd' } as unknown as Users);
      sinon.stub(bcrypt, 'compare').resolves(true);
      sinon.stub(jwt, 'sign').returns(tokenMock.token as unknown as void)

      const result = await loginService.login(reqUserFormMock)
      expect(result).to.be.deep.equal(tokenMock)
    })
  })

  describe('method, on fail request', () => {

    afterEach(sinon.restore);

    it('should return an error if do not find an user with the passed username', async () => {
      sinon
        .stub(Users, 'findOne')
        .resolves(null);
      try {
        await loginService.login(reqUserFormMock);
        expect.fail()
      } catch (err) {
        const error = err as Error
        expect(error).to.be.instanceof(Error)
        expect(error.message).to.be.equal('WrongCredentials')
      }
    });

    it('should return an error if the password is incorrect', async () => {
      sinon
        .stub(Users, 'findOne')
        .resolves({ ...resUserMock, password: 'P@ssw0rd' } as unknown as Users);
      sinon.stub(bcrypt, 'compare').resolves(false);
      try {
        await loginService.login(reqUserFormMock);
        expect.fail()
      } catch (err) {
        const error = err as Error
        expect(error).to.be.instanceof(Error)
        expect(error.message).to.be.equal('WrongCredentials')
      }
    });
  });
  describe('validate method', () => {
    it('should return the token if is valid', async () => {
      sinon.stub(jwt, 'verify').returns(true as unknown as void)
      const result = await loginService.validate(tokenMock.token);
      expect(result).to.be.equal(tokenMock.token)
    })
  })
})
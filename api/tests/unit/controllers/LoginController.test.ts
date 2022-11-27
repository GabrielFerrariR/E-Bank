import sinon from 'sinon';
import chai from 'chai';
import LoginController from '../../../src/controllers/LoginController'
import LoginService from '../../../src/services/LoginService';
const { expect } = chai;

import { Request, Response} from 'express';
import { reqUserFormMock, tokenMock } from '../../mocks/index';

describe('Login Controller', () => {
  const req = {} as Request;
  const res = {} as Response;
  const next = () => {}
  const loginService = new LoginService();
  const loginController = new LoginController(loginService);

  describe('login method', () => {
    beforeEach(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.body = reqUserFormMock
      sinon
      .stub(loginService, 'login')
      .resolves(tokenMock);
    });
    
    afterEach(sinon.restore)
    
    it('should return a status 200 response', async () => {
      
      await loginController.login(req, res, next);

      const statusStub = res.status as sinon.SinonStub;

      expect(statusStub.calledWith(200)).to.be.true;
    });

    it('should return a token on json response', async () => {
      await loginController.login(req, res, next);

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(tokenMock)).to.be.true;
    });
  });
  describe('validate method', () => {
    beforeEach(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.body = { username: 'josefa', password: 'P@ssw0rd' }
      sinon
      .stub(loginService, 'validate')
      .resolves(tokenMock.token);
    });
    
    afterEach(sinon.restore)
    
    it('should return a status 20 response', async () => {
      req.headers = { authorization : tokenMock.token}
      
      await loginController.validate(req, res, next);

      const statusStub = res.status as sinon.SinonStub;

      expect(statusStub.calledWith(200)).to.be.true;
    });

    it('should return an token on json response', async () => {
      req.headers = { authorization : tokenMock.token}
      await loginController.validate(req, res, next);

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(tokenMock.token)).to.be.true;
    });
    it('should throw an error if auth header is undefined', async () => {
      req.headers = { authorization: undefined}
      try {
        await loginController.validate(req, res, next);
        expect(true).to.be.false
      } catch (error) {
        expect(error instanceof Error).to.be.true
      }
    })
  });
});
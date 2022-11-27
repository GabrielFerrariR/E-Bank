import sinon from 'sinon';
import chai from 'chai';
import AccountsController from '../../../src/controllers/AccountsController'
import AccountService from '../../../src/services/AccountService';
const { expect } = chai;

declare module 'express-serve-static-core' {
  interface Request {
    user: ReqUser
  }
}

import { Request, Response, NextFunction } from 'express';
import { accountMock, reqUserMock } from '../../mocks/index';
import { ReqUser } from '../../../src/interfaces/IUser';

describe('Accounts Controller', () => {
  const req = {} as Request;
  const res = {} as Response;
  const next = () => {}
  req.user = reqUserMock
  const accountService = new AccountService();
  const accountController = new AccountsController(accountService);
  describe('readOne method', () => {
    // O ideal seria usar o beforeEach aqui, porém por algum motivo ele está quebrando o stub do meu teste
    beforeEach(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      sinon
      .stub(accountService, 'readOne')
      .resolves(accountMock);
    });
    
    afterEach(sinon.restore)
    
    it('should return a status 200 response', async () => {
     
      
      await accountController.readOne(req, res, next);

      const statusStub = res.status as sinon.SinonStub;

      expect(statusStub.calledWith(200)).to.be.true;
    });
    it('should return an account on json response', async () => {
      await accountController.readOne(req, res, next);

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(accountMock)).to.be.true;
    });
  });
});
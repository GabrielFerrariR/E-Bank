import sinon from 'sinon';
import chai from 'chai';
import UserController from '../../../src/controllers/UserController'
import UserService from '../../../src/services/UserService';
const { expect } = chai;

import { Request, Response} from 'express';
import { reqUserFormMock, resUserMock, tokenMock } from '../../mocks/index';

describe('Users Controller', () => {
  const req = {} as Request;
  const res = {} as Response;
  const next = () => {}
  const userService = new UserService();
  const userController = new UserController(userService);
  describe('readOne method', () => {
    beforeEach(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.params = { id: '1' }
      sinon
      .stub(userService, 'readOne')
      .resolves(resUserMock);
    });
    
    afterEach(sinon.restore)
    
    it('should return a status 200 response', async () => {
     
      
      await userController.readOne(req, res, next);

      const statusStub = res.status as sinon.SinonStub;

      expect(statusStub.calledWith(200)).to.be.true;
    });

    it('should return an user on json response', async () => {
      await userController.readOne(req, res, next);

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(resUserMock)).to.be.true;
    });
  });
  describe('create method', () => {
    beforeEach(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.body = reqUserFormMock
      sinon
      .stub(userService, 'create')
      .resolves(resUserMock);
    });
    
    afterEach(sinon.restore)
    
    it('should return a status 201 response', async () => {
     
      
      await userController.create(req, res, next);

      const statusStub = res.status as sinon.SinonStub;

      expect(statusStub.calledWith(201)).to.be.true;
    });

    it('should return a user without password on json response', async () => {
      await userController.create(req, res, next);

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(resUserMock)).to.be.true;
    });
  });
});
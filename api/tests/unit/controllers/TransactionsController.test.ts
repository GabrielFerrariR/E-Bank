import sinon from 'sinon';
import chai from 'chai';
import TransactionsController from '../../../src/controllers/TransactionsController'
import TransactionsService from '../../../src/services/TransactionsService';
const { expect } = chai;

import { Request, Response} from 'express';
import { reqUserMock, transactionReqMock, createTransactionResponseMock, readTransactionResponseMock } from '../../mocks/index';

describe('Transactions Controller', () => {
  const req = {} as Request;
  const res = {} as Response;
  const next = () => {}
  const transactionsService = new TransactionsService();
  const transactionsController = new TransactionsController(transactionsService);

  describe('create method', () => {
    beforeEach(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.body = transactionReqMock;
      req.user = reqUserMock
      sinon
      .stub(transactionsService, 'create')
      .resolves(createTransactionResponseMock);
    });
    
    afterEach(sinon.restore)
    
    it('should return a status 201 response', async () => {
      
      await transactionsController.create(req, res, next);

      const statusStub = res.status as sinon.SinonStub;

      expect(statusStub.calledWith(201)).to.be.true;
    });

    it('should return a transaction object on json response', async () => {
      await transactionsController.create(req, res, next);

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(createTransactionResponseMock)).to.be.true;
    });
  });
  describe('read method', () => {
    beforeEach(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.user = reqUserMock
      sinon
      .stub(transactionsService, 'read')
      .resolves([readTransactionResponseMock]);
    });
    
    afterEach(sinon.restore)
    
    it('should return a status 200 response', async () => {
      
      await transactionsController.read(req, res, next);

      const statusStub = res.status as sinon.SinonStub;

      expect(statusStub.calledWith(200)).to.be.true;
    });

    it('should return a list of transactions on json response', async () => {
      await transactionsController.read(req, res, next);

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith([readTransactionResponseMock])).to.be.true;
    });
  });
  describe('readCashIn method', () => {
    beforeEach(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.user = reqUserMock
      sinon
      .stub(transactionsService, 'readCashIn')
      .resolves([readTransactionResponseMock]);
    });
    
    afterEach(sinon.restore)
    
    it('should return a status 200 response', async () => {
      
      await transactionsController.readCashIn(req, res, next);

      const statusStub = res.status as sinon.SinonStub;

      expect(statusStub.calledWith(200)).to.be.true;
    });

    it('should return a list of transactions on json response', async () => {
      await transactionsController.readCashIn(req, res, next);

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith([readTransactionResponseMock])).to.be.true;
    });
  });
  describe('readCashOut method', () => {
    beforeEach(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.user = reqUserMock
      sinon
      .stub(transactionsService, 'readCashOut')
      .resolves([readTransactionResponseMock]);
    });
    
    afterEach(sinon.restore)
    
    it('should return a status 200 response', async () => {
      
      await transactionsController.readCashOut(req, res, next);

      const statusStub = res.status as sinon.SinonStub;

      expect(statusStub.calledWith(200)).to.be.true;
    });

    it('should return a list of transactions on json response', async () => {
      await transactionsController.readCashOut(req, res, next);

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith([readTransactionResponseMock])).to.be.true;
    });
  });
});
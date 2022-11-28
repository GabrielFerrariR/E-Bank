import sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import TransactionsService from '../../../src/services/TransactionsService';
import { accountResMock, createTransactionResponseMock, readTransactionResponseMock, transactionReqMock } from '../../mocks/index';
import sequelize from '../../../src/database/models';
import { Transaction } from 'sequelize';
import Transactions from '../../../src/database/models/Transactions';

describe('Transactions Service', () => {
  const transactionsService = new TransactionsService();

  describe('create method, on successful request', () => {
      beforeEach(async () => {
        sinon
          .stub(transactionsService._AccService, 'readOne')
          .resolves(accountResMock)
          sinon
          .stub(sequelize, 'transaction')
          .resolves({ dataValues :createTransactionResponseMock } as unknown as Transaction)  
      })
    afterEach(sinon.restore);

    it('should return the transaction', async () => {
      const result = await transactionsService.create('fulanosilva', 1, transactionReqMock)
      expect(result).to.be.equal(createTransactionResponseMock)
    })
  })
  describe('create method, on fail request', () => {

    afterEach(sinon.restore);

    it('should throw an error if the account balance is less then the amount transferred', async () => {
      sinon
          .stub(transactionsService._AccService, 'readOne')
          .resolves({ ...accountResMock, account: {balance: 0, id: 1}})
      try {
        await transactionsService.create('fulanosilva', 1, transactionReqMock)
        expect.fail()
      } catch (err) {
        const error = err as Error
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.be.equal('InsufficientFunds')
      }
    });
    it('should throw an error if is trying to make a transaction for yourself', async () => {
      sinon
          .stub(transactionsService._AccService, 'readOne')
          .resolves(accountResMock)
      try {
        await transactionsService.create('fulanosilva', 1, {
          ...transactionReqMock, 
          addressee: 'fulanosilva'
        })
        expect.fail()
      } catch (err) {
        const error = err as Error
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.be.equal('Forbidden')
      }
    });
  });
  describe('read method', () => {
    after(sinon.restore)
    it('should return an array of transactions', async () => {
      sinon
        .stub(Transactions, 'findAll')
        .resolves([{dataValues: readTransactionResponseMock}] as unknown as Transactions[]);
      const result = await transactionsService.read(1)
      expect(result).to.be.deep.equal([readTransactionResponseMock])
    })
  })
  describe('readCashIn method', () => {
    after(sinon.restore)
    it('should return an array of transactions', async () => {
      sinon
        .stub(Transactions, 'findAll')
        .resolves([{dataValues: readTransactionResponseMock}] as unknown as Transactions[]);
      const result = await transactionsService.readCashIn(1)
      expect(result).to.be.deep.equal([readTransactionResponseMock])
    })
  })
  describe('readCashOut method', () => {
    after(sinon.restore)
    it('should return an array of transactions', async () => {
      sinon
        .stub(Transactions, 'findAll')
        .resolves([{dataValues: readTransactionResponseMock}] as unknown as Transactions[]);
      const result = await transactionsService.readCashOut(1)
      expect(result).to.be.deep.equal([readTransactionResponseMock])
    })
  })
})
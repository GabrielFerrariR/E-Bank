import sinon from 'sinon';
import chai, { use } from 'chai';
const { expect } = chai;
import UserService from '../../../src/services/UserService';
import sequelize from '../../../src/database/models';
import { Request, Response} from 'express';
import { createTransactionResponseMock, reqUserFormMock, reqUserMock, resUserMock, tokenMock } from '../../mocks/index';
import Users from '../../../src/database/models/Users';
import { Transaction } from 'sequelize';
import { ZodError } from 'zod';

describe('Users Service', () => {
  const userService = new UserService();
  describe('method, on successful request', () => {
    beforeEach(async () => {
      sinon
        .stub(sequelize, 'transaction')
        .resolves(resUserMock as unknown as Transaction)  
      sinon
        .stub(Users, 'findOne')
        .resolves(null);
    })
    afterEach(sinon.restore)
    it('should return an object user', async () => {
      const result = await userService.create(reqUserFormMock)
      expect(result).to.be.deep.equal(resUserMock)
    })
  })
  describe('method, on fail request', () => {
    afterEach(sinon.restore)
    it('should return a ZodError with the username and password doesnt match the specifications', async () => {
      try {
        await userService.create('invalid')
        expect.fail()
      } catch (error) {
        expect(error instanceof ZodError).to.be.true
      }
    })
    it('should return a Error if the username is already in use', async () => {
      sinon
        .stub(Users, 'findOne')
        .resolves(resUserMock as Users);
      try {
        await userService.create(reqUserFormMock)
        expect.fail()
      } catch (error) {
        expect(error instanceof Error).to.be.true
      }
    })
  })
})


// describe('Users Service', () => {
//   describe('method, on successful request', () => {
//     beforeEach(async () => {
      
//     })
//     afterEach(sinon.restore)
//     it('', async () => {
      
//     })
//   })
//   describe('method, on fail request', () => {
//     it('', async () => {
      
//     })
//   })
// })
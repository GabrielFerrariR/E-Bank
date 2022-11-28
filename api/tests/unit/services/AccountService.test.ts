import sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import AccountService from '../../../src/services/AccountService';
import { accountResMock, reqUserFormMock, resUserMock } from '../../mocks/index';
import Accounts from '../../../src/database/models/Accounts';
import Users from '../../../src/database/models/Users'


describe('Accounts Service', () => {
  const accountService = new AccountService()
  describe('readOne method, on successful request', () => {
    beforeEach(async () => {
      sinon.stub(Users, 'findOne').resolves(accountResMock as unknown as Accounts)
    })
    afterEach(sinon.restore)
    it('should return the account of username', async () => {
      const result = await accountService.readOne('name')
      expect(result).to.be.equal(accountResMock)
    })
  })
  // describe('method, on fail request', () => {
  //   it('', async () => {
      
  //   })
  // })
})
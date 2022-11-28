import { IUser } from "../../src/interfaces/IUser";
import { IBalance } from "../../src/interfaces/IBalance";

export const accountResMock: IBalance = {
  id: 1,
  username: 'fulanosilva',
  account: {
    id: 1,
    balance: 200.00
  }

}

export const reqUserMock = {
  username: 'fulanosilva', 
  accountId: 1
}

export const resUserMock = {
  "id": 3,
  "username": "sicranooliveira",
  "accountId": 3
}

export const tokenMock = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiZnVsYW5vc2lsdmEiLCJhY2NvdW50SWQiOjF9LCJpYXQiOjE2Njk1NTg1MDQsImV4cCI6MTY2OTY0NDkwNH0.MdS4XMwTlf0oNubhwahb_3gYS8-YGsb28rJnw-ykneg"
}

export const reqUserFormMock = { username: 'josefina', password: 'P@ssw0rd' }

export const createTransactionResponseMock = {
  "id": 1,
  "debitedAccountId": 1,
  "creditedAccountId": 2,
  "value": "15.1",
  "updatedAt": "2022-11-27T14:58:34.864Z",
  "createdAt": "2022-11-27T14:58:34.864Z"
}

export const readTransactionResponseMock = {
  "id": 3,
  "value": "15.1",
  "createdAt": "2022-11-27T15:18:57.398Z",
  "updatedAt": "2022-11-27T15:18:57.398Z",
  "creditedAccount": {
    "id": 2,
    "user": {
      "id": 2,
      "username": "beutranocosta"
    }
  },
  "debitedAccount": {
    "id": 1,
    "user": {
      "id": 1,
      "username": "fulanosilva"
    }
  }
}


export const transactionReqMock = {
  addresse: 'beutranocosta',
  amount: 15
}
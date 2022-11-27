import { IUser } from "../../src/interfaces/IUser";
import { IBalance } from "../../src/interfaces/IBalance";

export const accountMock: IBalance = {
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

export const reqUserFormMock = { username: 'josefa', password: 'P@ssw0rd' }
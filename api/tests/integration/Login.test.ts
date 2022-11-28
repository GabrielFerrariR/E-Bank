import sinon from 'sinon';
import chai from 'chai';
import bcrypt from 'bcrypt';

import chaiHttp from 'chai-http';

import app from '../../src/app';
import Users from '../../src/database/models/Users';
import { expiredToken, reqUserFormMock, resUserMock } from '../mocks';


chai.use(chaiHttp);

const { expect } = chai;




let chaiHttpResponse: Response;

describe('POST /login on success', () => {

  beforeEach(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(resUserMock as unknown as Users);
    sinon
    .stub(bcrypt, 'compare')
    .resolves(true);
  });

  afterEach(()=>{
    sinon.restore();
  })

  it('should return a status 200', async () => {
    //@ts-ignore
    chaiHttpResponse = await chai
      .request(app)
      .post('/login').send({
        username: 'sicranooliveira',
        password: 'P@ssw0rd'
      });
    expect(chaiHttpResponse.status.valueOf()).to.be.equal(200)
  });

  it('should return a token', async () => {
  //@ts-ignore
    chaiHttpResponse = await chai
      .request(app)
      .post('/login').send({
        username: 'sicranooliveira',
        password: 'P@ssw0rd'
      });;
    expect(chaiHttpResponse.body).to.haveOwnProperty('token');
  });
});

describe('POST /login on fail', () => {
  describe('when the fields are empty', () => {
    beforeEach( async () => {
      //@ts-ignore
      chaiHttpResponse = await chai
        .request(app)
        .post('/login').send();
    });
    afterEach(sinon.restore);
    it('should return status 400 on empty fields', () => {
      expect(chaiHttpResponse.status.valueOf()).to.be.equal(401);
    });
    it('should return an object with the message "Wrong username or password"', () => {
      expect(chaiHttpResponse.body).to.haveOwnProperty("error");
      //@ts-ignore
      expect(chaiHttpResponse.body.error).to.be.equal("Wrong username or password");
    });
  })
  describe('when the username is invalid', () => {
    beforeEach( async () => {
      sinon
        .stub(Users, 'findOne')
        .resolves(null)
        //@ts-ignore
      chaiHttpResponse = await chai
        .request(app)
        .post('/login').send({
          username: 'invalido',
          password: 'P@ssw0rd',
        });
    });
    afterEach(sinon.restore);
    it('should return status 400 on wrong username field', () => {
      expect(chaiHttpResponse.status.valueOf()).to.be.equal(401);
    });
    it('should return an object with the message "Wrong username or password"', () => {
      expect(chaiHttpResponse.body).to.haveOwnProperty("error");
      //@ts-ignore
      expect(chaiHttpResponse.body.error).to.be.equal("Wrong username or password");
    });
  })
  describe('when the password is invalid', () => {
    beforeEach( async () => {
      sinon
        .stub(Users, 'findOne')
        .resolves({ ...resUserMock, password: 'P@ssw0rd'} as unknown as Users);
        //@ts-ignore
      chaiHttpResponse = await chai
        .request(app)
        .post('/login').send({
          username: 'sicranooliveira',
          password: 'Inv@lid0',
        });
    });
    afterEach(sinon.restore);
    it('should return status 401', () => {
      expect(chaiHttpResponse.status.valueOf()).to.be.equal(401);
    });
    it('should return an object with the message "Wrong username or password"', () => {
      expect(chaiHttpResponse.body).to.haveOwnProperty("error");
      //@ts-ignore
      expect(chaiHttpResponse.body.error).to.be.equal("Wrong username or password");
    });
  })
})
describe('POST /login/validate', async () => {
  beforeEach(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(resUserMock as unknown as Users);
    sinon
    .stub(bcrypt, 'compare')
    .resolves(true);
  })
  afterEach(sinon.restore)
  it('should return status 200 with token string in response body', async () => {
    const loginResponse = await chai
      .request(app).post('/login').send({
        username: 'sicranooliveira',
        password: 'P@ssw0rd'
      })
  //@ts-ignore  
  chaiHttpResponse = await chai
    .request(app)
    .post('/login/validate')
    .set('authorization', loginResponse.body.token)
    
    expect(chaiHttpResponse.status.valueOf()).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.equal(loginResponse.body.token )
  })
  it('should return an error with status 400 and the message expired token if pass an expired token', async () => {
    //@ts-ignore  
    chaiHttpResponse = await chai
    .request(app)
    .post('/login/validate')
    .set('authorization', expiredToken)
    
    expect(chaiHttpResponse.status.valueOf()).to.be.equal(500);
    //@ts-ignore  
    expect(chaiHttpResponse.body.message).to.be.equal('jwt expired')
  })
  it('should return a reponse with status 500 with the message "jwt expired" if pass an expired token in headers authorization', async () => {
    //@ts-ignore  
    chaiHttpResponse = await chai
    .request(app)
    .post('/login/validate')
    .set('authorization', expiredToken)
    
    expect(chaiHttpResponse.status.valueOf()).to.be.equal(500);
    //@ts-ignore  
    expect(chaiHttpResponse.body.message).to.be.equal('jwt expired')
  })
  it('should return a reponse with status 401 with the message "Token must be a valid token" if pass an invalid token in headers authorization', async () => {
    //@ts-ignore  
    chaiHttpResponse = await chai
    .request(app)
    .post('/login/validate')
    .set('authorization', "token invalido")
    
    expect(chaiHttpResponse.status.valueOf()).to.be.equal(401);
    //@ts-ignore  
    expect(chaiHttpResponse.body.message).to.be.equal('Token must be a valid token')
  })
})
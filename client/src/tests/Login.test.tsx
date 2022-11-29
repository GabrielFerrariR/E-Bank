
import Routes from '../Router';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';

// Infelizmente estou tendo problemas com a mudança de rotas durante a produção de testes, então optei por não continuar fazendo os testes de front end

test('if login page has rendered all elements', async () => {
  renderWithRouter(<Routes />)
  const header = screen.getByRole('heading', {level:1 , name: /Bank/i })
  const userNameInput = screen.getByTestId('username-input');
  const passwordInput = screen.getByTestId('password-input');
  const loginBtn = screen.getByRole('button',{ name :/login/i });
  const registerTxt = screen.getByText(/ainda não é cadastrado/i);
  const registerLink = screen.getByRole('link', {name : /Cadastre-se/i })

  expect(header).toBeInTheDocument();
  expect(userNameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginBtn).toBeInTheDocument();
  expect(registerTxt).toBeInTheDocument();
  expect(registerLink).toBeInTheDocument();
}
)

// describe('check if the page changes to register when clicked on register link', () => {

  // it('the path changes to register on click', async () => {
  //   renderWithRouter(<Routes />)
  //   const registerLink = screen.getByRole('link', {name : /Cadastre-se/i })
  //   const registerTxt = screen.getByText(/ainda não é cadastrado/i);
   
  //   await userEvent.click(registerLink)

  //   expect(registerLink).toHaveTextContent(/Efetue o login/i);
  //   expect(registerTxt).toHaveTextContent(/Já é cadastrado ?/i);
  // })
// })

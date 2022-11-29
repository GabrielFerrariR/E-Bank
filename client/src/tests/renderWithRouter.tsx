import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component: React.ReactElement) => {
  const history = createMemoryHistory();
  return ({
    // @ts-ignore
    ...render(<BrowserRouter history={history}>{component}</BrowserRouter>), history,
  });
};
export default renderWithRouter;
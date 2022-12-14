import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Router';
import { Provider } from './context/Provider';
import './assets/global.css';
import './assets/reset.css';
import './assets/colors.css';
import './assets/typography.css';

if (process.env.NODE_ENV !== 'production') {
  import ('react-axe').then((axe) => {
    axe.default(React, ReactDOM, 1000);
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <React.StrictMode>
        <Provider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </Provider>
      </React.StrictMode>,
    );
  });
}

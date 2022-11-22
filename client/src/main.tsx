import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './Router';
import Contexts from './context';
import './assets/reset.css';
import './assets/colors.css';
import './assets/typography.css';

// if (process.env.NODE_ENV !== 'production') {
//   import ('react-axe').then((axe) => {
//     axe.default(React, ReactDOM, 1000);
//     ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//       <React.StrictMode>
//         <Contexts>
//           <Routes />
//         </Contexts>
//       </React.StrictMode>,
//     );
//   });
// }
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
);

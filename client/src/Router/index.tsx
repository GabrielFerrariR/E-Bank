import {
  BrowserRouter, Route, Routes as Switch,
} from 'react-router-dom';
import Balance from '../Pages/Balance';
import ProtectedRoute from './ProtectedRoute';
import Login from '../Pages/Login';
import Transaction from '../Pages/Transaction';
import History from '../Pages/History';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
        <Route
          path="/balance"
          element={(
            <ProtectedRoute>
              <Balance />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/transaction"
          element={(
            <ProtectedRoute>
              <Transaction />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/history"
          element={(
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;

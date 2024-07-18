import { useRoutes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import InvoicesPage from './pages/Invoices';

const RoutesPage = () => {
  return useRoutes([
    {
      path: '/',
      element: <LoginPage />,
    },
    { path: '/users/:userId/:userName/invoices', element: <InvoicesPage /> },
    {
      path: '*',
      element: (
        <h1 style={{ fontSize: '40px', color: 'red', marginTop: '15px' }}>
          Page Not Found
        </h1>
      ),
    },
  ]);
};

export default RoutesPage;

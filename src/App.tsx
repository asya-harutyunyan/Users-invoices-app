import { ChakraProvider } from '@chakra-ui/react';
import RoutesPage from './Routes';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn && isLoggedIn !== 'true') {
      navigate('/');
    }
  });

  return (
    <ChakraProvider>
      <RoutesPage />
    </ChakraProvider>
  );
};

export default App;

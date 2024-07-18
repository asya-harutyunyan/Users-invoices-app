import { Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { $apiClient } from '../../api/axios';
import { User } from '../../types';
import Header from '../../components/Header';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  const [userData, setUserData] = useState<User[]>([]);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    $apiClient.get('/users').then((res) => {
      setUserData(res.data.value);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isCredentialsValid = userData.find(
      (user) =>
        user.Name === formData.name && user.Password === formData.password
    );
    if (isCredentialsValid) {
      navigate(
        `/users/${isCredentialsValid.UserId}/${isCredentialsValid.Name}/invoices`
      );
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      alert('Invalid username or password.');
      setFormData({ name: '', password: '' });
    }
  };

  return (
    <>
      <Header />
      <Flex
        height="100vh"
        maxW="700px"
        margin="0 auto"
        justifyContent="center"
        alignItems="center"
      >
        <Flex
          boxShadow="lg"
          borderRadius="md"
          bg="white"
          width="100%"
          maxWidth="700px"
          p="50px 50px"
          justifyContent="center"
        >
          <form
            onSubmit={handleSubmit}
            style={{ width: '100%', maxWidth: '400px' }}
          >
            <FormControl
              display="flex"
              fontSize="24px"
              alignItems="center"
              mb="20px"
            >
              <FormLabel flex="1">Username</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                autoFocus
                flex="2"
                height="40px"
              />
            </FormControl>
            <FormControl
              display="flex"
              fontSize="24px"
              alignItems="center"
              mb="20px"
            >
              <FormLabel flex="1">Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                flex="2"
                height="40px"
              />
            </FormControl>
            <Button
              type="submit"
              width="100%"
              height="50px"
              cursor="pointer"
              bg="blue.300"
              _hover={{ bg: 'blue.400' }}
            >
              Login
            </Button>
          </form>
        </Flex>
      </Flex>
    </>
  );
};

export default LoginPage;

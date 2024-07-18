import { Box } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

type HeaderProps = {
  children?: ReactNode;
};

const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <Box
      as="header"
      width="100%"
      height="60px"
      bg="blue.300"
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
    >
      {children}
    </Box>
  );
};

export default Header;

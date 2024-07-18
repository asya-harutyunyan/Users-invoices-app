import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Radio,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { $apiClient } from '../../api/axios';
import { Invoice, InvoiceLine, Product } from '../../types';
import Header from '../../components/Header';

const InvoicesPage = () => {
  const [invoiceData, setInvoiceData] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
  const [invoiceLines, setInvoiceLines] = useState<InvoiceLine[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const params = useParams();
  const navigate = useNavigate();

  const handleRadioChange = (event: string) => {
    setSelectedInvoice(event);
  };

  useEffect(() => {
    $apiClient.get('/invoices').then((res) => {
      setInvoiceData(res.data.value);
    });
    $apiClient.get('/invoicelines').then((res) => {
      setInvoiceLines(res.data.value);
    });
    $apiClient.get('/products').then((res) => {
      setProducts(res.data.value);
    });
  }, []);

  const calculateTotalAmount = (invoiceId: string): number => {
    const invoiceLinesForInvoice = invoiceLines.filter(
      (line) => line.InvoiceId === invoiceId
    );

    const totalAmount = invoiceLinesForInvoice.reduce((total, line) => {
      const product = products.find(
        (prod) => prod.ProductId === line.ProductId
      );

      if (product) {
        total += line.Quantity * product.Price;
      }

      return total;
    }, 0);

    return totalAmount;
  };

  const calculateProductQuantity = (productId: string) => {
    return invoiceLines.reduce((acc, inv) => {
      if (inv.ProductId === productId && inv.InvoiceId === selectedInvoice) {
        acc += inv.Quantity;
      }
      return acc;
    }, 0);
  };

  return (
    <>
      <Header>
        <Menu>
          <MenuButton
            px="20px"
            py="5px"
            borderRadius="md"
            borderWidth="1px"
            bg="#fff"
            mr="40px"
            height="40px"
          >
            {params.userName}
          </MenuButton>
          <MenuList>
            <MenuItem
              as="button"
              onClick={() => {
                navigate('/');
                localStorage.setItem('isLoggedIn', 'false');
              }}
            >
              Log out
            </MenuItem>
          </MenuList>
        </Menu>
      </Header>
      <TableContainer mt="60px" px="20px">
        <Table>
          <Thead>
            <Tr>
              <Th></Th>
              <Th> Invoice Name</Th>
              <Th>Paid Date</Th>
              <Th>Total amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            {invoiceData
              .filter((user) => user.UserId === params.userId)
              .map((invoice, i: number) => (
                <Tr key={i}>
                  <Td>
                    <Radio
                      name="invoice"
                      value={invoice.Name}
                      onChange={() => handleRadioChange(invoice.InvoiceId)}
                      isChecked={selectedInvoice === invoice.InvoiceId}
                    />
                  </Td>
                  <Td>{invoice.Name}</Td>
                  <Td>{invoice.PaidDate}</Td>
                  <Td>{calculateTotalAmount(invoice.InvoiceId)} </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>

      {selectedInvoice && (
        <TableContainer mt="60px" px="20px">
          <Table>
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>Price per unit</Th>
                <Th>Quantity</Th>
                <Th>Total Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product, i: number) => (
                <Tr key={i}>
                  <Td>{product.Name}</Td>
                  <Td>{product.Price}</Td>
                  <Td>{calculateProductQuantity(product.ProductId)}</Td>
                  <Td>
                    {product.Price *
                      calculateProductQuantity(product.ProductId)}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default InvoicesPage;

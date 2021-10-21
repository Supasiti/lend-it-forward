import { Center, Spinner, Wrap, WrapItem } from '@chakra-ui/react';

import LoanCard from './LoanCard';
import { spinnerProps } from '../staticProps/spinner';
import { useGetLoans } from '../hooks/useGetLoans';

const LoanList = () => {
  const { loans, loading } = useGetLoans();

  if (loading) {
    return (
      <Center minH="64">
        <Spinner {...spinnerProps} />
      </Center>
    );
  }
  return (
    <Wrap w="100%" spacing="0px">
      {loans.map((loan) => (
        <WrapItem
          key={loan._id}
          w={{ base: '100%', sm: '50%', md: '33.33%', xl: '25%' }}
          p="2"
        >
          <LoanCard loan={loan} />
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default LoanList;

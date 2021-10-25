import { Center, Spinner } from '@chakra-ui/react';
// Wrap, WrapItem } from '@chakra-ui/react';
// import { useHistory } from 'react-router-dom';

// import LoanCard from './LoanCard';
import { spinnerProps } from '../staticProps/spinner';
import { useGetPendingLoans } from '../hooks/useGetPendingLoans';

const PendingLoanList = () => {
  useGetPendingLoans();
  // const history = useHistory();

  // if (loading) {
  return (
    <Center minH="64">
      <Spinner {...spinnerProps} />
    </Center>
  );
  // }
  // return (
  //   <Wrap w="100%" spacing="0px">
  //     {loans &&
  //       loans.map((loan) => (
  //         <WrapItem
  //           key={loan._id}
  //           w={{ base: '100%', sm: '50%', md: '33.33%', xl: '25%' }}
  //           p="2"
  //         >
  //           <LoanCard
  //             loan={loan}
  //             // onClick={() => history.push(`/library/${loan._id}`)}
  //           />
  //         </WrapItem>
  //       ))}
  //   </Wrap>
  // );
};

export default PendingLoanList;

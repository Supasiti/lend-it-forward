import { useQuery, gql } from '@apollo/client';
import { Center, Spinner, Wrap, WrapItem } from '@chakra-ui/react';
import { spinnerProps } from '../staticProps/spinner';

import { useLoan } from '../dependecies/LoanContext';
import auth from '../utils/auth';
import LoanCard from './LoanCard';
import { useEffect } from 'react';

const GET_LOANS = gql`
  query getLoans($filter: LoanFilterInput) {
    loans(filter: $filter) {
      _id
      title
      imageUrl
      category
      owner {
        _id
      }
      holder {
        _id
      }
    }
  }
`;

// TODO link each card to edit them

const LoanList = () => {
  const { loans, setLoans } = useLoan();
  const user = auth.getProfile();
  const variables = { filter: { owner: user._id } };
  const { data, loading } = useQuery(GET_LOANS, { variables });

  useEffect(() => {
    if (data?.loans?.length) {
      setLoans(data.loans);
    }
  }, [data]);

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

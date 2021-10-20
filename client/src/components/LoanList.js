import { useQuery, gql } from '@apollo/client';
import { Center, Wrap, WrapItem } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { spinnerProps } from '../staticProps/spinner';

import auth from '../utils/auth';
import LoanCard from './LoanCard';

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
  const user = auth.getProfile();
  const variables = { filter: { owner: user._id } };
  const { data, loading } = useQuery(GET_LOANS, { variables });

  if (loading) {
    return (
      <Center minH="64">
        <Spinner {...spinnerProps} />
      </Center>
    );
  }
  return (
    <Wrap w="100%" spacing="0px">
      {data &&
        data.loans.map((loan) => (
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

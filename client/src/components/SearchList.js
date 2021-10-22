import { Center, Spinner, Wrap, WrapItem } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';

import LoanCard from './LoanCard';
import { spinnerProps } from '../staticProps/spinner';
import { GET_LOANS } from '../gql/loans';

const SearchList = () => {
  const variables = { filter: { isAvailable: true } };
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
      {data?.loans &&
        data?.loans.map((loan) => (
          <WrapItem
            key={loan._id}
            w={{ base: '100%', sm: '50%', md: '33.33%', xl: '25%' }}
            p="2"
          >
            <LoanCard
              loan={loan}
              // onClick={() => history.push(`/library/${loan._id}`)}
            />
          </WrapItem>
        ))}
    </Wrap>
  );
};

export default SearchList;

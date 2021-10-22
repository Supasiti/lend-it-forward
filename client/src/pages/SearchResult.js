import { VStack, Heading } from '@chakra-ui/react';

import SearchList from '../components/SearchList';

const SearchResult = () => {
  return (
    <VStack w="100%" spacing="2">
      <Heading as="h1" fontSize={{ base: '2xl', sm: '5xl' }} color="peel">
        Search
      </Heading>

      <SearchList />
    </VStack>
  );
};

export default SearchResult;

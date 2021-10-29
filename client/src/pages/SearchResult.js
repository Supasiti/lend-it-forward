import { VStack, Box } from '@chakra-ui/react';

import SearchList from '../components/SearchList';
import SearchForm from '../components/SearchForm';

const SearchResult = () => {
  return (
    <VStack w="100%" spacing="2">
      <Box bg="bermuda" borderRadius="full" w="fit-content" mx="auto">
        <SearchForm />
      </Box>

      <SearchList />
    </VStack>
  );
};

export default SearchResult;

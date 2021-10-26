import {
  Flex,
  Circle,
  Spacer,
  FormControl,
  FormLabel,
  Input,
  HStack,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';
import { primaryBtnColorProps } from '../staticProps/button';
import { useForm } from '../hooks/useForm';
import { toUrlQuery } from '../utils/object';

const initialState = {
  owner: '',
};

// render
const SearchForm = () => {
  const history = useHistory();
  const { formState, handleChange } = useForm(initialState);

  const handleSearch = (e) => {
    e.preventDefault();
    const queryStr = toUrlQuery(formState);
    if (queryStr) {
      history.push(`/search?${queryStr}`);
    } else {
      history.push(`/search`);
    }
  };

  return (
    <Flex color="blackPearl" p="2" alignItems="center">
      <Spacer />
      <FormControl id="userSearch" px="3">
        <HStack spacing="0px">
          <FormLabel w="20%" m="0px" textAlign="right" pr="2">
            User
          </FormLabel>
          <Input
            w="80%"
            variant="filled"
            bg="sidecar"
            color="blackPearl"
            type="text"
            placeholder=""
            value={formState.owner || ''}
            _hover={{ opacity: 0.5 }}
            onChange={(e) => handleChange(e, 'owner')}
          />
        </HStack>
      </FormControl>
      <Spacer />
      <Circle size="12" {...primaryBtnColorProps} onClick={handleSearch}>
        <Search2Icon w="6" h="6" />
      </Circle>
    </Flex>
  );
};

export default SearchForm;

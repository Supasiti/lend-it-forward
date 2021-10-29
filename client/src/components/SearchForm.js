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

//  style
const containerProps = {
  color: 'blackPearl',
  p: { base: '1', sm: '2' },
  alignItems: 'center',
};

const inputProps = {
  w: '75%',
  fontSize: { base: 'sm', sm: 'md' },
  h: { base: '8', sm: '10' },
  // size: 'sm',
  rounded: 'lg',
  variant: 'filled',
  bg: 'sidecar',
  color: 'blackPearl',
  type: 'text',
  placeholder: '',
  _hover: { opacity: 0.5 },
};

const btnProps = {
  ...primaryBtnColorProps,
  size: { base: 8, sm: 12 },
};

const iconProps = {
  w: { base: '4', sm: '6' },
  h: { base: '4', sm: '6' },
};

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
    <Flex {...containerProps}>
      <Spacer />
      <FormControl id="userSearch" px="3">
        <HStack spacing="0px">
          <FormLabel w="25%" m="0px" textAlign="right" pr="2">
            User
          </FormLabel>
          <Input
            {...inputProps}
            value={formState.owner || ''}
            onChange={(e) => handleChange(e, 'owner')}
          />
        </HStack>
      </FormControl>
      <Spacer />
      <Circle {...btnProps} onClick={handleSearch}>
        <Search2Icon {...iconProps} />
      </Circle>
    </Flex>
  );
};

export default SearchForm;

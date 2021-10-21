import {
  Box,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';

import { cardProps } from '../staticProps/card';
import { squareProps } from '../staticProps/div';
import { spinnerProps } from '../staticProps/spinner';
import { validateNonEmpty } from '../utils/formValidators';
import { inputProps } from '../staticProps/input';
import useForm from '../hooks/useForm';

const GET_LOAN = gql`
  query getLoan($id: ID) {
    loan(_id: $id) {
      _id
      title
      description
      category
      owner {
        username
      }
      holder {
        username
      }
      reservedFor {
        username
      }
    }
  }
`;

const initialState = {
  title: '',
  description: '',
  category: '',
  isAvailable: false,
};

const canEditStatus = (form) => {
  return form?.owner?._id && form.owner._id === form?.holder?._id;
};

// render
const LoanDetail = ({ loanId }) => {
  const { data, loading } = useQuery(GET_LOAN, { variables: { id: loanId } });
  const { formState, setFormState, handleChange } = useForm(initialState);

  useEffect(() => {
    if (data?.loan) {
      setFormState(data.loan);
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
    <VStack spacing="4">
      <Box {...cardProps}>
        <Flex wrap="wrap" justify="center">
          <Box flexBasis="0 0" w={{ base: '100%', sm: '50%' }} p="4">
            <Box {...squareProps}>
              <div> image here</div>
            </Box>
          </Box>

          <Box flexBasis="0 0" w={{ base: '100%', sm: '50%' }} p="4">
            <VStack spacing={4} color="peel">
              {/* title */}
              <FormControl id="loanTitle">
                <FormLabel>Title</FormLabel>
                <Input
                  {...inputProps}
                  isRequired
                  type="text"
                  placeholder="Thinking Fast And Slow"
                  isInvalid={!validateNonEmpty(formState.title)}
                  value={formState.title}
                  onChange={(e) => handleChange(e, 'title')}
                />
              </FormControl>

              {/* description */}
              <FormControl id="loanDescription">
                <FormLabel>Description</FormLabel>
                <Textarea
                  {...inputProps}
                  isRequired
                  type="text"
                  placeholder="A book by Daniel Kahneman"
                  isInvalid={!validateNonEmpty(formState.description)}
                  value={formState.description}
                  onChange={(e) => handleChange(e, 'description')}
                />
              </FormControl>

              {/* category */}
              <FormControl id="loanCategory">
                <FormLabel>Category</FormLabel>
                <Input
                  {...inputProps}
                  isRequired
                  type="text"
                  placeholder="Books"
                  isInvalid={!validateNonEmpty(formState.category)}
                  value={formState.category}
                  onChange={(e) => handleChange(e, 'category')}
                />
              </FormControl>

              {/* Status */}
              {canEditStatus(formState) ? (
                <FormControl id="loanCategory">
                  <FormLabel>Category</FormLabel>
                  <Input
                    {...inputProps}
                    isRequired
                    type="text"
                    placeholder="Books"
                    isInvalid={!validateNonEmpty(formState.category)}
                    value={formState.category}
                    onChange={(e) => handleChange(e, 'category')}
                  />
                </FormControl>
              ) : (
                <Box w="100%" align="left">
                  <Text display="inline">Status: </Text>
                  <Text display="inline" color="sidecar">
                    On Loan
                  </Text>
                </Box>
              )}
            </VStack>
          </Box>
        </Flex>
      </Box>

      <Box {...cardProps}>location management</Box>
    </VStack>
  );
};

export default LoanDetail;

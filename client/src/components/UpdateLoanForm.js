import { Box, Text, VStack, Button } from '@chakra-ui/react';
// import gql from 'graphql-tag';
import { useEffect } from 'react';

import useForm from '../hooks/useForm';
import { TextInput, TextArea, ToggleSwitch } from './Input';
import { primaryBtnColorProps } from '../staticProps/button';

const initialState = {
  title: '',
  description: '',
  category: '',
  isAvailable: false,
};

const canEditStatus = (form) => {
  return form?.owner?._id && form.owner._id === form?.holder?._id
    ? true
    : false;
};

// render
const UpdateLoanForm = ({ loan }) => {
  const { formState, setFormState, handleChange } = useForm(initialState);

  useEffect(() => {
    if (loan) {
      setFormState(loan);
    }
  }, [loan]);

  return (
    <VStack spacing={4} color="peel">
      {/* title */}
      <TextInput
        id="loanTitle"
        label="Title"
        name="title"
        value={formState.title}
        placeholder="Thinking Fast And Slow"
        onChange={(e) => handleChange(e, 'title')}
      />

      {/* description */}
      <TextArea
        id="loanDescription"
        label="Description"
        name="description"
        value={formState.description}
        placeholder="A book by Daniel Kahneman"
        onChange={(e) => handleChange(e, 'description')}
      />

      {/* category */}
      <TextInput
        id="loanCategory"
        label="Category"
        name="category"
        value={formState.category}
        placeholder="Books"
        onChange={(e) => handleChange(e, 'category')}
      />

      {/* Status */}
      {canEditStatus(formState) ? (
        <ToggleSwitch
          id="loanAvailability"
          label="Availability"
          checked={formState.isAvailable}
          onChange={(e) => handleChange(e, 'isAvailable')}
        />
      ) : (
        <Box w="100%" align="left">
          <Text display="inline">Status: </Text>
          <Text display="inline" color="sidecar">
            On Loan
          </Text>
        </Box>
      )}

      <Button {...primaryBtnColorProps} w="100%">
        Save
      </Button>
    </VStack>
  );
};

export default UpdateLoanForm;

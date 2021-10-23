import { VStack, Button } from '@chakra-ui/react';
import { useEffect } from 'react';

import useForm from '../hooks/useForm';
import { TextInput, TextArea, UserSelect } from './Input';
import { primaryBtnColorProps } from '../staticProps/button';
import { useUpdateLoan } from '../hooks/useUpdateLoan';

const initialState = {
  _id: '',
  title: '',
  description: '',
  category: '',
  status: 'unavailable',
};

const extractFormState = (loan, initialState) => {
  const result = Object.entries(loan).reduce((acc, [key, value]) => {
    return key in initialState ? { ...acc, [key]: value } : { ...acc };
  }, initialState);
  return result;
};

// render
const UpdateLoanForm = ({ loan }) => {
  const { formState, setFormState, handleChange } = useForm(initialState);
  const [updateLoan] = useUpdateLoan();

  // set the form state from props
  useEffect(() => {
    if (loan) {
      const newFormState = extractFormState(loan, initialState);
      console.log(newFormState);
      setFormState(newFormState);
    }
  }, [loan]);

  // handle form submission
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const loanInput = { loan: { ...formState } };
    console.log(formState);
    updateLoan({ variables: loanInput });
  };

  return (
    <VStack spacing={4} color="peel">
      {/* title */}
      <TextInput
        id="loanTitle"
        label="Title"
        name="title"
        value={formState.title || ''}
        placeholder="Thinking Fast And Slow"
        onChange={(e) => handleChange(e, 'title')}
      />

      {/* description */}
      <TextArea
        id="loanDescription"
        label="Description"
        name="description"
        value={formState.description || ''}
        placeholder="A book by Daniel Kahneman"
        onChange={(e) => handleChange(e, 'description')}
      />

      {/* category */}
      <TextInput
        id="loanCategory"
        label="Category"
        name="category"
        value={formState.category || ''}
        placeholder="Books"
        onChange={(e) => handleChange(e, 'category')}
      />

      {/* Status */}
      <UserSelect
        id="loanStatus"
        label="Status"
        value={formState.status || initialState.status}
        onChange={(e) => handleChange(e, 'status')}
      >
        <option value="unavailable">Unavailable</option>
        <option value="available">Available</option>
      </UserSelect>

      <Button {...primaryBtnColorProps} w="100%" onClick={handleSubmitForm}>
        Save
      </Button>
    </VStack>
  );
};

export default UpdateLoanForm;

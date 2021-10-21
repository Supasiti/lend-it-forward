import {
  Button,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';

import BaseModal from './Modal';
import useForm from '../hooks/useForm';
import { capitalize } from '../utils/text';
import { useLoan } from '../dependecies/LoanContext';
import { primaryBtnColorProps } from '../staticProps/button';
import { TextInput, TextArea } from './Input';
import { ADD_LOAN } from '../gql/loans';

const initialState = {
  title: '',
  description: '',
  category: '',
};

// TODO : Suggest categories as you type

const AddLoanForm = ({ isOpen, onClose }) => {
  const { addLoan: addLoanContext } = useLoan();
  const { formState, handleChange } = useForm(initialState);
  const [addLoan] = useMutation(ADD_LOAN);

  // handle form submission
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const data = {
      loan: { ...formState, category: capitalize(formState.category) },
    };
    const res = await addLoan({ variables: data });

    // TODO better response handling
    if (res.data) {
      addLoanContext(res.data.addLoan);
      onClose();
    } else {
      console.log(res.errors);
    }
  };

  return (
    <BaseModal onClose={onClose} isOpen={isOpen}>
      <ModalHeader>Add New Item</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
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
        </VStack>
      </ModalBody>
      <ModalFooter>
        <Button {...primaryBtnColorProps} onClick={handleSubmitForm}>
          Save
        </Button>
      </ModalFooter>
    </BaseModal>
  );
};

export default AddLoanForm;

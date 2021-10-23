import {
  Button,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
} from '@chakra-ui/react';

import BaseModal from './Modal';
import useForm from '../hooks/useForm';
import { capitalize } from '../utils/text';
import { primaryBtnColorProps } from '../staticProps/button';
import { TextInput, TextArea } from './Input';
import { useAddLoan } from '../hooks/useAddLoan';
import { useEffect } from 'react';

const initialState = {
  title: '',
  description: '',
  category: '',
};

// TODO : Suggest categories as you type
// TODO better response handling

const AddLoanForm = ({ isOpen, onClose }) => {
  const { formState, handleChange } = useForm(initialState);
  const [addLoan, { data }] = useAddLoan();

  // to close when a loan is added
  useEffect(() => {
    if (data?.addLoan) {
      onClose();
    }
  }, [data]);

  // handle form submission
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const input = {
      loan: { ...formState, category: capitalize(formState.category) },
    };
    addLoan({ variables: input });
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

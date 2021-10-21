import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import BaseModal from './Modal';
import useForm from '../hooks/useForm';
import { capitalize } from '../utils/text';
import { useLoan } from '../dependecies/LoanContext';
import { validateNonEmpty } from '../utils/formValidators';
import { primaryBtnColorProps } from '../staticProps/button';

const ADD_LOAN = gql`
  mutation addLoan($loan: AddLoanInput) {
    addLoan(loan: $loan) {
      _id
      title
      imageUrl
      category
      owner {
        _id
      }
      holder {
        _id
      }
    }
  }
`;

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
          <FormControl id="loanTitle">
            <FormLabel>Title</FormLabel>
            <Input
              isRequired
              type="text"
              placeholder="Thinking Fast And Slow"
              errorBorderColor="rust"
              isInvalid={!validateNonEmpty(formState.title)}
              value={formState.title}
              onChange={(e) => handleChange(e, 'title')}
            />
          </FormControl>

          {/* description */}
          <FormControl id="loanDescription">
            <FormLabel>Description</FormLabel>
            <Textarea
              isRequired
              type="text"
              placeholder="A book by Daniel Kahneman"
              errorBorderColor="rust"
              isInvalid={!validateNonEmpty(formState.description)}
              value={formState.description}
              onChange={(e) => handleChange(e, 'description')}
            />
          </FormControl>

          {/* description */}
          <FormControl id="loanCategory">
            <FormLabel>Category</FormLabel>
            <Input
              isRequired
              type="text"
              placeholder="Books"
              errorBorderColor="rust"
              isInvalid={!validateNonEmpty(formState.category)}
              value={formState.category}
              onChange={(e) => handleChange(e, 'category')}
            />
          </FormControl>
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

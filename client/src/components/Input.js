import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Switch,
  Select,
} from '@chakra-ui/react';
import { validateNonEmpty } from '../utils/formValidators';

import color from '../constants/colors';

export const inputProps = {
  color: 'sidecar',
  focusBorderColor: 'darkCyan',
  errorBorderColor: 'rust',
  sx: {
    // infill input
    ':-webkit-autofill': {
      boxShadow: `0 0 0px 1000px ${color.gray[600]} inset`,
      WebkitTextFillColor: `${color.sidecar}`,
    },
    ':-webkit-autofill:active': {
      boxShadow: `0 0 0px 1000px ${color.gray[600]} inset`,
      WebkitTextFillColor: `${color.sidecar}`,
    },
  },
};

export const helperProps = {
  as: 'p',
  fontSize: 'sm',
};

export const TextInput = ({ id, label, ...props }) => (
  <FormControl id={id}>
    <FormLabel>{label}</FormLabel>
    <Input
      {...props}
      {...inputProps}
      isRequired
      type="text"
      isInvalid={!validateNonEmpty(props.value)}
    />
  </FormControl>
);

export const TextArea = ({ id, label, ...props }) => (
  <FormControl id={id}>
    <FormLabel>{label}</FormLabel>
    <Textarea
      {...props}
      {...inputProps}
      isRequired
      type="text"
      isInvalid={!validateNonEmpty(props.value)}
    />
  </FormControl>
);

export const ToggleSwitch = ({ id, label, ...props }) => (
  <FormControl display="flex" alignItems="center">
    <FormLabel htmlFor={id} mb="0px">
      {label}
    </FormLabel>
    <Switch {...props} id={id} size="md" />
  </FormControl>
);

export const UserSelect = ({ id, label, ...props }) => (
  <FormControl id={id}>
    <FormLabel>{label}</FormLabel>
    <Select {...props}> {props.children}</Select>
  </FormControl>
);

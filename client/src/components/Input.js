import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Switch,
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

export const TextInput = ({ id, ...props }) => (
  <FormControl id={id}>
    <FormLabel>{props.label}</FormLabel>
    <Input
      {...props}
      {...inputProps}
      isRequired
      type="text"
      isInvalid={!validateNonEmpty(props.value)}
      value={props.value || ''}
    />
  </FormControl>
);

export const TextArea = ({ id, ...props }) => (
  <FormControl id={id}>
    <FormLabel>{props.label}</FormLabel>
    <Textarea
      {...props}
      {...inputProps}
      isRequired
      type="text"
      isInvalid={!validateNonEmpty(props.value)}
      value={props.value || ''}
    />
  </FormControl>
);

export const ToggleSwitch = ({ id, ...props }) => (
  <FormControl display="flex" alignItems="center">
    <FormLabel htmlFor={id} mb="0px">
      {props.label}
    </FormLabel>
    <Switch {...props} id={id} size="md" />
  </FormControl>
);

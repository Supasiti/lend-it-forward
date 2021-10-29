import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';

// params
export const toastParams = (status, message) => ({
  description: message,
  position: 'top-right',
  status: status,
  duration: 2000,
  isClosable: true,
});

// add responsive toast with default error
export const useChakraToast = (error, setError) => {
  const toast = useToast();

  // on login error
  useEffect(() => {
    if (error) {
      toast(toastParams('error', error));
      setError('');
    }
  }, [error]);

  const chakraToast = (status, message) => {
    toast(toastParams(status, message));
  };

  return { chakraToast };
};

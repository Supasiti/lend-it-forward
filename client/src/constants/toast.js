export const toastParams = (status, message) => ({
  description: message,
  position: 'top-right',
  status: status,
  duration: 4000,
  isClosable: true,
});

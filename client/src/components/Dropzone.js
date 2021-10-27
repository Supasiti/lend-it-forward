import { Box, Input, Center } from '@chakra-ui/react';

//render
const Dropzone = () => {
  return (
    <Box bg="bermuda" w="100%" h="100%">
      <Center h="100%">asdf</Center>
      <Center>asdf</Center>
      <Center>asdf</Center>
      <Center>asdf</Center>

      <Input
        display="none"
        type="file"
        id="imagePicker"
        accept="image/jpeg, image/png"
        required
      />
    </Box>
  );
};

export default Dropzone;

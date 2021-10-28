import { Box } from '@chakra-ui/react';

export const squareProps = {
  pos: 'relative',
  w: '100%',
  h: '0px',
  bg: 'gunmetal',
  rounded: 'lg',
  pb: '100%',
};

export const Square = (props) => {
  return (
    <Box {...squareProps} overflow="hidden" {...props}>
      <Box pos="absolute" top="0" bottom="0" right="0" left="0">
        {props.children}
      </Box>
    </Box>
  );
};

export default Square;

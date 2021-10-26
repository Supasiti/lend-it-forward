import { Flex, Box, Text, Button } from '@chakra-ui/react';
import { useEffect } from 'react';

import { helperProps } from './Input';
import { primaryBtnColorProps } from '../staticProps/button';
import { useLeaveWaitList } from '../hooks/useLeaveWaitList';
import { useChakraToast } from '../hooks/useChakraToast';
import { useHistory } from 'react-router-dom';

// styling
const containerProps = {
  flexBasis: '0 0',
  w: { base: '100%', md: '66.66%' },
  p: '4',
  spacing: '3',
};

const helperContainerProps = {
  flexBasis: '0 0',
  w: { base: '100%', md: '33.33%' },
  p: '4',
};

// render
const LeaveWaitList = ({ queuer }) => {
  const { leaveWaitList, res, error, setError } = useLeaveWaitList();
  const { chakraToast } = useChakraToast(error, setError);
  const history = useHistory();

  // call when successfull leave the waiting list
  useEffect(() => {
    if (res?.success) {
      chakraToast('success', 'Successfully leave the waiting list!');
      history.push('/library');
    }
  }, [res]);

  // leave the waiting list
  const handleClick = () => {
    if (queuer?._id) {
      leaveWaitList(queuer._id);
    }
  };

  return (
    <Flex wrap="wrap" alignItems="center">
      {/* instruction */}
      <Box {...containerProps}>
        <Text color="peel">Instruction</Text>
        <Text {...helperProps} mt="3">
          If you don&apos;t wish to borrow this item anymore, you can leave the
          waiting list.
        </Text>
      </Box>

      {/* button */}
      <Box {...helperContainerProps} textAlign="center">
        <Button {...primaryBtnColorProps} onClick={handleClick}>
          Leave the waiting list
        </Button>
      </Box>
    </Flex>
  );
};

export default LeaveWaitList;

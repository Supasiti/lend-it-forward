import { Badge } from '@chakra-ui/react';

// 3 available statuses :
//   - on loan: not with the owner
//   - available: with the owner and available
//   - unavailable: with the owner and available

const baseProps = {
  borderRadius: 'full',
  px: '2',
  color: 'sidecar',
};

// render
const StatusBadge = ({ loan }) => {
  const isHere = loan?.owner?._id === loan?.holder?._id;

  if (isHere) {
    return loan.isAvailable ? (
      <Badge {...baseProps} bg="darkCyan">
        available
      </Badge>
    ) : (
      <Badge {...baseProps} bg="rust">
        unavailable
      </Badge>
    );
  }

  //default - on loan
  return (
    <Badge {...baseProps} bg="rust">
      on loan
    </Badge>
  );
};

export default StatusBadge;

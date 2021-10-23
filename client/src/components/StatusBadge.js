import { Badge } from '@chakra-ui/react';

const baseProps = {
  borderRadius: 'full',
  px: '2',
};

const statusMap = {
  unavailable: { bg: 'peel', color: 'blackPearl' },
  available: { bg: 'darkCyan', color: 'sidecar' },
  reserved: { bg: 'darkCyan', color: 'sidecar' },
  onLoan: { bg: 'rust', color: 'sidecar' },
  returning: { bg: 'rust', color: 'sidecar' },
};

// render
const StatusBadge = ({ loan }) => (
  <Badge {...baseProps} {...statusMap[loan.status]}>
    {loan.status}
  </Badge>
);

export default StatusBadge;

import { useParams } from 'react-router';

const LoanDetail = () => {
  const { loanId } = useParams();
  return <div>Hello {loanId} </div>;
};
export default LoanDetail;

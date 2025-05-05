import { Loan } from '@/types/loan';
  
  type LoanCardProps = {
    loan: Loan;
    children: React.ReactNode; // The button component will be passed as children
  };
  
  const LoanCard = ({ loan, children }: LoanCardProps) => {
    return (
      <div
        key={loan.id}
        className="p-6 rounded-2xl shadow-md hover:shadow-lg border border-green-100 bg-green-50"
      >
        {/* Top row: Amount and button */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-green-700">${loan.amount}</h3>
          {children}
        </div>
  
        {/* Info row: Duration, Credit Score, Interest Count */}
        <div className="flex flex-wrap text-sm text-gray-700 gap-4 mb-3">
          <span>
            <strong>Duration:</strong> {loan.duration} months
          </span>
          <span>
            <strong>Credit Score:</strong> {loan.credit_score}
          </span>
          <span>
            <strong>Interest Count:</strong> {loan.interest_count}
          </span>
        </div>
  
        {/* Purpose */}
        <p className="text-gray-600">
          <strong>Purpose:</strong> {loan.purpose}
        </p>
      </div>
    );
  };
  
  export default LoanCard;
  
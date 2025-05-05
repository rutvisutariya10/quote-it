import { Loan } from "@/types/loan";

type BorrowerCardProps = {
  loan: Loan;
};

const BorrowerCard = ({ loan }: BorrowerCardProps) => {
  return (
    <div className="p-4 border border-blue-200 rounded-md shadow-sm bg-blue-50">
      {/* First row: Amount, Duration, Credit Score */}
      <div className="flex flex-wrap gap-6 text-sm text-gray-800 mb-2">
        <p className="flex-1">
          <strong>Amount:</strong> ${loan.amount}
        </p>
        <p className="flex-1">
          <strong>Duration:</strong> {loan.duration} months
        </p>
        <p className="flex-1">
          <strong>Credit Score:</strong> {loan.credit_score}
        </p>
      </div>

      {/* Second row: Purpose */}
      <p className="text-sm text-gray-700">
        <strong>Purpose:</strong> {loan.purpose}
      </p>
    </div>
  );
};

export default BorrowerCard;

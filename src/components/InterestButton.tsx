import { supabase } from '@/lib/supabaseClient';
import { Loan } from '@/types/loan';

type InterestButtonProps = {
  loanId: number;
  hasExpressedInterest: boolean;
  userId: string | null;
  userEmail: string | null;
  setInterestedLoanIds: React.Dispatch<React.SetStateAction<number[]>>;
  setLoans: React.Dispatch<React.SetStateAction<Loan[]>>; // Use proper type for setLoans
};

const InterestButton = ({
  loanId,
  hasExpressedInterest,
  userId,
  userEmail,
  setInterestedLoanIds,
  setLoans,
}: InterestButtonProps) => {
  const handleExpressInterest = async () => {
    if (!userId || hasExpressedInterest) return;

    try {
      const { error: insertError } = await supabase
        .from('interests')
        .insert([{ loan_id: loanId, user_id: userId, user_email: userEmail }]);

      if (insertError) throw insertError;

      // Increment interest_count
      const { data: loan, error: fetchError } = await supabase
        .from('loans')
        .select('interest_count')
        .eq('id', loanId)
        .single();

      if (fetchError) throw fetchError;

      const newInterestCount = loan?.interest_count + 1;
      const { error: updateError } = await supabase
        .from('loans')
        .update({ interest_count: newInterestCount })
        .eq('id', loanId);

      if (updateError) throw updateError;

      // Update loans state with new interest count
      setLoans((prev) =>
        prev.map((loan) =>
          loan.id === loanId
            ? { ...loan, interest_count: newInterestCount }
            : loan
        )
      );

      // Update the list of loans that the user has expressed interest in
      setInterestedLoanIds((prev) => [...prev, loanId]);
    } catch (error) {
      console.error('Error expressing interest:', error);
    }
  };

  return (
    <button
      className={`py-2 px-4 text-sm rounded-md font-medium transition ${
        hasExpressedInterest
          ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
          : 'bg-green-600 text-white hover:bg-green-700'
      }`}
      onClick={handleExpressInterest}
      disabled={hasExpressedInterest}
    >
      {hasExpressedInterest ? 'Interest Expressed' : 'Express Interest'}
    </button>
  );
};

export default InterestButton;

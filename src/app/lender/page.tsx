'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { getLoansLender } from '@/lib/loan';
import LoanFilter from '@/components/LoanFilter';
import { Loan } from '@/types/loan';

export default function LenderPage() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [interestedLoanIds, setInterestedLoanIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user?.id) {
        router.push('/auth');
        return;
      }

      const currentUserId = userData.user.id;
      setUserId(currentUserId);

      const fetchedLoans = await getLoansLender(currentUserId);
      setLoans(fetchedLoans);

      const { data: interestsData, error: interestError } = await supabase
        .from('interests')
        .select('loan_id')
        .eq('user_id', currentUserId);

      if (interestError) throw interestError;
      setInterestedLoanIds(interestsData.map((i) => i.loan_id));
      setLoading(false);
    };

    fetchData();
  }, [router]);

  if (loading) return <p className="text-center mt-10">Loading loan requests...</p>;

  return (
    <div className="bg-[#ECECD9] min-h-[80vh]">
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Available Loan Requests</h1>
        <LoanFilter
          loans={loans}
          userId={userId}
          interestedLoanIds={interestedLoanIds}
          setInterestedLoanIds={setInterestedLoanIds}
          setLoans={setLoans}
        />
      </div>
    </div>
  );
}

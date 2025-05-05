'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { getLoansBorrower } from '@/lib/loan';
import BorrowerForm from '@/components/BorrowerForm';
import { Loan } from '@/types/loan';
import { User } from '@supabase/auth-js';

export default function BorrowerPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data?.session) {
        router.push('/auth');
      } else {
        setUser(data.session.user);
      }
    };
    checkSession();
  }, [router]);

  useEffect(() => {
    const fetchLoans = async () => {
      if (!user) return;
  
      try {
        const data = await getLoansBorrower(user.id); 
        setLoans(data);
      } catch (error) {
        console.error('Error fetching loans:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchLoans();
  }, [user]); // ✅ make sure `user` is in the dependency array
  

  const handleLoanCreated = (newLoan: Loan) => {
    setLoans((prevLoans) => [newLoan, ...prevLoans]);
    setShowForm(false);
  };

  if (!user || loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Hello Borrower 👋</h1>

      {loans.length === 0 ? (
        <div className="text-center space-y-4">
          <p className="text-gray-700 text-lg">No loan requests yet.</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create a Loan Request
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {loans.map((loan) => (
              <div
                key={loan.id}
                className="p-4 border border-gray-200 rounded-md shadow-sm bg-white"
              >
                <p><strong>Amount:</strong> ${loan.amount}</p>
                <p><strong>Purpose:</strong> {loan.purpose}</p>
                <p><strong>Duration:</strong> {loan.duration} months</p>
                <p><strong>Credit Score:</strong> {loan.credit_score}</p>
              </div>
            ))}
          </div>

          <div className="text-center mb-4">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {showForm ? 'Hide Form' : 'Create New Loan Request'}
            </button>
          </div>
        </>
      )}

      {showForm && (
        <div className="mt-6">
          <BorrowerForm onLoanCreated={handleLoanCreated} />
        </div>
      )}
    </div>
  );
}

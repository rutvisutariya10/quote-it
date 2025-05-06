"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { getLoansBorrower } from "@/lib/loan";
import BorrowerForm from "@/components/BorrowerForm";
import { Loan } from "@/types/loan";
import { User } from "@supabase/auth-js";
import FlipCard from "@/components/FlipCard";


export default function BorrowerPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data?.session) {
        router.push("/auth");
      } else {
        setUser(data.session.user);
        const name = data.session?.user?.email?.split("@")[0];
        setUsername(name || "Borrower");
      }
    };
    checkSession();
  }, [router]);

  useEffect(() => {
    const fetchLoans = async () => {
      if (!user) return;

      try {
        const data = await getLoansBorrower(user.id);
        console.log(data)
        setLoans(data);
      } catch (error) {
        console.error("Error fetching loans:", error);
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
    return <p className="bg-[#ECECD9] min-h-[80vh] text-center mt-10 ">Loading...</p>;
  }

  return (
    <div className="bg-[#ECECD9] min-h-[80vh]">
      <div className="max-w-2xl mx-auto py-10 px-4">
        <div className="flex mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            Hello {username} 👋
          </h1>
          <div className="text-center ml-auto">
            <button
              onClick={() => setShowForm(true)}
              className="w-full py-2 px-4 bg-blue-400 text-white font-semibold rounded-md hover:bg-white hover:text-blue-500 ring hover:ring-blue-500 transition"
            >
              New Request
            </button>
          </div>
        </div>

        {loans.length === 0 ? (
          <div className="text-center space-y-4">
            <p className="text-gray-700 text-lg">No loan requests yet.</p>
          </div>
        ) : (
          <div className="space-y-4 mb-6">
          {loans.map((loan) => (
            <FlipCard key={loan.id} loan={loan} />
          ))}
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 z-50 mt-40 flex items-center justify-center">
            <div className="relative bg-white border-2 border-gray-300 w-full max-w-md p-6 mx-auto rounded-xl shadow-lg">
              {/* Close Button */}
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
              >
                &times;
              </button>
              <BorrowerForm onLoanCreated={handleLoanCreated} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import BorrowerCard from "@/components/BorrowerCard";
import { Loan } from "@/types/loan";
import { supabase } from "@/lib/supabaseClient";

type FlipCardProps = {
  loan: Loan;
};

export default function FlipCard({ loan }: FlipCardProps ) {
  const [flipped, setFlipped] = useState(false);
  const [emails,setEmails] = useState<string[] | null>(null);

  useEffect(() => {
    const getInterestedEmails = async () => {
      const { data, error } = await supabase
        .from("interests")
        .select("user_email")
        .eq("loan_id", loan.id);

      if (error || !data) {
        setEmails([]);
        return;
      }

      const userEmails = data.map((entry) => entry.user_email);

      if (userEmails.length === 0) {
        setEmails([]);
        return;
      }

      setEmails(userEmails);
    };

    getInterestedEmails();
  }, [loan.id]);



  return (
    <div
      className="relative w-full h-full cursor-pointer perspective"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden">
            <BorrowerCard key={loan.id} loan={loan} />
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 ">
        {emails && emails.length > 0 ? (
        <div className="p-4 bg-gray-100 rounded-md shadow-sm">
            <p className="font-semibold mb-2">
            Number of Lenders that have shown interest: {emails.length}
            </p>
            <p className="font-medium mb-1">Here are their emails:</p>
            <ul className="list-disc list-inside text-sm text-gray-700">
                {emails.map((email, index) => {
                    const [local, domain] = email.split('@');
                    const maskedLocal = local.length > 3 
                    ? local.slice(0, 3) + '*'.repeat(local.length - 3)
                    : '*'.repeat(local.length);
                    return (
                    <li key={index}>{`${maskedLocal}@${domain}`}</li>
                    );
                })}
                </ul>

        </div>
        ) : (
        <div className="p-4 bg-yellow-50 rounded-md text-yellow-700">
            No lenders have shown interest yet.
        </div>
        )}

        </div>
      </div>
    </div>
  );
}

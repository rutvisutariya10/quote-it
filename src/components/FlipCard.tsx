'use client';

import { useState, useEffect } from 'react';
import BorrowerCard from "@/components/BorrowerCard";
import { Loan } from "@/types/loan";
import { supabase } from "@/lib/supabaseClient";

type FlipCardProps = {
  loan: Loan;
};

export default function FlipCard({ loan }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [emails, setEmails] = useState<string[] | null>(null);

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
      setEmails(userEmails.length > 0 ? userEmails : []);
    };

    getInterestedEmails();
  }, [loan.id]);

  return (
    <div
      className="relative w-full h-32 cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden">
          <BorrowerCard loan={loan} />
        </div>

        {/* Back */}
        <div className="absolute inset-0 text-gray-700 backface-hidden rotate-y-180 bg-gray-100 p-4 rounded-md shadow-sm overflow-y-auto">
          {emails && emails.length > 0 ? (
            <>
              <p className="font-semibold mb-2">
                Number of Lenders that have shown interest: {emails.length}
              </p>
              <p className="font-medium mb-1">Here are their emails:</p>
              <ul className="list-disc list-inside text-sm">
                {emails.map((email, index) => {
                  const [local, domain] = email.split('@');
                  const maskedLocal =
                    local.length > 3
                      ? local.slice(0, 3) + '*'.repeat(local.length - 3)
                      : '*'.repeat(local.length);
                  return (
                    <li key={index}>{`${maskedLocal}@${domain}`}</li>
                  );
                })}
              </ul>
            </>
          ) : (
            <div className="py-4 text-gray-700">
              No lenders have shown interest yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

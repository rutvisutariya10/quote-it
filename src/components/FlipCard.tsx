'use client';

import { useState } from 'react';
import BorrowerCard from "@/components/BorrowerCard";
import { Loan } from "@/types/loan";
// import { supabase } from "@/lib/supabaseClient";

type FlipCardProps = {
  loan: Loan;
};

export default function FlipCard({ loan }: FlipCardProps ) {
  const [flipped, setFlipped] = useState(false);
//   const [emails,setEmails] = useState<string[] | null>(null);

//   const getInterestedEmails = async () => {
//     const { data } = await supabase
//     .from('interests')
//     .select('*')
//     .eq('loan_id', loan.id); 

    // if(!data) {
    //     setEmails([]);
    // } else {
    //     if (Array.isArray(data)) {
    //         const extractedEmails = data.map((item) => {
    //             const
    //         });
    //         setEmails(extractedEmails);
    //       }
    // }
//   }
  


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
          <div className="text-2xl font-bold bg-red-600 text-white flex items-center justify-center rounded-lg">Boom</div>
        </div>
      </div>
    </div>
  );
}

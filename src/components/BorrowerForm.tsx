'use client';

import { useState } from 'react';
import { createLoan } from '../lib/loan';
import { Loan } from '@/types/loan';

type BorrowerFormProps = {
  onLoanCreated?: (loan: Loan) => void;
};

export default function BorrowerForm({ onLoanCreated }: BorrowerFormProps) {
  const [amount, setAmount] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [creditScore, setCreditScore] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loan = {
      amount: Number(amount),
      purpose,
      duration: Number(duration),
      credit_score: creditScore,
    };

    try {
      const newLoan = await createLoan(loan);
      alert('Loan request created!');
      onLoanCreated?.(newLoan);
      setAmount('');
      setPurpose('');
      setDuration('');
      setCreditScore('');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert('Error creating loan: ' + errorMessage);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Loan Request Form
      </h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Loan Amount"
        required
        className="w-full px-4 py-2 text-gray-800 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:bg-blue-50"
      />

      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Duration (months)"
        required
        className="w-full px-4 py-2 text-gray-800 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:bg-blue-50"
      />

      <input
        type="text"
        value={creditScore}
        onChange={(e) => setCreditScore(e.target.value)}
        placeholder="Credit Score"
        required
        className="w-full px-4 py-2 border text-gray-800 placeholder-gray-500 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:bg-blue-50"
      />

      <input
        type="text"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
        placeholder="Purpose"
        required
        className="w-full px-4 py-5 border text-gray-800 placeholder-gray-500 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:bg-blue-50"
      />

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-400 text-white font-semibold rounded-md hover:bg-white hover:text-blue-500 ring hover:ring-blue-500 transition"
      >
        Submit Loan Request
      </button>
    </form>
  );
}

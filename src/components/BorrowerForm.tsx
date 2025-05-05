'use client';

import { useState } from 'react';
import { createLoan } from '../lib/loan';

export default function BorrowerForm({ onLoanCreated }) {
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [duration, setDuration] = useState('');
  const [creditScore, setCreditScore] = useState('');

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
    } catch (error: any) {
      alert('Error creating loan: ' + error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4"
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
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
        placeholder="Purpose"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Duration (months)"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        value={creditScore}
        onChange={(e) => setCreditScore(e.target.value)}
        placeholder="Credit Score"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
      >
        Submit Loan Request
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";
import LoanCard from "./LoanCard";
import InterestButton from "./InterestButton";
import { Loan } from "@/types/loan";

type Props = {
  loans: Loan[];
  userId: string | null;
  interestedLoanIds: number[];
  setInterestedLoanIds: React.Dispatch<React.SetStateAction<number[]>>;
  setLoans: React.Dispatch<React.SetStateAction<Loan[]>>;
};

type CreditScoreRange = "all" | "low" | "medium" | "high";
type InterestStatus = "all" | "expressed" | "not-expressed";

export default function LoanFilter({
  loans,
  userId,
  interestedLoanIds,
  setInterestedLoanIds,
  setLoans,
}: Props) {
  const [duration, setDuration] = useState<number | null>(null);
  const [creditScoreRange, setCreditScoreRange] =
    useState<CreditScoreRange>("all");
  const [amountMin, setAmountMin] = useState<number | null>(null);
  const [amountMax, setAmountMax] = useState<number | null>(null);
  const [interestSort, setInterestSort] = useState<
    "high-to-low" | "low-to-high"
  >("high-to-low");
  const [interestStatus, setInterestStatus] = useState<InterestStatus>("all");

  const filterLoans = () => {
    return loans.filter((loan) => {
      const matchesDuration = duration ? loan.duration === duration : true;

      const matchesCreditScore =
        creditScoreRange === "all"
          ? true
          : creditScoreRange === "low"
          ? loan.credit_score < 600
          : creditScoreRange === "medium"
          ? loan.credit_score >= 600 && loan.credit_score < 750
          : loan.credit_score >= 750;

      const matchesAmount =
        (amountMin ? loan.amount >= amountMin : true) &&
        (amountMax ? loan.amount <= amountMax : true);

      const matchesInterestStatus =
        interestStatus === "all"
          ? true
          : interestStatus === "expressed"
          ? interestedLoanIds.includes(loan.id)
          : !interestedLoanIds.includes(loan.id);

      return (
        matchesDuration &&
        matchesCreditScore &&
        matchesAmount &&
        matchesInterestStatus
      );
    });
  };

  const sortedLoans = () => {
    const filteredLoans = filterLoans();

    return filteredLoans.sort((a, b) => {
      if (interestSort === "high-to-low") {
        return b.interest_count - a.interest_count;
      }
      return a.interest_count - b.interest_count;
    });
  };

  const filteredAndSortedLoans = sortedLoans();

  return (
    <div className="space-y-6">
      {/* === Top Filters === */}
      <div className="mb-6">
        <div className="flex gap-4">
          {/* Amount Range */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Amount Range
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                className="flex-1 w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Min"
                value={amountMin || ""}
                onChange={(e) =>
                  setAmountMin(e.target.value ? parseInt(e.target.value) : null)
                }
              />
              <input
                type="number"
                className="flex-1 w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Max"
                value={amountMax || ""}
                onChange={(e) =>
                  setAmountMax(e.target.value ? parseInt(e.target.value) : null)
                }
              />
            </div>
          </div>

          {/* Sort */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Sort by Interest Count
            </label>
            <select
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={interestSort}
              onChange={(e) =>
                setInterestSort(e.target.value as "high-to-low" | "low-to-high")
              }
            >
              <option value="high-to-low">High to Low</option>
              <option value="low-to-high">Low to High</option>
            </select>
          </div>
        </div>
      </div>

      {/* === Additional Filters === */}
      <div className="mb-6">
        <div className="flex gap-4">
          {/* Duration */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Duration
            </label>
            <select
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={duration || ""}
              onChange={(e) =>
                setDuration(e.target.value ? parseInt(e.target.value) : null)
              }
            >
              <option value="">All</option>
              <option value="6">6 months</option>
              <option value="12">12 months</option>
              <option value="24">24 months</option>
              <option value="36">36 months</option>
            </select>
          </div>

          {/* Credit Score */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Credit Score Range
            </label>
            <select
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={creditScoreRange}
              onChange={(e) =>
                setCreditScoreRange(e.target.value as CreditScoreRange)
              }
            >
              <option value="all">All</option>
              <option value="low">Low (&lt; 600)</option>
              <option value="medium">Medium (600–749)</option>
              <option value="high">High (750+)</option>
            </select>
          </div>

          {/* Interest Status */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Your Interest Status
            </label>
            <select
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={interestStatus}
              onChange={(e) =>
                setInterestStatus(e.target.value as InterestStatus)
              }
            >
              <option value="all">All</option>
              <option value="expressed">Expressed</option>
              <option value="not-expressed">Not Expressed</option>
            </select>
          </div>
        </div>
      </div>

      {/* === Loan Cards === */}
      {filteredAndSortedLoans.length === 0 ? (
        <p className="text-center text-gray-500">
          No matching loan requests found.
        </p>
      ) : (
        <div className="space-y-6">
          {filteredAndSortedLoans.map((loan) => {
            const hasExpressedInterest = interestedLoanIds.includes(loan.id);

            return (
              <LoanCard key={loan.id} loan={loan}>
                <InterestButton
                  loanId={loan.id}
                  hasExpressedInterest={hasExpressedInterest}
                  userId={userId}
                  setInterestedLoanIds={setInterestedLoanIds}
                  setLoans={setLoans}
                />
              </LoanCard>
            );
          })}
        </div>
      )}
    </div>
  );
}

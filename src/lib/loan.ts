// lib/loan.ts
import { supabase } from './supabaseClient';

export async function createLoan(loan: {
  amount: number;
  purpose: string;
  duration: number;
  credit_score: string;
}) {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (sessionError || !session) throw new Error('Not authenticated');

  const userId = session.user.id;

  const { data, error } = await supabase
    .from('loans')
    .insert([{ ...loan, user_id: userId }])
    .select()
    .single();

  if (error) throw error;
  return data;
}



// Loans created by the current user (for /borrower)
export async function getLoansBorrower(userId: string) {
  const { data, error } = await supabase
    .from('loans')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;
  return data;
}

// Loans NOT created by the current user (for /lender)
export async function getLoansLender(userId: string) {
  const { data, error } = await supabase
    .from('loans')
    .select('*')
    .neq('user_id', userId);

  if (error) throw error;
  return data;
}


# Quote-It: A Borrower-Lender Web-App

A minimal peer-to-peer lending platform where borrowers post loan requests and lenders express interest, with a little interactive flair.

## 🚀 Stack

- **Next.js (App Router)** – A solid choice for full-stack React applications with built-in routing and API support, keeping both client and server logic organized in one codebase.  
- **Tailwind CSS** – Offers a utility-first approach to styling that ensures a clean, consistent UI without the need for custom CSS files.  
- **Supabase** – Handles authentication, database, and serverless functions in one platform, making it easy to manage users and data without setting up a separate backend.  
- **Vercel** – Provides a seamless deployment workflow and native support for Next.js, making updates and hosting straightforward.

## 🧠 How It Works

- Any user can be both- Borrower and Lender
- On the Lender page, users won’t see their own loan requests—only those from others.
- Borrowers fill out a form to request a loan.
- Borrowers see their requests as **flip cards**— reveals more information when clicked.
- Lenders can see all the Loan Requests from different borrowers (Implemented filters for refined Search).
- Lenders can express interest in loans.
- Supabase handles user auth and stores loan + interest data.
- Borrowers can view how many lenders are interested, and see **masked email IDs** (e.g., `joh*****@gmail.com`).

## 🛠 Dev Setup

```bash
npm install
npm run dev
````

Set your Supabase keys in `.env.local`.

---

## 🔗 Live Demo

👉 [quote-it-app.vercel.app](https://quote-it-ten.vercel.app/)

## 🔧 Future Improvements
### 🧩 Product Improvements
- **Interest Notifications:** Notify borrowers (via email or in-app) when someone shows interest in their loan.
- **Basic Status Updates:** Allow borrowers to mark loans as "Funded" or "Closed" to reduce clutter and confusion.

### ⚙️ Technical Enhancements
- **Supabase RLS (Row Level Security):** Enforce strict per-user access to loans and interests, ensuring users can only access what they own.
- **Centralized API Layer:** Move Supabase and filter logic into a dedicated `/lib/api` layer for easier testing, reuse, and future migration flexibility.
- **State Abstraction with Custom Hooks:** Extract filtering, loan fetching, and auth logic into `useLoanData`, `useAuth`, etc. to simplify components and improve modularity.
- **Form Validation with Zod or React Hook Form:** Add robust client-side validation to prevent invalid loan data or user input.
- **Unified Error and Loading UI Components:** Avoid repetitive UX code by creating shared `Loader`, `ErrorBanner`, and `EmptyState` components.
- **Environment Separation:** Use `.env.development`, `.env.production`, and Vercel’s environment system to avoid leaking secrets and misconfigurations.
- **Testing Core Flows:** Add unit tests for loan creation, interest registration, and access control checks using Vitest or Jest.
- **Analytics Integration:** Add basic tracking (e.g., Vercel Analytics or PostHog) to understand user behavior and drop-offs.



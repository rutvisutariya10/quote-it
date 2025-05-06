# Quote-It: A Borrower-Lender Web-App

A minimal peer-to-peer lending platform where borrowers post loan requests and lenders express interest—with a little interactive flair.

## 🚀 Stack

- **Next.js (App Router)** – Full-stack React with modern routing.
- **Tailwind CSS** – Utility-first styling for responsive, clean UI.
- **Supabase** – Auth, Postgres database, and serverless functions.
- **Vercel** – Fast deployments with CI/CD.

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

---

Let me know if you'd like to add environment variable names or folder structure explanation.


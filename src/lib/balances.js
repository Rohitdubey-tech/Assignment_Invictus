import { sharesForExpense } from "./money.js";

export function computeBalances(members, expenses) {
  const bal = {};
  for (const m of members) bal[m.id] = 0;

  for (const exp of expenses) {
    const shares = sharesForExpense(exp);
    // credit payer full amount they paid
    bal[exp.paidBy] = (bal[exp.paidBy] || 0) + Number(exp.amount);

    // deduct each member's share
    for (const [id, share] of Object.entries(shares)) {
      const key = Number(id);
      bal[key] = (bal[key] || 0) - share;
    }
  }

  // round to 2 decimals to avoid floating point issues
  for (const m of members) {
    bal[m.id] = Math.round((bal[m.id] || 0) * 100) / 100;
  }

  return bal;
}

export function totalSpent(expenses) {
  return expenses.reduce((s, e) => s + Number(e.amount), 0);
}

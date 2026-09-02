# Bugs found

Add one section per issue. Bug 1 is filled in to show the format — fix it, then write what you changed. Copy the blank template for the rest.

Keep this file in the repo and **commit it** with your fixes.

---

## Bug 1

**How to reproduce:** Open the app. The expense list says “Newest first”. The first row is Wine (7 Mar). Board game (15 Mar) is further down.

**What is wrong:** The list is showing oldest expenses first. Newest should be at the top.

**What I changed:** In `src/components/ExpenseList.jsx`, reversed the comparator to `dateValue(b.date) - dateValue(a.date)`. In `src/lib/format.js`, updated `dateValue` to always return a numeric millisecond timestamp (`new Date(date).getTime()`).

---

## Bug 2

**How to reproduce:** Look at the Balances panel on initial load. Ben and Diya paid more than their consumed share, but are marked in red as "owes $...". Aisha and Carlos consumed more than they paid, but are marked in green as "is owed $...".

**What is wrong:** The logic in `BalancesPanel.jsx` was completely inverted: `bal > 0` was labeled as `"owes"` (with CSS class `owe`), and `bal < 0` was labeled as `"is owed"` (with CSS class `owed`). A positive balance means the group owes that member money; a negative balance means that member owes the group.

**What I changed:** In `src/components/BalancesPanel.jsx`, corrected the conditions so that `bal > 0.005` displays `"is owed ${formatMoney(bal)}"` with class `owed`, and `bal < -0.005` displays `"owes ${formatMoney(-bal)}"` with class `owe`.

---

## Bug 3

**How to reproduce:** Inspect the Uber expense ($60) paid by Diya (id 4) split between Aisha and Ben (ids 1, 2). Check Diya's balance. Diya paid $60 for other people and was not part of the ride, yet $30 ($60 / 2) was deducted from her balance. The sum of all balances did not cancel out to $0.00.

**What is wrong:** In `src/lib/balances.js`, an arbitrary check `if (!(exp.paidBy in shares))` subtracted `Number(exp.amount) / n` from the payer. The specification states: "Paying for other people: Someone can put a cab on their card even if they did not ride. They should get that fare back in full. Only the people who used it should owe a share."

**What I changed:** In `src/lib/balances.js`, removed the deduction block (lines 16–19) and ensured final balances are rounded to 2 decimal places.

---

## Bug 4

**How to reproduce:** In a scenario where a debtor owes an amount exactly equal to what a creditor is owed (e.g. Person A owes $50, Person B is owed $50), check the "Settle up" panel. No transfer is displayed at all, and the settlement never happens.

**What is wrong:** In `src/lib/settle.js`, the loop handled `d.amount > c.amount` and `d.amount < c.amount`, but the `else` branch (when `d.amount === c.amount`) simply incremented `i += 1; j += 1` without recording any transfer in the `transfers` array.

**What I changed:** In `src/lib/settle.js`, updated the settlement loop to determine `amount = Math.min(d.amount, c.amount)`. When `amount > 0.001`, a transfer is recorded, subtracted from both parties, and pointer(s) advance when remaining amounts drop below 0.001. All transfer amounts are also formatted to 2 decimal places.

---

## Bug 5

**How to reproduce:** Split $100 equally among 3 people. Each person was assigned $33.33, totaling $99.99 ($0.01 lost). Or split $20 with custom percentages 33.33%, 33.33%, 33.34%. Each person was assigned $6.67, totaling $20.01 ($0.01 invented).

**What is wrong:** In `src/lib/money.js`, `splitEqual` and `splitByPercent` used basic `.toFixed(2)` rounding per person without accounting for remainder pennies. The specification states: "Those portions together should make up the full bill — the group should not 'lose' or 'invent' money in the rounding."

**What I changed:** In `src/lib/money.js`, rewritten `splitEqual` and `splitByPercent` to work in integer cents (`Math.round(amount * 100)`). Leftover cents are distributed to participants (or those with the largest fractional remainder) so that the sum of individual shares in dollars always equals the exact bill amount.

---

## Bug 6

**How to reproduce:**

**What is wrong:**

**What I changed:**

---

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

**How to reproduce:**

**What is wrong:**

**What I changed:**

---

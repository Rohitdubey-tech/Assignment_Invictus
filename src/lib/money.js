export function formatMoney(amount) {
  const n = Number(amount);
  if (!Number.isFinite(n)) return "$0.00";
  const sign = n < 0 ? "-" : "";
  return `${sign}$${Math.abs(n).toFixed(2)}`;
}

// split equal amounts in cents so no pennies are lost
export function splitEqual(amount, ids) {
  if (!ids || ids.length === 0) return {};
  const totalCents = Math.round(Number(amount) * 100);
  const n = ids.length;
  const baseCents = Math.floor(totalCents / n);
  const remainder = totalCents % n;

  const shares = {};
  ids.forEach((id, index) => {
    // give leftover pennies to first people
    const cents = baseCents + (index < remainder ? 1 : 0);
    shares[id] = Number((cents / 100).toFixed(2));
  });
  return shares;
}

export function percentsSumTo100(percents) {
  const values = Object.values(percents).map(Number);
  const sum = values.reduce((a, b) => a + b, 0);
  // allow small tolerance for JS floating point math (like 33.33 + 33.33 + 33.34)
  return Math.abs(sum - 100) < 0.01;
}

// split by percent in cents and give remainder to largest fractions
export function splitByPercent(amount, percents) {
  const entries = Object.entries(percents);
  if (entries.length === 0) return {};

  const totalCents = Math.round(Number(amount) * 100);
  const items = entries.map(([id, pct]) => {
    const rawCents = (totalCents * Number(pct)) / 100;
    const floorCents = Math.floor(rawCents);
    return {
      id,
      floorCents,
      fraction: rawCents - floorCents,
    };
  });

  const allocatedCents = items.reduce((sum, item) => sum + item.floorCents, 0);
  let remainder = totalCents - allocatedCents;

  // sort descending to give extra cents to largest decimal parts
  const sortedByFraction = [...items].sort((a, b) => b.fraction - a.fraction);
  const bonusMap = {};
  for (let i = 0; i < remainder && i < sortedByFraction.length; i++) {
    bonusMap[sortedByFraction[i].id] = (bonusMap[sortedByFraction[i].id] || 0) + 1;
  }

  const shares = {};
  for (const item of items) {
    const cents = item.floorCents + (bonusMap[item.id] || 0);
    shares[item.id] = Number((cents / 100).toFixed(2));
  }
  return shares;
}

export function sharesForExpense(expense) {
  if (expense.splitType === "percent" && expense.percents) {
    return splitByPercent(expense.amount, expense.percents);
  }
  return splitEqual(expense.amount, expense.splitWith);
}

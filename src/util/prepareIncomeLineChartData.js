// util/prepareIncomeLineChartData.js

export const prepareIncomeLineChartData = (transactions = []) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const incomeByDate = {};

  transactions.forEach((tx) => {
    if (!tx?.date || !tx?.amount) return;

    const dateObj = new Date(tx.date);
    if (isNaN(dateObj)) return;

    // current month only
    if (
      dateObj.getMonth() !== currentMonth ||
      dateObj.getFullYear() !== currentYear
    )
      return;

    const day = dateObj.getDate();
    const monthShort = dateObj.toLocaleString("default", { month: "short" });
    const label = `${day}${getDaySuffix(day)} ${monthShort}`;

    if (!incomeByDate[day]) {
      incomeByDate[day] = {
        date: label,
        total: 0,
        sortKey: day
      };
    }
    
    // Make sure to convert to number and add
    incomeByDate[day].total += parseFloat(tx.amount) || 0;
  });

  const result = Object.values(incomeByDate)
    .sort((a, b) => a.sortKey - b.sortKey);

  console.log("Chart Data:", result); // DEBUG: Check your data
  
  return result;
};

// Helper function for ordinal suffix (1st, 2nd, 3rd, etc.)
const getDaySuffix = (day) => {
  if (day >= 11 && day <= 13) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};
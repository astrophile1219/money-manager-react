export const prepareIncomeLineChartData = (transactions = []) => {
  if (!transactions.length) {
    return { data: [], monthLabel: "" };
  }

  // Helper function for ordinal suffix (1st, 2nd, 3rd, etc.)
  const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const buildMonthData = (month, year) => {
    const incomeByDate = {};

    transactions.forEach((tx) => {
      if (!tx?.date || !tx?.amount) return;

      const dateObj = new Date(tx.date);
      if (isNaN(dateObj)) return;

      if (dateObj.getMonth() !== month || dateObj.getFullYear() !== year)
        return;

      const day = dateObj.getDate();
      const monthShort = dateObj.toLocaleString("default", { month: "short" });
      const label = `${day}${getDaySuffix(day)} ${monthShort}`;

      if (!incomeByDate[day]) {
        incomeByDate[day] = {
          date: label,
          total: 0,
          sortKey: day,
        };
      }

      incomeByDate[day].total += parseFloat(tx.amount) || 0;
    });

    return Object.values(incomeByDate).sort((a, b) => a.sortKey - b.sortKey);
  };

  // 🔥 Sort transactions by date (latest first)
  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  const latestDate = new Date(sorted[0].date);
  const targetMonth = latestDate.getMonth();
  const targetYear = latestDate.getFullYear();

  const monthLabel = latestDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const data = buildMonthData(targetMonth, targetYear);

  return { data, monthLabel };
};

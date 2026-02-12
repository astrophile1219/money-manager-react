import { addThousandsSeparator } from "../util/util.js";
import CustomPieChart from "./CustomPieChart.jsx";

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const COLORS = ["#59168B", "#a0090e", "#016630"];

  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        colors={COLORS}
        label="Total Balance"
        totalAmount={`₹${addThousandsSeparator(totalBalance)}`}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;

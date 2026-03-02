import React, { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../util/prepareIncomeLineChartData";
import CustomLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";

const IncomeOverview = ({ transactions = [], onAddIncome }) => {
  const [chartData, setChartData] = useState([]);
  const [displayMonth, setDisplayMonth] = useState("");

  useEffect(() => {
    const result = prepareIncomeLineChartData(transactions);
    setChartData(result.data);
    setDisplayMonth(result.monthLabel);
  }, [transactions]);

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h5 className="text-base sm:text-lg font-semibold text-gray-800">
            Income Overview {displayMonth && `(${displayMonth})`}
          </h5>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>

        <button
          onClick={onAddIncome}
          className="
            flex items-center justify-center gap-1.5
            w-full sm:w-auto
            px-4 py-2
            bg-green-50 hover:bg-green-100
            text-green-700
            rounded-lg
            transition-colors
            font-medium
            text-sm cursor-pointer
          "
        >
          <Plus size={16} /> Add Income
        </button>
      </div>

      {/* Chart */}
      <div className="w-full overflow-x-auto">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;

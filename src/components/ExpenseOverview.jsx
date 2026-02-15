import React, { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../util/prepareIncomeLineChartData";
import CustomLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";

const ExpenseOverview = ({ transactions = [], onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeLineChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-4 sm:p-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        
        <div>
          <h5 className="text-base sm:text-lg font-semibold text-gray-800">
            Expense Overview
          </h5>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Track your spending over time and analyze your expense trends.
          </p>
        </div>

        <button
          onClick={onAddExpense}
          className="
            flex items-center justify-center gap-1.5
            w-full sm:w-auto
            px-4 py-2
            bg-red-50 hover:bg-red-100
            text-red-700
            rounded-lg
            transition-colors
            font-medium
            text-sm
          "
        >
          <Plus size={16} /> Add Expense
        </button>
      </div>

      {/* Chart */}
      <div className="w-full overflow-x-auto">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;

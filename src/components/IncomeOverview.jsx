// IncomeOverview.jsx
import React, { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../util/prepareIncomeLineChartData";
import CustomLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";

const IncomeOverview = ({ transactions = [], onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeLineChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h5 className="text-lg font-semibold text-gray-800">Income Overview</h5>
          <p className="text-xs text-gray-500 mt-1">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>

        <button
          onClick={onAddIncome}
          className="flex items-center gap-1.5 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors font-medium text-sm"
        >
          <Plus size={16} /> Add Income
        </button>
      </div>

      <div className="w-full">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
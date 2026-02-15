import { Download, LoaderCircle, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import { useState } from "react";

const ExpenseList = ({ transactions, onDelete, onDownload, onEmail }) => {
  const [loading, setLoading] = useState(false);

  const handleEmail = async () => {
    setLoading(true);
    try {
      await onEmail();
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      await onDownload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h5 className="text-base sm:text-lg font-semibold">
          Expense Sources
        </h5>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          
          <button
            className="
              flex items-center justify-center gap-2
              w-full sm:w-auto
              px-4 py-2
              text-sm font-semibold
              text-gray-700
              bg-linear-to-br from-white to-gray-50
              border border-gray-200
              rounded-lg
              shadow-sm
              hover:shadow-md
              hover:from-gray-50 hover:to-gray-100
              hover:text-gray-900
              active:scale-95
              transition-all duration-200 ease-out cursor-pointer
            "
            onClick={handleEmail}
          >
            {loading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" /> Emailing...
              </>
            ) : (
              <>
                <Mail size={16} className="text-gray-500" /> Email
              </>
            )}
          </button>

          <button
            className="
              flex items-center justify-center gap-2
              w-full sm:w-auto
              px-4 py-2
              text-sm font-semibold
              text-gray-700
              bg-linear-to-br from-white to-gray-50
              border border-gray-200
              rounded-lg
              shadow-sm
              hover:shadow-md
              hover:from-gray-50 hover:to-gray-100
              hover:text-gray-900 cursor-pointer
              active:scale-95
              transition-all duration-200 ease-out
            "
            disabled={loading}
            onClick={handleDownload}
          >
            {loading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" /> Downloading...
              </>
            ) : (
              <>
                <Download size={16} className="text-gray-500" /> Download
              </>
            )}
          </button>
        </div>
      </div>

      {/* Transactions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {transactions?.map((expense) => (
          <TransactionInfoCard
            key={expense.id}
            title={expense.name}
            icon={expense.icon}
            date={moment(expense.date).format("Do MM YYYY")}
            amount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;

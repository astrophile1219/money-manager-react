import { Download, LoaderCircle, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import { useState } from "react";

const IncomeList = ({ transactions, onDelete, onDownload, onEmail }) => {
  const [loading, setLoading] = useState(false);

  const handleEmail = async () => {
    setLoading(true);
    try {
      await onEmail();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      await onDownload();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income Sources</h5>

        <div className="flex items-center justify-end gap-2">
          <button
            className="
              flex items-center gap-2
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
              transition-all duration-200 ease-out
              cursor-pointer
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
              flex items-center gap-2
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
              transition-all duration-200 ease-out
              cursor-pointer
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

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* display the incomes */}
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income.id}
            title={income.name}
            icon={income.icon}
            date={moment(income.date).format("Do MM YYYY")}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;

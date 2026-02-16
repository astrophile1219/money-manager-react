import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const RecentTransactions = ({ transactions = [], onMore }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">Recent Transactions</h4>

        <button
          className="flex items-center gap-2 text-sm font-medium hover:bg-gray-300 transition-colors cursor-pointer bg-gray-200 py-1 px-3 rounded"
          onClick={onMore}
        >
          More <ArrowRight size={15} />
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {transactions.slice(0, 5).map((item, index) => (
          <TransactionInfoCard
            key={`${item.id ?? "txn"}-${index}`}   // ✅ Unique key fix
            amount={item.amount}
            title={item.name}
            icon={item.icon}
            date={item.date ? moment(item.date).format("Do MMM YYYY") : ""}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
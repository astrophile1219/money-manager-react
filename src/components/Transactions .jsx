import { ArrowRight, Key } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const Transactions = ({ transactions, onMore, type, title }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">{title}</h5>
        <button className="flex items-center gap-2 text-sm font-medium hover:bg-gray-300 transition-colors cursor-pointer bg-gray-200 py-1 px-2 rounded" onClick={onMore}>
          More <ArrowRight className="text-base" size={15} />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map(item => (
            <TransactionInfoCard
                key={item.id}
                title={item.name}
                icon={item.icon}
                date={moment(item.date).format("Do MM YYYY")}
                amount={item.amount}
                type={type}
                hideDeleteBtn
            />
        ))}
      </div>
    </div>
  )
}

export default Transactions;
import {
  Trash2,
  TrendingDown,
  TrendingUp,
  UtensilsCrossed,
} from "lucide-react";
import { addThousandsSeparator } from "../util/util";

const TransactionInfoCard = ({
  icon,
  title,
  date,
  amount = 0,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
const isIncome = type?.toLowerCase().trim() === "income";
const getAmountStyles = () =>
  isIncome
    ? "bg-green-50 text-green-700"
    : "bg-red-50 text-red-700";
    


  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-xl bg-white hover:bg-gray-50 transition duration-200">

      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6 object-contain" />
        ) : (
          <UtensilsCrossed size={20} className="text-purple-500" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-800 font-medium">{title}</p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>

        <div className="flex items-center gap-3">

          {/* Delete Button */}
          {!hideDeleteBtn && (
            <button
              onClick={onDelete}
              className="text-gray-400 hover:text-red-600 opacity-0 cursor-pointer group-hover:opacity-100 transition duration-200"
            >
              <Trash2 size={18} />
            </button>
          )}

          {/* Amount Badge */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium ${getAmountStyles()}`}
          >
            <span>
              {isIncome ? "+" : "-"} ₹
              {addThousandsSeparator(Number(amount))}
            </span>

            {isIncome ? (
              <TrendingUp size={14} />
            ) : (
              <TrendingDown size={14} />
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;

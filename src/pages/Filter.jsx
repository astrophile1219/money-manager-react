import React, { useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { Search } from "lucide-react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import TransactionInfoCard from "../components/TransactionInfoCard";
import moment from "moment";

const Filter = () => {
  useUser();

  const [type, setType] = useState("income");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTERS, {
        type,
        startDate,
        endDate,
        keyword,
        sortField,
        sortOrder,
      });
      setTransactions(response.data);
    } catch (error) {
      console.error("Failed to fetch transactions: ", error);
      toast.error(
        error.message || "Failed to fetch transactions. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

return (
  <Dashboard activeMenu="Filters">
    <div className="px-4 sm:px-6 max-w-7xl mx-auto">

      {/* FILTER CARD */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 mb-6">
        <div className="mb-6">
          <h5 className="text-base sm:text-lg font-semibold text-gray-800">
            Select the Filters
          </h5>
        </div>

        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4"
        >
          {/* Type */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Start Date
            </label>
            <input
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              type="date"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium mb-1">
              End Date
            </label>
            <input
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              type="date"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Sort Field */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Sort Field
            </label>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
              <option value="category">Category</option>
            </select>
          </div>

          {/* Sort Order */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Sort Order
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          {/* Search */}
          <div className="flex flex-col sm:flex-row items-stretch gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Search
              </label>
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                type="text"
                placeholder="Search..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <button
              type="submit"
              className="
                sm:mt-6
                w-full sm:w-auto
                px-4 py-2
                bg-purple-800
                hover:bg-purple-700
                text-white
                rounded-lg
                flex items-center justify-center
                transition
              "
            >
              <Search size={18} />
            </button>
          </div>
        </form>
      </div>

      {/* RESULTS CARD */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 mb-6">
        <div className="mb-6">
          <h5 className="text-base sm:text-lg font-semibold text-gray-800">
            Transactions
          </h5>
        </div>

        {!loading && transactions.length === 0 && (
          <p className="text-gray-500 text-sm">
            Select filters and click search to view transactions.
          </p>
        )}

        {loading && (
          <p className="text-gray-500 text-sm">
            Loading transactions...
          </p>
        )}

        <div className="space-y-3">
          {transactions.map((transaction) => (
            <TransactionInfoCard
              key={transaction.id}
              icon={transaction.icon}
              title={transaction.name}
              date={moment(transaction.date).format("Do MM YYYY")}
              amount={transaction.amount}
              type={transaction.type}
              isIncome={transaction.type === "income"}
              hideDeleteBtn
            />
          ))}
        </div>
      </div>

    </div>
  </Dashboard>
);

};

export default Filter;

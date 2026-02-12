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
      console.log(transactions);
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
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h5 className="text-lg font-semibold text-gray-800">
            Select the Filters
          </h5>
        </div>

        <form className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="type">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              id="type"
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="startdate"
              className="block text-sm font-medium mb-1"
            >
              Start Date
            </label>
            <input
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              id="startdate"
              type="date"
              className="w-full border rounded px-2 py-2"
            />
          </div>
          <div>
            <label htmlFor="enddate" className="block text-sm font-medium mb-1">
              End Date
            </label>
            <input
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              id="enddate"
              type="date"
              className="w-full border rounded px-2 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="sortField"
              className="block text-sm font-medium mb-1"
            >
              Sort Field
            </label>
            <select
              value={sortField}
              id="sortField"
              className="w-full border rounded px-3 py-2"
              onChange={(e) => setSortField(e.target.value)}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
              <option value="category">Category</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="sortorder"
              className="block text-sm font-medium mb-1"
            >
              Sort Order
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              id="sortorder"
              className="w-full border rounded px-3 py-2"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          <div className="sm:col-span-1 md:col-span-1 flex items-end">
            <div className="w-full">
              <label
                htmlFor="keyword"
                className="block text-sm font-medium mb-1"
              >
                Search
              </label>
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                id="keyword"
                type="text"
                placeholder="Search..."
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <button
              onClick={handleSearch}
              className="ml-2 mb-1 p-2 bg-purple-800 hover:bg-purple text-white rounded flex items-center justify-center cursor-pointer"
            >
              <Search size={20} />
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h5 className="text-lg font-semibold text-gray-800">Transactions</h5>
        </div>

        {transactions.length === 0 && !loading ? (
          <p className="text-gray-500 ">
            Select the filters and click apply to filter the transactions
          </p>
        ) : (
          ""
        )}

        {loading ? <p className="text-gray-500">Loading transactions</p> : ""}

        {transactions.map((transaction) => (
          <TransactionInfoCard
            key={transaction.id}
            icon={transaction.icon}
            title={transaction.name}
            date={moment(transaction.date).format("Do MM YYYY")}
            amount={transaction.amount}
            type={type}
            hideDeleteBtn
          />
        ))}
      </div>
    </Dashboard>
  );
};

export default Filter;

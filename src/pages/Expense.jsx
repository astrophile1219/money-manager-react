import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import ExpenseList from "../components/ExpenseList";
import Modal from "../components/Modal";
import AddExpenseForm from "../components/AddExpenseForm";
import DeleteAlert from "../components/DeleteAlert";
import ExpenseOverview from "../components/ExpenseOverview";

const Expense = () => {
  useUser();

  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // Fetch Expense details
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
      if (response.status === 200) {
        setExpenseData(response.data);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch expense details",
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch Expense Categories
  const fetchExpenseCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("expense"),
      );
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch expense categories",
      );
    }
  };

  // Add Expense
  const handleAddExpense = async (expense) => {
    const { name, amount, date, icon, categoryId } = expense;

    if (!name.trim()) return toast.error("Please enter a name");
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      return toast.error("Amount should be greater than 0");
    if (!date) return toast.error("Please select a date");

    const today = new Date().toISOString().split("T")[0];
    if (date > today) return toast.error("Date cannot be in the future");
    if (!icon) return toast.error("Please select an icon");
    if (!categoryId) return toast.error("Please select a category");

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      });

      if (response.status === 201) {
        setOpenAddExpenseModal(false);
        toast.success("Expense added successfully!");
        fetchExpenseDetails();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add expense. Please try again.",
      );
    }
  };

  // Delete Expense
  const deleteExpense = async (id) => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully!");
      fetchExpenseDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete expense.");
    }
  };

  // Download Expense Excel
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD,
        { responseType: "blob" },
      );

      let filename = "expense_details.xlsx";
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);

      toast.success("Expense details downloaded successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to download expense",
      );
    }
  };

  // Email Expense
  const handleEmailExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
      if (response.status === 200) {
        toast.success("Expense details emailed successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to email expense");
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
    fetchExpenseCategories();
  }, []);

  return (
    <Dashboard activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <ExpenseOverview
            transactions={expenseData}
            onAddExpense={() => setOpenAddExpenseModal(true)}
          />

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadExpenseDetails}
            onEmail={handleEmailExpenseDetails}
          />

          <Modal
            isOpen={openAddExpenseModal}
            onClose={() => setOpenAddExpenseModal(false)}
            title={"Add Expense"}
          >
            <AddExpenseForm
              onAddExpense={handleAddExpense}
              categories={categories}
            />
          </Modal>

          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Expense"
          >
            <DeleteAlert
              content="Are you sure want to delete this expense details?"
              onDelete={() => deleteExpense(openDeleteAlert.data)}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  );
};

export default Expense;

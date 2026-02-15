import { LoaderCircle } from "lucide-react";
import EmojiPickerPopup from "./EmojiPickerPopup";
import Input from "./Input";
import { useEffect, useState } from "react";

const AddExpenseForm = ({ onAddExpense, categories }) => {
  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: "",
  });

  const [loading, setLoading] = useState(false);

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleChange = (key, value) => {
    setExpense({ ...expense, [key]: value });
  };

  const handleAddExpense = async () => {
    setLoading(true);
    try {
      await onAddExpense(expense);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categories.length > 0 && !expense.categoryId) {
      setExpense((prev) => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories, expense.categoryId]);

  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={expense.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Expense Name"
        placeholder="e.g., Food, Rent, Transport"
        type="text"
      />

      <Input
        label="Category"
        value={expense.categoryId}
        onChange={({ target }) => handleChange("categoryId", target.value)}
        isSelect={true}
        options={categoryOptions}
      />

      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="e.g., 500.00"
        type="number"
      />

      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder="Select a date"
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition cursor-pointer"
          onClick={handleAddExpense}
          disabled={loading}
        >
          {loading ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin" />
              Adding...
            </>
          ) : (
            <>Add Expense</>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;

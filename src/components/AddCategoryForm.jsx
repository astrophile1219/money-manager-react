import { useEffect, useState } from "react";
import Input from "./Input";
import EmojiPickerPopup from "./EmojiPickerPopup";
import { LoaderCircle } from "lucide-react";

const AddCategoryForm = ({onAddCategory,isEditing, initialCategoryData}) => {
    const [loading,setLoading] = useState(false);
  const [category, setCategory] = useState({
    name: "",
    type: "income",
    icon: ""
  });

  useEffect(() => {
    if (isEditing && initialCategoryData) {
        setCategory(initialCategoryData);
    }
    else {
        setCategory({name:"",type:"income",icon:""})
    }
  },[isEditing,initialCategoryData])

  const categoryTypeOptions = [
    {value: "income", label: "Income"},
    {value: "expense", label: "Expense"},
  ];

  const handleChange = (key, value) => {
    setCategory({...category,[key]:value});
  }

  const handleSubmit = async () => {
    setLoading(true);
    try {
        await onAddCategory(category);
    }
    finally {
        setLoading(false)
    }
  }

return (
  <div className="p-4 sm:p-6">

    {/* Emoji Picker */}
    <div className="mb-4 flex justify-center sm:justify-start">
      <EmojiPickerPopup
        icon={category.icon}
        onSelect={(selectedIcon) =>
          handleChange("icon", selectedIcon)
        }
      />
    </div>

    {/* Category Name */}
    <div className="mb-4">
      <Input
        value={category.name}
        onChange={({ target }) =>
          handleChange("name", target.value)
        }
        label="Category Name"
        placeholder="e.g., Freelance, Salary, Groceries"
        type="text"
      />
    </div>

    {/* Category Type */}
    <div className="mb-6">
      <Input
        value={category.type}
        onChange={({ target }) =>
          handleChange("type", target.value)
        }
        isSelect={true}
        label="Category Type"
        options={categoryTypeOptions}
      />
    </div>

    {/* Submit Button */}
    <div className="flex flex-col sm:flex-row sm:justify-end">
      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="
          w-full sm:w-auto
          flex items-center justify-center gap-2
          px-4 py-2.5
          text-sm font-medium
          text-white
          bg-blue-600
          rounded-lg
          hover:bg-blue-700
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
        "
      >
        {loading ? (
          <>
            <LoaderCircle className="w-4 h-4 animate-spin" />
            {isEditing ? "Updating..." : "Adding..."}
          </>
        ) : (
          <>
            {isEditing ? "Update Category" : "Add Category"}
          </>
        )}
      </button>
    </div>

  </div>
);

};

export default AddCategoryForm;
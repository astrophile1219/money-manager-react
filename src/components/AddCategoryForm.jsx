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
        setCategory({name:"",tpe:"income",icon:""})
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
    <div className="p-4">
        <EmojiPickerPopup icon={category.icon} onSelect={(selectedIcon) => handleChange("icon",selectedIcon)} />
        <Input
            value={category.name}
            onChange={({target}) => handleChange("name",target.value)}
            label="Category Name"
            placeholder="e.g., Freelance, Salary, Groceries"
            type="text"
        />
        <Input
            value={category.type}
            onChange={({target}) => handleChange("type",target.value)}
            isSelect={true}
            label="Category Type"
            options={categoryTypeOptions}
        />

        <div className="flex justify-end mt-6">
            <button 
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
                {loading ? (
                    <>
                    <LoaderCircle className="w-4 h-4 animate-spin"/>
                    {isEditing ? "Updating...":"Adding..."}
                    </>
                ) : (
                    <>
                    {isEditing ? "Update Category": "Add Category"}
                    </>
                )}
            </button>
        </div>

    </div>
  );
};

export default AddCategoryForm;
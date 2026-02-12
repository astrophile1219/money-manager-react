import { LoaderCircle } from "lucide-react";
import { useState } from "react";

const DeleteAlert = ({ content, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await onDelete();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <p className="text-sm text-gray-700">{content}</p>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleDelete}
          type="button"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50 
            disabled:cursor-not-allowed transition cursor-pointer">
          {loading ? (
            <>
                <LoaderCircle className="h-4 w-4 animate-spin"/> Deleting...
            </>
          ) : (
            <>
                Delete
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;

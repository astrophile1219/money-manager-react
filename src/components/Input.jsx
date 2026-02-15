import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  isSelect,
  options = [],
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="mb-4 w-full">
      {label && (
        <label className="block mb-1 text-xs sm:text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <div className="relative">

        {isSelect ? (
          <select
            className="
              w-full
              bg-white
              border border-gray-300
              rounded-lg
              py-2.5 sm:py-2
              px-3
              text-sm sm:text-base
              text-gray-700
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              transition
            "
            value={value}
            onChange={(e) => onChange(e)}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            className="
              w-full
              bg-white
              border border-gray-300
              rounded-lg
              py-2.5 sm:py-2
              px-3
              pr-10
              text-sm sm:text-base
              text-gray-700
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              transition
            "
            value={value}
            placeholder={placeholder}
            type={
              type === "password"
                ? showPassword
                  ? "text"
                  : "password"
                : type
            }
            onChange={(e) => onChange(e)}
          />
        )}

        {/* Password Toggle */}
        {type === "password" && value?.length > 0 && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="
              absolute right-3 top-1/2 -translate-y-1/2
              flex items-center justify-center
              text-gray-500 hover:text-indigo-600
              transition
            "
          >
            {showPassword ? (
              <Eye size={18} />
            ) : (
              <EyeOff size={18} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;

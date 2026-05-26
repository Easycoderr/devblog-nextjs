import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

function Input({ label, error, icon, type, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor="email"
        className="text-gray-600 font-semibold tracking-wide text-sm"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={
            type ||
            `${showPassword && icon === "password" ? "text" : "password"}`
          }
          className={`${error ? "border-red-500 focus:border-red-500" : " border-gray-400 focus:ring focus:ring-accent"} p-2 border rounded-lg w-full text-sm focus:outline-none`}
          {...props}
        />
        {icon !== "password" && (
          <span className="absolute right-2 top-[50%] -translate-y-[50%]">
            {icon}
          </span>
        )}
        {icon === "password" && (
          <span
            tabIndex="1"
            onClick={() => setShowPassword((show) => !show)}
            className="absolute right-2 top-[50%] -translate-y-[50%]"
          >
            {showPassword ? (
              <EyeClosed size={20} className="text-gray-500" />
            ) : (
              <Eye size={20} className="text-gray-500" />
            )}
          </span>
        )}
      </div>
      <span className="flex">
        {error && (
          <p className="text-red-500 bg-red-100 px-2 py-1 rounded-md text-xs">
            {error.message}
          </p>
        )}
      </span>
    </div>
  );
}

export default Input;

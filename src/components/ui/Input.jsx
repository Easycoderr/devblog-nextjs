import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

function Input({ label, error, icon, type, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor={label.split(" ").join("")}
        className="text-muted-foreground font-semibold tracking-wide text-sm"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={label.split(" ").join("")}
          type={
            type ||
            `${showPassword && icon === "password" ? "text" : "password"}`
          }
          className={`${error ? "border-destructive focus:border-destructive" : "bg-input border-border focus:ring focus:ring-primary"} p-2 border rounded-lg w-full text-sm focus:outline-none`}
          {...props}
        />
        {icon !== "password" && (
          <span className="absolute right-2 top-[50%] -translate-y-[50%]">
            {icon}
          </span>
        )}
        {icon === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((show) => !show)}
            className="absolute cursor-pointer  right-2 top-[50%] -translate-y-[50%]"
          >
            {showPassword ? (
              <Eye size={20} className="text-muted-foreground" />
            ) : (
              <EyeClosed size={20} className="text-muted-foreground" />
            )}
          </button>
        )}
      </div>
      <span className="flex">
        {error && (
          <p className="text-destructive bg-destructive/10 px-2 py-1 rounded-md text-xs">
            {error.message}
          </p>
        )}
      </span>
    </div>
  );
}

export default Input;

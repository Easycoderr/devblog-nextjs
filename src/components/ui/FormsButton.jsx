"use client";

import MiniSpinner from "./MiniSpinner";

function FormsButton({
  disabled,
  isSubmiting,
  children,
  ariaLabel,
  type,
  style,
}) {
  const styles = {
    authForm: `${disabled ? "bg-primary/75 cursor-not-allowed" : "cursor-pointer bg-primary hover:opacity-75 active:scale-103"} px-4 py-2 tracking-wider border text-indigo-50 shadow rounded-lg transition-all duration-200`,
    form: `${disabled ? "bg-primary/75 cursor-not-allowed" : "cursor-pointer bg-primary hover:opacity-75 active:scale-103"} px-2 py-1 tracking-wider border text-indigo-50 shadow rounded-lg transition-all duration-200`,
  };

  return (
    <button
      disabled={disabled}
      aria-label={ariaLabel}
      type={type}
      className={styles[style]}
    >
      {isSubmiting ? <MiniSpinner /> : children}
    </button>
  );
}

export default FormsButton;

"use client";

function Button({ disabled, children, ariaLabel, type, style }) {
  const styles = {
    authForm: `${disabled && "opacity-70"} px-4 py-2 tracking-wider border bg-black text-gray-50 shadow rounded-lg hover:opacity-70 transition-all duration-200 active:scale-103`,
    form: `${disabled && "opacity-70"} px-2 py-1 tracking-wider border bg-black text-gray-50 shadow rounded-lg hover:opacity-70 transition-all duration-200 active:scale-103`,
  };

  return (
    <button
      disabled={disabled}
      aria-label={ariaLabel}
      type={type}
      className={styles[style]}
    >
      {children}
    </button>
  );
}

export default Button;

"use client";

function FormsButton({ disabled, children, ariaLabel, type, style }) {
  const styles = {
    authForm: `${disabled && "opacity-75"} px-4 py-2 tracking-wider border bg-primary text-indigo-50 shadow rounded-lg hover:opacity-75 transition-all duration-200 active:scale-103`,
    form: `${disabled && "opacity-75"} px-2 py-1 tracking-wider border bg-primary text-indigo-50 shadow rounded-lg hover:opacity-75 transition-all duration-200 active:scale-103`,
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

export default FormsButton;

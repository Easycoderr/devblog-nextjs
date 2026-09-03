"use client";

import MiniSpinner from "./MiniSpinner";

type styleTypes = {
  buttonStyle: "authForm" | "form" | "settingsPrimary" | "settingsSecondary";
};
type FormButtonProps = React.ComponentProps<"button"> & {
  isSubmiting?: boolean;
  ariaLabel?: string;
} & styleTypes;
function FormsButton({
  disabled,
  isSubmiting = false,
  children,
  ariaLabel,
  type,
  buttonStyle,
  onClick,
}: FormButtonProps) {
  const styles = {
    authForm: `${
      disabled
        ? "bg-primary/75 cursor-not-allowed"
        : "cursor-pointer bg-primary hover:opacity-75 active:scale-103"
    } px-4 py-2 tracking-wider border text-indigo-50 shadow rounded-lg text-nowrap transition-all duration-200`,

    form: `${
      disabled
        ? "bg-primary/75 cursor-not-allowed"
        : "cursor-pointer bg-primary hover:opacity-75 active:scale-103"
    } px-2 py-1 tracking-wider border text-indigo-50 shadow rounded-lg text-nowrap transition-all duration-200`,

    settingsPrimary: `${
      disabled
        ? "opacity-50 cursor-not-allowed"
        : "cursor-pointer hover:opacity-75"
    } text-primary inline-block w-full bg-primary/20 rounded-lg py-2 px-4 text-nowrap transition-all duration-200`,

    settingsSecondary: `${
      disabled
        ? "opacity-50 cursor-not-allowed"
        : "cursor-pointer hover:opacity-75"
    } text-destructive inline-block w-full bg-destructive/20 rounded-lg py-2 px-4 text-nowrap transition-all duration-200`,
  };

  return (
    <button
      disabled={disabled}
      aria-label={ariaLabel}
      type={type}
      className={styles[buttonStyle]}
      onClick={onClick}
    >
      {isSubmiting ? (
        <div className="flex gap-1 justify-center w-full">
          <span>{children}</span>
          <MiniSpinner />
        </div>
      ) : (
        children
      )}
    </button>
  );
}

export default FormsButton;

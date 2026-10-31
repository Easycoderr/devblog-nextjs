import calcTextRange from "@/lib/utils/calcTextLength";
import {
  Control,
  UseFormRegisterReturn,
  useFormState,
  useWatch,
} from "react-hook-form";
import { FormValues } from "./ImageField";

type DescriptionFieldProps = {
  control: Control<FormValues>;
} & UseFormRegisterReturn<"description">;
type DescriptionCounterProps = {
  control: Control<FormValues>;
};

function DescriptionCounter({ control }: DescriptionCounterProps) {
  const description = useWatch({
    control,
    name: "description",
  });

  return <span>{calcTextRange(description ?? "", 300)}</span>;
}
function DescriptionField({ control, ...props }: DescriptionFieldProps) {
  const { errors } = useFormState({
    control,
    name: "description",
    exact: true,
  });
  const error = errors.description;
  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor="description"
        className="text-muted-foreground font-semibold tracking-wide text-sm"
      >
        Description <DescriptionCounter control={control} />
        <span className="text-destructive">*</span>
      </label>
      <textarea
        className={`${error ? "border-destructive focus:border-destructive" : "border-border focus:border-ring"} bg-input p-1 border rounded-lg w-full text-sm focus:outline-none`}
        {...props}
      />
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

export default DescriptionField;

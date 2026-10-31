import Input from "@/components/ui/Input";
import { Control, UseFormRegisterReturn, useFormState } from "react-hook-form";
import { FormValues } from "./ImageField";
type TitleFieldProps = {
  control: Control<FormValues>;
} & UseFormRegisterReturn<"title">;

function TitleField({ control, ...props }: TitleFieldProps) {
  const { errors } = useFormState({ control, name: "title", exact: true });

  return (
    <Input
      required={true}
      label="Title"
      error={errors.title}
      type="text"
      {...props}
    />
  );
}

export default TitleField;

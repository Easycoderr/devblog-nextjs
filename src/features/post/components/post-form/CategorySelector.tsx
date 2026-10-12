import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerProps,
  FieldError,
  UseControllerProps,
} from "react-hook-form";
import ContentPopoverHelper from "../ContentPopoverHelper";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormValues } from "./ImageField";

type CategorySelector = {
  control: Control<FormValues>;
  error?: FieldError;
};
function CategorySelector({ control, error }: CategorySelector) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-muted-foreground flex items-center gap-1 font-semibold tracking-wide text-sm">
        Category
        <span className="text-destructive">*</span>
      </label>
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger
              className={`w-full dark:bg-input ${error ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"}`}
              size="lg"
            >
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="react">React</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
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

export default CategorySelector;

import { FieldMetadata, getInputProps } from "@conform-to/react";
import { HTMLInputAutoCompleteAttribute } from "react";

export function FormField({
  label,
  type,
  field,
  autoComplete,
}: {
  label: string;
  type: "text" | "email" | "password";
  field: FieldMetadata<string, object>;
  autoComplete?: HTMLInputAutoCompleteAttribute;
}) {
  return (
    <label className="form-control">
      <div className="label py-1">{label}</div>
      <input
        className="input input-bordered"
        autoComplete={autoComplete}
        {...getInputProps(field, { type })}
      />
      <div className="label text-error text-sm py-1">{field.errors}</div>
    </label>
  );
}

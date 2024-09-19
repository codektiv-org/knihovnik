import { FieldMetadata, getInputProps } from "@conform-to/react";

export function FormField({
  label,
  type,
  field,
}: {
  label: string;
  type: "text" | "email" | "password";
  field: FieldMetadata<string, object>;
}) {
  return (
    <label className="form-control">
      <div className="label py-1">{label}</div>
      <input
        className="input input-bordered"
        {...getInputProps(field, { type })}
      />
      <div className="label text-error text-sm py-1">{field.errors}</div>
    </label>
  );
}

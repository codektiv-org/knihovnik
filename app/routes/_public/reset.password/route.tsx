import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import { getFormProps, useForm } from "@conform-to/react";
import { useActionData, Form, Link } from "@remix-run/react";
import { json, ActionFunctionArgs } from "@remix-run/node";
import FormBox from "../FormBox";
import { FormField } from "../FormField";
import ModeSwitcher from "../ModeSwitcher";

const schema = z.object({
  email: z.string().email().toLowerCase(),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const result = parseWithZod(await request.formData(), { schema });

  return json(result.reply({ formErrors: ["TODO: reset pw"] }));
};

export default function ResetPassword() {
  const lastResult = useActionData<typeof action>();
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <FormBox subtitle="Reset Password">
      <Form {...getFormProps(form)}>
        <FormField label="E-mail" type="email" field={fields.email} />

        <div className="flex mt-4">
          <button className="ml-auto btn btn-primary" type="submit">
            Reset password
          </button>
        </div>
      </Form>

      {form.errors ? (
        <p className="p-1 text-error text-center">{form.errors}</p>
      ) : undefined}

      <ModeSwitcher>
        <div>
          <Link className="underline" to="/login">
            Back to login
          </Link>
        </div>
      </ModeSwitcher>
    </FormBox>
  );
}

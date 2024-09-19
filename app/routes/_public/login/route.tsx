import { getFormProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";
import FormBox from "../FormBox";
import { Form, useActionData } from "@remix-run/react";
import { json, type ActionFunctionArgs } from "@remix-run/node";
import { FormField } from "../FormField";

const schema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
  remember: z.boolean().optional(),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const submission = parseWithZod(await request.formData(), { schema });

  return json(submission.reply({ formErrors: ["TODO: login"] }));
};

export default function Login() {
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
    <FormBox subtitle="Login">
      <Form method="post" {...getFormProps(form)}>
        <FormField label="E-mail" type="email" field={fields.email} />
        <FormField label="Password" type="password" field={fields.password} />

        <div className="form-control flex flex-row items-center">
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              className="checkbox"
              key={fields.remember.key}
              name={fields.remember.name}
              defaultValue={fields.remember.initialValue}
            />
            <span className="ml-2 label-text">Stay logged in</span>
          </label>

          <button className="ml-auto btn btn-primary" type="submit">
            Login
          </button>
        </div>
      </Form>

      {form.errors ? (
        <p className="p-1 text-error text-center">{form.errors}</p>
      ) : undefined}
    </FormBox>
  );
}

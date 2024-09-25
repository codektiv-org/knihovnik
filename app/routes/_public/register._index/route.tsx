import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { getFormProps, useForm } from "@conform-to/react";
import FormBox from "../FormBox";
import { FormField } from "../FormField";
import ModeSwitcher from "../ModeSwitcher";

const schema = z.object({
  userName: z
    .string()
    .min(2)
    .regex(/^[a-zA-Z0-9-_]*[a-zA-Z0-9]$/),
  fullName: z.string(),
  password: z.string().min(4),
  pronouns: z.string().optional(),
  email: z.string().email().toLowerCase(),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const result = parseWithZod(await request.formData(), { schema });

  return json(result.reply({ formErrors: ["TODO: register"] }));
};

export default function Register() {
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
    <FormBox subtitle="Register">
      <Form {...getFormProps(form)}>
        <FormField
          label="E-mail"
          type="email"
          field={fields.email}
          autoComplete="email"
        />
        <FormField
          label="Password"
          type="password"
          field={fields.password}
          autoComplete="new-password"
        />
        <FormField
          label="User name"
          type="text"
          field={fields.userName}
          autoComplete="username"
        />
        <FormField
          label="Full name"
          type="text"
          field={fields.fullName}
          autoComplete="name"
        />
        <FormField label="Pronouns" type="text" field={fields.pronouns} />

        <div className="flex mt-4">
          <button className="ml-auto btn btn-primary" type="submit">
            Register
          </button>
        </div>
      </Form>

      {form.errors ? (
        <p className="p-1 text-error text-center">{form.errors}</p>
      ) : undefined}

      <ModeSwitcher>
        <div>
          <Link className="underline" to="/login">
            <span className="font-normal">Already have an account?</span> Log
            in!
          </Link>
        </div>
      </ModeSwitcher>
    </FormBox>
  );
}

import { z } from "zod";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { parseWithZod } from "@conform-to/zod";
import { themeCookie } from "~/utils/theme.server";

export const themeSchema = z.object({
  theme: z.enum(["light", "dark"]),
  path: z.string(),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const result = parseWithZod(await request.formData(), {
    schema: themeSchema,
  });

  if (result.status !== "success") return json(result.reply());

  return redirect(result.value.path, {
    headers: {
      "Set-Cookie": await themeCookie.serialize(result.value.theme),
    },
  });
};

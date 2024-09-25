import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params: _params }: LoaderFunctionArgs) => {
  // const hash = await params["hash"];

  return json({ success: false });
};

export default function Reset() {
  const { success } = useLoaderData<typeof loader>();

  const [title, subtitle] = success
    ? ["Success!", "Your password has been reset successfully."]
    : [
        "Something went wrong :(",
        "The link might have already expired, try resetting your password again.",
      ];

  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl">{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}

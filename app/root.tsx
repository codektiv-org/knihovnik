import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { Theme, themeContext } from "~/utils/theme";
import { themeCookie } from "./utils/theme.server";

import "./tailwind.css";

export const links: LinksFunction = () => [
  // TODO:
];

export const meta: MetaFunction = () => {
  return [
    { title: __APP_NAME__ },
    { name: "description", content: `Welcome to ${__APP_NAME__}!` },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const theme = await themeCookie.parse(await request.headers.get("cookie"));

  return json({ theme: (theme as Theme) ?? "dark" });
};

function Layout({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: Theme;
}) {
  return (
    <html lang="en" data-theme={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <themeContext.Provider value={theme}>{children}</themeContext.Provider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { theme } = useLoaderData<typeof loader>();

  return (
    <Layout theme={theme}>
      <Outlet />
    </Layout>
  );
}

export function ErrorBoundary() {
  return (
    <Layout theme="dark">
      <Outlet />
    </Layout>
  );
}

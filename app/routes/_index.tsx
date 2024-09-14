import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Knihovník" },
    { name: "description", content: "Welcome to Knihovník!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <header className="flex flex-col items-center gap-9">
        <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
          Knihovník
        </h1>
        <p className="hidden dark:block">Dark mode</p>
        <p className="dark:hidden">Light mode</p>
      </header>
    </div>
  );
}

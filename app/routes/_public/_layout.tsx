import { Outlet } from "@remix-run/react";

export default function PublicLayout() {
  const year = new Date().getFullYear();

  return (
    <div className="grid grid-cols-1 grid-rows-[1fr_auto] min-h-screen place-items-center">
      <Outlet />
      <footer className="text-sm opacity-40 py-2">
        {__APP_NAME__} by Codektiv
        <span className="inline-block mx-2">|</span>
        {year}
      </footer>
    </div>
  );
}

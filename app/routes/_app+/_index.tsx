import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: `${__APP_NAME__} | Dashboard` }];
};

export default function Index() {
  return (
    <div className="grid">
      <main>
        <Outlet />
      </main>
    </div>
  );
}

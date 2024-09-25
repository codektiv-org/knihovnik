import { Form, useLocation } from "@remix-run/react";
import { useContext } from "react";
import { themeContext } from "~/utils/theme";

export default function ModeSwitcher({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const theme = useContext(themeContext);
  const nextMode = theme === "dark" ? "light" : "dark";

  return (
    <div className="mt-4 space-y-2 text-center text-surface-500-400-token">
      {children}
      <Form method="POST" action="/theme">
        <input type="hidden" name="theme" value={nextMode} />
        <input type="hidden" name="path" value={location.pathname} />
        <button className="underline text-sm">Switch to {nextMode} mode</button>
      </Form>
    </div>
  );
}

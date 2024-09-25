import { createCookie } from "@remix-run/node";

export const themeCookie = createCookie("theme", {
  path: "/",
  httpOnly: true,
  sameSite: "strict",
  maxAge: 60 * 60 * 24 * 365,
});

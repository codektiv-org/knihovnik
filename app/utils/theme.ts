import { createContext } from "react";

export type Theme = "light" | "dark";

export const themeContext = createContext<Theme>("dark");

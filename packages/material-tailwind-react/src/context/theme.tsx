import React, { createContext, useContext, useMemo, ReactNode } from "react";
import merge from "deepmerge";
import { MTTheme } from "../theme";
import combineMerge from "../utils/combineMerge";

interface ThemeProviderProps {
  value?: Partial<MTTheme>;
  children: ReactNode;
}

const MaterialTailwindTheme = createContext<Partial<MTTheme> | undefined>({});

MaterialTailwindTheme.displayName = "MaterialTailwindThemeProvider";

function ThemeProvider({ value, children }: ThemeProviderProps) {
  const mergedValue = useMemo(() => merge({}, value || {}, { arrayMerge: combineMerge }), [value]);

  return <MaterialTailwindTheme.Provider value={mergedValue}>{children}</MaterialTailwindTheme.Provider>
}
const useTheme = <K extends keyof MTTheme>(key: K): MTTheme[K] => {
  const theme = useContext(MaterialTailwindTheme);
  if (!theme?.[key] || theme?.[key] === undefined) {
    throw new Error(`Material Tailwind Theme for '${key}' component is not defined in the theme`);
  }
  return theme[key] as MTTheme[K];
}

export { MaterialTailwindTheme, ThemeProvider, useTheme };
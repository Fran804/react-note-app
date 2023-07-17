import { useContext, useState } from "react";
import { createContext } from "react";

export const ThemeContext = createContext<any>(undefined);

export const ThemeContextProvider = ({children} : any) => {
  const [contextTheme, setContextTheme] = useState("Light");
  const values = { contextTheme, setContextTheme };

  return (
    <ThemeContext.Provider value={values}>
      {children}
    </ThemeContext.Provider>
  )
};

export const useThemeContext = () => {
  return useContext(ThemeContext)
}

import { useContext, useState, createContext } from "react";

export const ThemeContext = createContext<any>(undefined);

export const ThemeContextProvider = ({children} : any) => {
  const getTheme = localStorage.getItem("Theme") || "Light"
  const [contextTheme, setContextTheme] = useState(getTheme);
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

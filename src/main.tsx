import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import {ThemeContextProvider} from "./context/ThemeContext.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeContextProvider>
);

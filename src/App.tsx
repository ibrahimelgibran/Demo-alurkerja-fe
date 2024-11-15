import { AuthContext, ThemeContext, themeConfig } from "alurkerja-ui";
import { axiosInstance } from "./lib/axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";

const router = createBrowserRouter(routes);

function App() {
  return (
    <AuthContext.Provider value={axiosInstance}>
      <ThemeContext.Provider value={themeConfig}>
        <RouterProvider router={router} />
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;

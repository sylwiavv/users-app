import MainLayout from "./app/layouts/MainLayout";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "./app/context/SnackbarContex";

const App = () => {
  return (
      <SnackbarProvider>
        <BrowserRouter>
          {/* <RouterProvider router={router} /> */}
          <MainLayout />
        </BrowserRouter>
      </SnackbarProvider>
  );
};

export default App;

import { RouterProvider } from "react-router-dom";
import MainLayout from "./app/layouts/MainLayout";
import { BrowserRouter } from "react-router-dom";
import { UsersProvider } from "./app/context/UsersContext";
import { useUser } from "./server-actions/hooks/useUser";
import { SnackbarProvider } from "./app/context/SnackbarContex";

const App = () => {
  const { getUsers } = useUser();

  return (
    <UsersProvider getUsers={getUsers}>
      <SnackbarProvider>
        <BrowserRouter>
          {/* <RouterProvider router={router} /> */}
          <MainLayout />
        </BrowserRouter>
      </SnackbarProvider>
    </UsersProvider>
  );
};

export default App;

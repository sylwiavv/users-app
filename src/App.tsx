import MainLayout from "./app/layouts/MainLayout";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "./app/context/SnackbarContex";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

const App = () => {
  return (
    <Provider store={store}>
      <SnackbarProvider>
        <BrowserRouter>
          <MainLayout />
        </BrowserRouter>
      </SnackbarProvider>
      </Provider>
  );
};

export default App;

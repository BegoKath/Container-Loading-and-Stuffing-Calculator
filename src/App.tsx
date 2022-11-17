import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRoutes } from "./routes/AppRoutes";
import { store } from "./store/store";

function App() {
  return (
    <Provider store= {store}>
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  </Provider>
  );
}

export default App;

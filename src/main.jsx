import React from "react";
import ReactDOM from "react-dom/client";
import Routerpages from "./routers";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Provider} from "react-redux";
import store from "./store";

const App = () => {
  
  return (
    <>
      <Routerpages />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

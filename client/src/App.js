import React from "react";
import RoutesDefined from "./router";
import { Provider } from "react-redux";
import store from "./redux/store";
import { jwtDecode } from "jwt-decode";

const LocalStorage = localStorage.getItem("authToken");
if (LocalStorage) {
  const decodedToken = jwtDecode(LocalStorage);
  store.dispatch({ type: "LOGIN_REQUEST", payload: decodedToken });
}

const App = () => {
  return (
    <Provider store={store}>
      <RoutesDefined />
    </Provider>
  );
};

export default App;

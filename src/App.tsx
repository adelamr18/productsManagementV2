import React from "react";
import { Provider } from "react-redux";

import "./App.css";
import { Header } from "./library/common/components";
import { store } from "./main/store/store";
import { Dashboard } from "./modules";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Dashboard />
      </div>
    </Provider>
  );
}

export default App;

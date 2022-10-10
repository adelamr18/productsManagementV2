import React, { useState } from "react";
import { Provider } from "react-redux";

import "./App.css";
import { Header } from "./library/common/components";
import BasketModal from "./library/common/components/BasketModal/BasketModal";
import { store } from "./main/store/store";
import { Dashboard } from "./modules";

function App() {
  const [basketVisbility, setBasketVisbility] = useState(false);
  const [wasHeaderClicked, setHeaderVisibility] = useState(false);
  const onBasketToggle = (): void => {
    setBasketVisbility(!basketVisbility);
    setHeaderVisibility(true);
  };
  return (
    <Provider store={store}>
      <div className="App">
        <Header onBasketToggle={onBasketToggle} />
        <BasketModal wasHeaderClicked={wasHeaderClicked} isBasketModalVisible={basketVisbility} />
        <Dashboard />
      </div>
    </Provider>
  );
}

export default App;

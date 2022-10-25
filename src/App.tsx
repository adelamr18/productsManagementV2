import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./App.css";
import { Header } from "./library/common/components";
import BasketModal from "./library/common/components/BasketModal/BasketModal";
import { GlobalState } from "./library/common/interfaces/global";
import { Product } from "./library/common/interfaces/Product";
import { Dashboard, Shipping } from "./modules";
import { addedProductsSelector } from "./modules/Dashboard/selectors";
import { Routes, Route } from "react-router-dom";
import { APP_ROUTES } from "./library/common/constants/Routes";
import { Overview } from "./modules/Overview";

function App() {
  const [basketVisbility, setBasketVisbility] = useState(false);
  const [wasHeaderClicked, setHeaderVisibility] = useState(false);
  const onBasketToggle = (): void => {
    setBasketVisbility(!basketVisbility);
    setHeaderVisibility(true);
  };
 const addedProducts: Product[] = useSelector((state: GlobalState) => addedProductsSelector(state));

  return (
      <div className="App">
        <Header addedProducts={addedProducts} onBasketToggle={onBasketToggle} />
        <BasketModal addedProducts={addedProducts}  wasHeaderClicked={wasHeaderClicked} isBasketModalVisible={basketVisbility} />
        <Routes>
          <Route path={APP_ROUTES.HOME} element={<Dashboard/>}/>
          <Route path={APP_ROUTES.SHIP} element={ <Shipping/>}/>
          <Route path={APP_ROUTES.OVERVIEW} element={ <Overview/>}/>

        </Routes>
      </div>
  );
}

export default App;

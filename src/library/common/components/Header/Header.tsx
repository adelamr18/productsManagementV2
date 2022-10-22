import { FC, useEffect, useState } from "react";

import "./Header.css";
import { HEADER_TITLE } from "../../constants/Header";
import { Product } from "../../interfaces/Product";

interface HeaderProps {
  onBasketToggle: () => void;
  addedProducts: Product[];
}

const Header: FC<HeaderProps> = ({ onBasketToggle, addedProducts }) => {
  const toggleShoppingCart = (): void => {
    onBasketToggle();
  };
  const [userProducts, setUserProducts] = useState<Product[]>();
  const getNumberOfProducts = (): number => {
    if (userProducts) {
      return [...userProducts].reduce((acc: number, product: Product) => {
        return acc + product.quantity;
      }, 0);
    }
    return 0;
  };

  useEffect(() => {
    setUserProducts(addedProducts);
  }, [addedProducts]);

  return (
    <section className="header-container">
      <nav className="navbar navbar-light bg-light">
        <div className="header-title">
          <span className="navbar-brand mb-0 h1">{HEADER_TITLE}</span>
        </div>
        <div className="shopping-icon-with-products">
          <div className="products-number">{getNumberOfProducts()}</div>
          <div onClick={toggleShoppingCart} className="fas fa-shopping-cart"></div>
        </div>
      </nav>
    </section>
  );
};

export default Header;

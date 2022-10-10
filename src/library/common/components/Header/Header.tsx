import { FC } from "react";

import "./Header.css";
import { HEADER_TITLE } from "../../constants/HeaderConstants";

interface HeaderProps {
  onBasketToggle: () => void;
}

const Header: FC<HeaderProps> = ({ onBasketToggle }) => {
  const toggleShoppingCart = (): void => {
    onBasketToggle();
  };

  return (
    <section className="header-container">
      <nav className="navbar navbar-light bg-light">
        <div className="header-title">
          <span className="navbar-brand mb-0 h1">{HEADER_TITLE}</span>
        </div>
        <div className="shopping-icon-with-products">
          <div className="products-number">0</div>
          <div onClick={toggleShoppingCart} className="fas fa-shopping-cart"></div>
        </div>
      </nav>
    </section>
  );
};

export default Header;

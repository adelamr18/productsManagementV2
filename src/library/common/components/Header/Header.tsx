import { FC } from "react";

import "./Header.css";
import { HEADER_TITLE } from "../../constants/HeaderConstants";

export const Header: FC = () => {
  return (
    <section className="header-container">
      <nav className="navbar navbar-light bg-light">
        <div className="header-title">
          <span className="navbar-brand mb-0 h1">{HEADER_TITLE}</span>
        </div>
        <div className="shopping-icon-with-products">
          <div className="products-number">1</div>
          <div className="fas fa-shopping-cart"></div>
        </div>
      </nav>
    </section>
  );
};

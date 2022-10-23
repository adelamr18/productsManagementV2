import { FC, useEffect, useState } from "react";
import { useNavigate} from 'react-router-dom';

import "./Header.css";
import { HEADER_TITLE } from "../../constants/Header";
import { Product } from "../../interfaces/Product";
import { APP_ROUTES } from "../../constants/Routes";

interface HeaderProps {
  onBasketToggle: () => void;
  addedProducts: Product[];
}

const Header: FC<HeaderProps> = ({ onBasketToggle, addedProducts }) => {
  const navigate = useNavigate();
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

  const navigateToHome = (): void => {
    navigate(APP_ROUTES.HOME);
  }

  useEffect(() => {
    setUserProducts(addedProducts);
  }, [addedProducts]);

  return (
    <section className="header-container">
      <nav className="navbar navbar-light bg-light">
        <div className="header-title">
          <span onClick={() => navigateToHome()} className="navbar-brand mb-0 h1">{HEADER_TITLE}</span>
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

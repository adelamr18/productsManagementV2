import { ChangeEvent, FC, useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

import { Product } from "../../interfaces/Product";
import { useDispatch } from "react-redux";
import { DeleteProduct, UpdateProduct } from "../../../../modules/Dashboard/DashboardSlice";
import { BASKET_TITLE, ADD_PRODUCTS_TO_CART, EURO, TOTAL_PRICE } from "../../constants/BasketModal";
import { Button } from "../Button";
import { ORDER } from "../../constants/Button";
import "./BasketModal.css";
import { APP_ROUTES } from "../../constants/Routes";

interface BasketModalProps {
  isBasketModalVisible: boolean;
  wasHeaderClicked: boolean;
  addedProducts: Product[];
  children?: React.ReactNode;
}

const BasketModal: FC<BasketModalProps> = ({ isBasketModalVisible = false, wasHeaderClicked, addedProducts }) => {
  const [userAddedProducts, setUserAddedProducts] = useState<Product[]>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const determineBasketModalId = (): string => {
    if (wasHeaderClicked) {
      return isBasketModalVisible ? "selected" : "dismiss";
    }
    return "";
  };

  useEffect(() => {
    setUserAddedProducts(addedProducts);
  }, [addedProducts]);

  const onQuantityChange = (event: ChangeEvent<HTMLInputElement>, userProduct: Product) => {
    event.preventDefault();
    dispatch(
      UpdateProduct({
        id: userProduct.id,
        quantity: parseInt(event.target.value),
      })
    );
  };

  const deleteProduct = (id: string) => {
    dispatch(DeleteProduct({ id }));
  };

  const calculateTotalPrice = (): number => {
    if (userAddedProducts) {
      return [...userAddedProducts].reduce((acc: number, product: Product) => {
        return Math.floor(acc + product.quantity * product.price);
      }, 0);
    }
    return 0;
  };

  const navigateToRoute = () => {
    navigate(APP_ROUTES.SHIP);
  };

  return (
    <div id={determineBasketModalId()} className="shopping-cart-content">
      <div className="shopping-cart-heading">
        <span id="shopping-cart-heading-text">{BASKET_TITLE}</span>
      </div>
      <div className="shopping-cart-subheading-outer">
        <div className="shopping-cart-subheading-inner">
          <div className="shoppping-cart-logo">
            <i className="fa fa-shopping-cart"></i>
          </div>
          <div className="shopping-cart-text-outer">
            <span id="shopping-text">{ADD_PRODUCTS_TO_CART}</span>
          </div>
        </div>
        {userAddedProducts && userAddedProducts?.length > 0 && <hr />}
        <div className="selected-orders-container">
          {userAddedProducts?.map((product: Product) => {
            return (
              <div key={product.id} className="selected-orders-content">
                <div className="product-name">{product.productName}</div>
                <div className="product-quantity">
                  <input
                    value={product?.quantity}
                    type="number"
                    className="form-control override-form-control-modified"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => onQuantityChange(e, product)}
                  />
                </div>
                <div className="delete-product">
                  <i className="far fa-trash-alt" onClick={() => deleteProduct(product.id)}></i>
                </div>
                <div className="product-price">
                  {Math.floor(product.price * product.quantity)} {EURO}
                </div>
              </div>
            );
          })}
          {userAddedProducts && userAddedProducts?.length > 0 && <hr />}
          <div className="total-products-price">
            <span id="product-price-text">{TOTAL_PRICE}</span>
            <span id="product-price-number">
              {calculateTotalPrice()} {EURO}
            </span>
          </div>
          {userAddedProducts && userAddedProducts?.length > 0 && (
            <Button navigateToRoute={() => navigateToRoute()} enableFullWidth={false} buttonText={ORDER} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BasketModal;

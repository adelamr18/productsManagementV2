import { FC } from "react";
import "./BasketModal.css";
import React from "react";

interface BasketModalProps {
  isBasketModalVisible: boolean;
  wasHeaderClicked: boolean;
}

const BasketModal: FC<BasketModalProps> = React.memo(({isBasketModalVisible = false, wasHeaderClicked}) => {
  
  const determineBasketModalId = (): string => {
    if(wasHeaderClicked) {
      return isBasketModalVisible ? 'selected' : 'dismiss';
    }
    return '';
  }
  
  return (
    <div id={determineBasketModalId()} className="shopping-cart-content">
      <div className="shopping-cart-heading">
        <span id="shopping-cart-heading-text">Basket</span>
      </div>
      <div className="shopping-cart-subheading-outer">
        <div className="shopping-cart-subheading-inner">
          <div className="shoppping-cart-logo">
            <i className="fa fa-shopping-cart"></i>
          </div>
          <div className="shopping-cart-text-outer">
            <span id="shopping-text">Add products to your cart</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default BasketModal;

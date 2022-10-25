import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GlobalState } from "../../library/common/interfaces/global";
import { Product } from "../../library/common/interfaces/Product";
import { UserPaymentDetails, UserShipmentDetails } from "../../library/common/interfaces/UserDetails";
import { DeleteProduct, UpdateProduct } from "../Dashboard/DashboardSlice";
import { userPaymentDetailsSelector, userShipmentDetailsSelector } from "../Shipping/selectors";
import { Button } from "../../library/common/components";
import { EURO, TOTAL_PRICE } from "../../library/common/constants/BasketModal";
import { SUBMIT } from "../../library/common/constants/Button";
import "./Overview.css";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../library/common/constants/Routes";

interface OverviewProps {
  addedProducts: Product[];
}

const Overview: FC<OverviewProps> = ({ addedProducts }) => {
  const navigate = useNavigate();
  const [userAddedProducts, setUserAddedProducts] = useState<Product[]>();
  const userShipmentDetails: UserShipmentDetails = useSelector((state: GlobalState) => userShipmentDetailsSelector(state));
  const userPaymentDetails: UserPaymentDetails = useSelector((state: GlobalState) => userPaymentDetailsSelector(state));
  const dispatch = useDispatch();

  useEffect(() => {
    setUserAddedProducts(addedProducts);
  }, [addedProducts]);

  const deleteProduct = (id: string) => {
    dispatch(DeleteProduct({ id }));
  };

  const onQuantityChange = (event: ChangeEvent<HTMLInputElement>, userProduct: Product) => {
    event.preventDefault();
    dispatch(
      UpdateProduct({
        id: userProduct.id,
        quantity: parseInt(event.target.value),
      })
    );
  };

  const navigateToRoute = (): void => {
    navigate(APP_ROUTES.SUCCESS);
  };

  const calculateTotalPrice = (): number => {
    if (userAddedProducts) {
      return [...userAddedProducts].reduce((acc: number, product: Product) => {
        return Math.floor(acc + product.quantity * product.price);
      }, 0);
    }
    return 0;
  };

  return (
    <div className="overview-container">
      <span id="overview-header"> OVERVIEW</span>
      <div className="overview-information-container">
        <div className="shipping-details">
          <span id="shipping-header"> Shipping </span>
          <div className="firstname-info">
            <span id="firstname-text"> FirstName: </span>
            <span id="username-firstname">{userShipmentDetails.firstName}</span>
          </div>
          <div className="lastname-info">
            <span id="lastname-text"> Lastname: </span>
            <span id="username-lastname">{userShipmentDetails.lastName}</span>
          </div>
          <div className="address-info">
            <span id="address-text"> Address: </span>
            <span id="user-address">{userShipmentDetails.address}</span>
          </div>
          <div className="mobile-info">
            <span id="mobile-text"> Mobile: </span>
            <span id="username-mobile">{userShipmentDetails.mobile}</span>
          </div>
        </div>
        <div className="payment-details-container">
          <span id="payment-header"> Payment </span>
          <div className="cardholder-info">
            <span id="cardholder-text"> Cardholder: </span>
            <span id="cardholer-name">{userPaymentDetails.cardHolder} </span>
          </div>
          <div className="iban-info">
            <span id="iban-text"> Iban: </span>
            <span id="iban-number">{userPaymentDetails.iban}</span>
          </div>
        </div>
        <div className="product-details-container">
          <span id="products-header"> Products </span>
          <div className="added-orders-container">
            {userAddedProducts?.map((product: Product) => {
              return (
                <div className="added-orders-content">
                  <div className="product-name">{product.productName}</div>
                  <div className="product-quantity-modifed">
                    <input
                      value={product?.quantity}
                      className="form-control override-form-control-modified"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => onQuantityChange(e, product)}
                      type="number"
                    />
                  </div>
                  <div className="delete-product">
                    <i onClick={() => deleteProduct(product.id)} className="far fa-trash-alt"></i>
                  </div>
                  <div className="product-price">
                    {Math.floor(product.price * product.quantity)} {EURO}
                  </div>
                </div>
              );
            })}
          </div>
          {userAddedProducts && userAddedProducts?.length > 0 && <hr />}
          <div className="total-products-price">
            <span id="product-price-text">{TOTAL_PRICE}</span>
            <span id="product-price-number">
              {calculateTotalPrice()} {EURO}
            </span>
          </div>
            {userAddedProducts && userAddedProducts?.length > 0 && (
              <Button navigateToRoute={() => navigateToRoute()} enableFullWidth={true} buttonText={SUBMIT} />
            )}
        </div>
      </div>
    </div>
  );
};
export default Overview;

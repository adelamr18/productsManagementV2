import { FC } from "react";
import { useSelector } from "react-redux";

import { GlobalState } from "../../library/common/interfaces/global";
import { UserPaymentDetails, UserShipmentDetails } from "../../library/common/interfaces/UserDetails";
import { userPaymentDetailsSelector, userShipmentDetailsSelector } from "../Shipping/selectors";

import "./Overview.css";

const Overview: FC = () => {
  const userShipmentDetails: UserShipmentDetails = useSelector((state: GlobalState) => userShipmentDetailsSelector(state));
  const userPaymentDetails: UserPaymentDetails = useSelector((state: GlobalState) => userPaymentDetailsSelector(state));

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
          <span id="payment-header"> PAYMENT </span>
          <div className="cardholder-info">
            <span id="cardholder-text"> Cardholder: </span>
            <span id="cardholer-name">{userPaymentDetails.cardHolder} </span>
          </div>
          <div className="iban-info">
            <span id="iban-text"> Iban: </span>
            <span id="iban-number">{userPaymentDetails.iban}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Overview;

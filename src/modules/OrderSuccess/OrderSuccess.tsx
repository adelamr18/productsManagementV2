import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../library/common/components/Button";
import { CONTINUE_SHOPIPING, SUBMIT } from "../../library/common/constants/Button";
import { APP_ROUTES } from "../../library/common/constants/Routes";

import "./OrderSuccess.css";

const OrderSuccess: FC = () => {
    const navigate = useNavigate();

    const navigateToRoute = (): void => {
        navigate(APP_ROUTES.HOME);
      };

  return (
    <div className="order-success-container">
      <span id="success-header">Success</span>
      <i className="fa fa-check"></i>
      <div className="success-message">Thank you for your purchase</div>
      <Button navigateToRoute={() => navigateToRoute()} enableFullWidth={false} buttonText={CONTINUE_SHOPIPING} />

   </div>
  );
};

export default OrderSuccess;

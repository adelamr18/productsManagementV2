import { FC } from "react";

import { SHIPPING_TITLE } from "../../library/common/constants/Shipping";
import './Shipping.css';

const Shipping: FC = () => {
  return (
    <div className="shipment-details-container">
      <span id="shipment-header">{ SHIPPING_TITLE }</span>
    </div>
  );
};

export default Shipping;

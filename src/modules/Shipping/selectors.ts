import { Selector } from "react-redux";
import { GlobalState } from "../../library/common/interfaces/global";
import { UserPaymentDetails, UserShipmentDetails } from "../../library/common/interfaces/UserDetails";

export const userShipmentDetailsSelector: Selector<GlobalState, UserShipmentDetails> = (state: GlobalState) => state.shipping.userShippingDetails;
export const userPaymentDetailsSelector: Selector<GlobalState, UserPaymentDetails> = (state: GlobalState) => state.shipping.userPaymentDetails;

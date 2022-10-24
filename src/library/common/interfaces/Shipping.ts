import { UserPaymentDetails, UserShipmentDetails } from "./UserDetails";

export interface ShippingState {
    userShippingDetails: UserShipmentDetails
    userPaymentDetails: UserPaymentDetails;
}
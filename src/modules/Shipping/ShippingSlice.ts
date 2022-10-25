import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShippingState } from "../../library/common/interfaces/Shipping";
import { UserPaymentDetails, UserShipmentDetails } from "../../library/common/interfaces/UserDetails";


const namespace = 'shipping';

const initialState = {
    userShippingDetails: {},
    userPaymentDetails: {}
} as ShippingState;

interface setUserShippingDetailsPayload {
    userShippingDetails: UserShipmentDetails
}

interface setUserPaymentDetailsPayload {
    userPaymentDetails: UserPaymentDetails
}


const shippingSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
        setUserShippingdetails(state: ShippingState, action: PayloadAction<setUserShippingDetailsPayload>) {
            const { userShippingDetails } = action.payload;

            return {
                ...state,
                userShippingDetails
            }
        },
        setUserPaymentDetails(state: ShippingState, action: PayloadAction<setUserPaymentDetailsPayload>) {
            const { userPaymentDetails } = action.payload;

            return {
                ...state,
                userPaymentDetails

            }

        }
    }
})

export const { setUserShippingdetails, setUserPaymentDetails } = shippingSlice.actions;

export default shippingSlice.reducer;

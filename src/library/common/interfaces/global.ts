import { DashboardState } from "./Dashboard";
import { ShippingState } from "./Shipping";

export type GlobalState = Readonly<{
    dashboard: DashboardState;
    shipping: ShippingState;
  }>;
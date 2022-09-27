import { DashboardState } from "./Dashboard";

export type GlobalState = Readonly<{
    dashboard: DashboardState;
  }>;
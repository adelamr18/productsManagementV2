import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SearchBar } from "../../library/common/components/SearchBar/SearchBar";
import "./Dashboard.css";
import { AppDispatch, fetchDashboardData } from "./DashboardSlice";

export const Dashboard: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  dispatch(fetchDashboardData());

  return (
    <div className="dashboard-container">
      <SearchBar />
    </div>
  );

};

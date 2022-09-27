import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, fetchDashboardData } from "./DashboardSlice";
import { allProductsSelector } from "./selectors";
import { SearchBar } from "../../library/common/components";
import { GlobalState } from "../../library/common/interfaces/global";
import { Product } from "../../library/common/interfaces/Product";
import "./Dashboard.css";

 const Dashboard: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products: Product[] = useSelector((state: GlobalState) => allProductsSelector(state));
  console.log(products);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, []);

  return (
    <div className="dashboard-container">
      <SearchBar />
    </div>
  );
};

export default Dashboard;

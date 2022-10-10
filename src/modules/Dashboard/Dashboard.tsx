import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, FetchDashboardData } from "./DashboardSlice";
import { allProductsSelector } from "./selectors";
import { SearchBar, Table } from "../../library/common/components";
import { GlobalState } from "../../library/common/interfaces/global";
import { Product } from "../../library/common/interfaces/Product";
import "./Dashboard.css";

const Dashboard: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products: Product[] = useSelector((state: GlobalState) => allProductsSelector(state));

  useEffect(() => {
    dispatch(FetchDashboardData());
  }, [dispatch]);

  return (
    <div className="dashboard-container">
      <SearchBar />
      <Table  products={products} />
    </div>
  );
};

export default Dashboard;

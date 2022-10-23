import { FC } from "react";

import "./Spinner.css";

const Spinner: FC = () => {
  return (
    <div className="loader-container">
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;

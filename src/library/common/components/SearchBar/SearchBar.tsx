import { FC } from "react";

import { searchBarPlaceholder } from "../../constants/SearchBar";
import "./SearchBar.css";

 const SearchBar: FC = () => {
  return (
    <div className="search-container-inner">
      <input
        className="form-control override-form-control"
        id="override"
        type="text"
        name="search"
        placeholder={searchBarPlaceholder}
      />
    </div>
  );
};

export default SearchBar;
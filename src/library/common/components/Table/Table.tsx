import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Product } from "../../interfaces/Product";
import { ALREADY_ADDED_PRODUCT_ERROR, TABLE_COLUMN_NAMES } from "../../constants/Table";
import "./Table.css";
import { AddSelectedProduct } from "../../../../modules/Dashboard/DashboardSlice";
import { hasQuantityExceedingError } from "../../../../modules/Dashboard/selectors";
import { GlobalState } from "../../interfaces/global";

interface TableProps {
  products: Product[];
}

const Table: FC<TableProps> = ({ products }) => {
  const [userProducts, setUserProducts] = useState<Product[]>();
  const dispatch = useDispatch();
  const hasExceedingQuantity: boolean = useSelector((state: GlobalState) => hasQuantityExceedingError(state)); 

  const onQuantityChange = (event: ChangeEvent<HTMLInputElement>, userProduct: Product) => {
    event.preventDefault();
    setUserProducts(
      [...products].map((product: Product) => {
        if (product.id === userProduct.id) {
          return {
            ...product,
            quantity: parseInt(event.target.value),
          };
        }
        return product;
      })
    );
  };

  const addProduct = (product: Product): void => {
    const typedProduct = userProducts?.find((elem: Product) => elem.id === product.id);
    if (typedProduct) {
      dispatch(
        AddSelectedProduct({
          product: typedProduct,
          typedQuantity: typedProduct?.quantity,
        })
      );
    }
  };

  useEffect(() => {
    setUserProducts(products);
  }, [products]);

  return (
    <div className="table-container">
      {hasExceedingQuantity && <div className="alert alert-danger"> {ALREADY_ADDED_PRODUCT_ERROR}</div>}

      <table className="table table-hover">
        <thead>
          <tr>
            {TABLE_COLUMN_NAMES.map((column: string) => {
              return <th scope="col">{column}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {userProducts?.map((product: Product) => {
            return (
              <tr key={product.id}>
                <td>{product.productName}</td>
                <td>{product.price} €</td>
                <td className="qty">
                  <div className="quantity-container">
                    <input
                      value={product?.quantity}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => onQuantityChange(e, product)}
                      type="number"
                      className="form-control form-control-modifed-width"
                    />
                    <i onClick={() => addProduct(product)} className="fa fa-plus"></i>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

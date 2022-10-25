import { FC } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { SHIPPING_TITLE } from "../../library/common/constants/Shipping";
import "./Shipping.css";
import validationSchema from "../../library/common/constants/Validation";
import { Button } from "../../library/common/components";
import { CONTINUE } from "../../library/common/constants/Button";
import { useDispatch } from "react-redux";
import { setUserPaymentDetails, setUserShippingdetails } from "./ShippingSlice";
import { APP_ROUTES } from "../../library/common/constants/Routes";

const Shipping: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToRoute = (): void => {};

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      mobile: "",
      cardHolder: "",
      iban: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const { mobile, firstName, lastName, address, iban, cardHolder } = values;
      
      dispatch(
        setUserPaymentDetails({
          userPaymentDetails: {
            cardHolder,
            iban,
          },
        })
      );
      dispatch(
        setUserShippingdetails({
          userShippingDetails: {
            mobile,
            lastName,
            firstName,
            address,
          },
        })
      );
      navigate(APP_ROUTES.OVERVIEW);
    }
  });
  return (
    <div className="shipment-details-container">
      <span id="shipment-header">{SHIPPING_TITLE}</span>
      <div className="shipping-form-container">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Firstname</label>
            <div className="col-sm-10">
              <input
                value={formik.values.firstName}
                name="firstName"
                onChange={formik.handleChange}
                type="text"
                className={formik.errors.firstName ? "form-control is-invalid" : "form-control"}
                placeholder="FirstName"
              />
              {formik.errors.firstName && formik.touched.firstName && <p>{formik.errors.firstName}</p>}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Lastname</label>
            <div className="col-sm-10">
              <input
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                type="text"
                className={formik.errors.lastName ? "form-control is-invalid" : "form-control"}
                placeholder="Lastname"
              />
              {formik.errors.lastName && formik.touched.lastName && <p>{formik.errors.lastName}</p>}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Address</label>
            <div className="col-sm-10">
              <input
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                type="text"
                className={formik.errors.address ? "form-control is-invalid" : "form-control"}
                placeholder="Address"
              />
              {formik.errors.address && formik.touched.address && <p>{formik.errors.address}</p>}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Mobile</label>
            <div className="col-sm-10">
              <input
                name="mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                type="text"
                className={formik.errors.mobile ? "form-control is-invalid" : "form-control"}
                placeholder="Mobile"
              />
              {formik.errors.mobile && formik.touched.mobile && <p>{formik.errors.mobile}</p>}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Cardholder</label>
            <div className="col-sm-10">
              <input
                name="cardHolder"
                value={formik.values.cardHolder}
                onChange={formik.handleChange}
                type="text"
                className={formik.errors.cardHolder ? "form-control is-invalid" : "form-control"}
                placeholder="Cardholder"
              />
              {formik.errors.cardHolder && formik.touched.cardHolder && <p>{formik.errors.cardHolder}</p>}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Iban</label>
            <div className="col-sm-10">
              <input
                name="iban"
                value={formik.values.iban}
                onChange={formik.handleChange}
                type="text"
                className={formik.errors.iban ? "form-control is-invalid" : "form-control"}
                placeholder="Iban"
              />
              {formik.errors.iban && formik.touched.iban && <p>{formik.errors.iban}</p>}
            </div>
          </div>
          <div className="submit-container">
            <Button navigateToRoute={() => navigateToRoute()} enableFullWidth={true} buttonText={CONTINUE} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Shipping;

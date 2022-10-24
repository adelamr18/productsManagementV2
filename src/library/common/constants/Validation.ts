
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Mininum 2 characters")
    .max(15, "Maximum 15 characters")
    .required("Please enter your firstname"),
  lastName: Yup.string()
    .min(2, "Mininum 2 characters")
    .max(15, "Maximum 15 characters")
    .required("Please enter your lastname"),
  address: Yup.string()
    .required("Please enter your address"),
  mobile: Yup.string()
    .max(14, "Maximum 13 digits")
    .matches(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i, 'Mobile number must have a plus sign and numbers only')
    .required("Please enter your mobile phone"),
  cardHolder: Yup.string()
    .required("Please enter cardholder name"),
  iban: Yup.string()
    .matches(/^DE[0-9]{20}$/, 'Iban is invalid')
    .required("Please enter iban"),
});

export default validationSchema;
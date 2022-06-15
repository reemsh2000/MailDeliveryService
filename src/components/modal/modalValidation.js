export const modalValidation = (newPackageInfo) => {
  const validateErrors = {
    id: "",
    weight: "",
    price: "",
    shippingOrder: "",
    customerid: "",
  };
  if (newPackageInfo.customerid && !parseInt(newPackageInfo.customerid)) {
    validateErrors.customerid = "Customer Id Should be a number";
  } else validateErrors.customerid = "";
  if (
    newPackageInfo.price &&
    (!parseInt(newPackageInfo.price) || parseInt(newPackageInfo.price) < 0)
  ) {
    validateErrors.price = "Price should be a number > 0";
  } else validateErrors.price = "";
  if (
    newPackageInfo.weight &&
    (!parseInt(newPackageInfo.weight) || parseInt(newPackageInfo.weight) < 0)
  ) {
    validateErrors.weight = "Weight should be a number > 0";
  } else validateErrors.weight = "";
  if (
    newPackageInfo.shippingOrder &&
    (!parseInt(newPackageInfo.shippingOrder) ||
      parseInt(newPackageInfo.shippingOrder) < 0)
  ) {
    validateErrors.shippingOrder = "Shipping Order should be a number > 0";
  } else validateErrors.shippingOrder = "";

  return validateErrors;
};

export const checkNotEmpty = (newPackageInfo) => {
  if (
    newPackageInfo.customerid !== "" &&
    newPackageInfo.weight !== "" &&
    newPackageInfo.price !== "" &&
    newPackageInfo.shippingOrder !== ""
  )
    return true;
  return false;
};

const getData = () => {
  return fetch("/data.json").then((response) => response.json());
};
// get Customer packages
const getPackages = (appData, customerId) => {
  const pack = appData.packages.filter(
    (customePackage) => parseInt(customerId) === customePackage.customerid
  );
  return pack;
};
// get Customer prices
const getPrices = (packages) => {
  const prices = packages.reduce(
    (previousValue, currentValue) => previousValue + currentValue.price,
    0
  );
  return prices;
};
// get Customer packages weights
const getWeights = (packages) => {
  const weights = packages.reduce(
    (previousValue, currentValue) =>
      previousValue + parseInt(currentValue.weight.split("kg")[0]),
    0
  );
  return weights;
};
// get all invoices
const getAllInvoices = (appData) => {
  const allInvoices = [];
  appData.customers.forEach((customer) => {
    const customerPackages = getPackages(appData, customer.id);
    const customerWeights = getWeights(customerPackages);
    const customerPrices = getPrices(customerPackages);
    const invoice = {
      name: customer.name,
      weights: customerWeights,
      prices: customerPrices,
      id: customer.id,
    };
    allInvoices.push(invoice);
  });
  return allInvoices;
};
// Delete Customer using Id
const deleteCustomerById = (id, appData) => {
  const newCustomers = appData.customers.filter(
    (customer) => customer.id !== id
  );
  const newPackages = appData.packages.filter(
    (packag) => packag.customerid !== id
  );
  return { customers: newCustomers, packages: newPackages };
};
// Get Customer Name
const getCustomerName = (id, customers) => {
  const customer = customers.filter(
    (customer) => parseInt(id) === customer.id
  )[0];
  return customer?.name;
};
// Add package
const addPackage = (newPackageInfo, appData) => {
  let errorMsg = "";
  const customerExist = getCustomerName(
    newPackageInfo.customerid,
    appData.customers
  );
  if (!customerExist) {
    errorMsg = "This customer doesn't exsit";
    return { errorMsg, newData: appData };
  }
  const newPackage = {
    id: newPackageInfo.id,
    weight: `${newPackageInfo.weight}kg`,
    price: parseInt(newPackageInfo.price),
    shippingOrder: parseInt(newPackageInfo.shippingOrder),
    customerid: parseInt(newPackageInfo.customerid),
  };
  const newPackages = [...appData.packages, newPackage];
  const newData = { customers: appData.customers, packages: newPackages };
  return { newData: newData, errorMsg };
};

export {
  getData,
  getPackages,
  getPrices,
  getWeights,
  getAllInvoices,
  deleteCustomerById,
  getCustomerName,
  addPackage,
};

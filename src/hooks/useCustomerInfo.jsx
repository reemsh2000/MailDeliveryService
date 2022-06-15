import { useEffect, useState } from "react";
import { getPackages, getPrices, getWeights } from "../Functions";
function useCustomerInfo(customerId, appData) {
  const [packages, setPackages] = useState([]);
  const [prices, setPrices] = useState(0);
  const [weights, setWeights] = useState(0);

  useEffect(() => {
    setPackages(getPackages(appData, customerId));
  }, [appData, customerId]);

  useEffect(() => {
    setPrices(getPrices(packages));
    setWeights(getWeights(packages));
  }, [packages]);

  return { prices, weights, packages };
}

export default useCustomerInfo;

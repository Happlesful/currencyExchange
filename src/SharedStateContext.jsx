import React, { createContext, useState, useEffect } from "react";
import tokens from "./conversion.json";

const SharedStateContext = createContext();

const getLastTokenPrice = (currency, tokens) => {
  const token = tokens.filter((item) => item.currency === currency);
  let lastDate = token[0].date;
  let lastPrice = token[0].price;
  for (const x of token) {
    if (lastDate < x.date) {
      lastPrice = x.price;
      lastDate = x.date;
    } else if (lastDate === x.date) {
      lastPrice = x.price;
    }
  }
  return lastPrice;
};

const ETHPrice = Math.round(getLastTokenPrice("ETH", tokens) * 1e5, 5) / 1e5;
const USDPrice = Math.round(getLastTokenPrice("USD", tokens) * 1e5, 5) / 1e5;

const SharedStateProvider = ({ children }) => {
  const [searchCurrency, setSearchCurrency] = useState(false);
  const [currencyOne, setCurrencyOne] = useState("ETH");
  const [currencyTwo, setCurrencyTwo] = useState("USD");
  const [currencyRateOne, setCurrencyRateOne] = useState(ETHPrice);
  const [currencyRateTwo, setCurrencyRateTwo] = useState(USDPrice);
  const [modifyingCurrency, setModifyingCurrency] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(ETHPrice);
  const [valueOne, setValueOne] = useState(1);
  const [valueTwo, setValueTwo] = useState(exchangeRate);

  const sharedState = {
    searchCurrency,
    setSearchCurrency,
    currencyOne,
    setCurrencyOne,
    currencyTwo,
    setCurrencyTwo,
    currencyRateOne,
    setCurrencyRateOne,
    currencyRateTwo,
    setCurrencyRateTwo,
    modifyingCurrency,
    setModifyingCurrency,
    exchangeRate,
    setExchangeRate,
    valueOne,
    setValueOne,
    valueTwo,
    setValueTwo,
  };

  return (
    <SharedStateContext.Provider value={sharedState}>
      {children}
    </SharedStateContext.Provider>
  );
};

export { SharedStateProvider, SharedStateContext };

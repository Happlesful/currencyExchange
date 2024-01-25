import React, { useEffect, useState, useContext } from "react";
import tokens from "../conversion.json";
import { SharedStateContext } from "../SharedStateContext";
import { IoClose } from "react-icons/io5";

const TokenSearcher = () => {
  const [uniqueTokens, setUniqueTokens] = useState([]);
  const [filteredTokens, setfilteredTokens] = useState("");
  const [visibility, setVisibility] = useState(false);
  const {
    setSearchCurrency,
    setCurrencyOne,
    setCurrencyTwo,
    currencyRateOne,
    setCurrencyRateOne,
    currencyRateTwo,
    setCurrencyRateTwo,
    modifyingCurrency,
    setModifyingCurrency,
    valueOne,
    setValueOne,
    valueTwo,
    setValueTwo,
  } = useContext(SharedStateContext);

  useEffect(() => {
    const uniqueTokenSet = new Set();
    for (const token of tokens) {
      if (
        !uniqueTokenSet.has(token.currency) &&
        (filteredTokens === "" ||
          token.currency.toLowerCase().includes(filteredTokens))
      ) {
        uniqueTokenSet.add(token.currency);
      }
    }
    const result = Array.from(uniqueTokenSet).sort();
    setUniqueTokens(result);
  }, [filteredTokens]);

  const getLastTokenPrice = (currency, tokens) => {
    //returns the latest price of the currency
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

  useEffect(() => {
    setVisibility(true);
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
      <section
        className={`flex flex-col justify-center rounded-lg bg-slate-900 py-1 px-3 border-2 border-slate-800 shadow-sm shadow-gray-900 ${
          visibility
            ? "opacity-100 transition-opacity duration-200 ease-linear"
            : "opacity-0"
        }`}
      >
        <div className="flex flex-row justify-end">
          <IoClose
            className="h-7 w-7 text-slate-400 hover:text-slate-200 ease-in duration-100"
            onClick={() => {
              setSearchCurrency(false);
            }}
          />
        </div>
        <div className="flex flex-col h-lg w-80">
          <p className="text-slate-300 border-b-2 border-b-slate-400">
            Search currency
          </p>
          <input
            type="text"
            placeholder="search..."
            autoComplete="off"
            className="mt-2 mb-5 h-9 w-auto pl-3 focus:outline-none"
            onChange={(e) => {
              setfilteredTokens(e.target.value.toLowerCase());
            }}
          ></input>
          <p className="text-slate-300 border-b-2 border-b-slate-400">
            Select currency
          </p>
          {uniqueTokens.length !== 0 ? (
            <ul className="h-slg overflow-y-scroll">
              {uniqueTokens.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    //updates the currency exchange rate for the variable changed
                    modifyingCurrency === 1
                      ? setCurrencyRateOne(
                          getLastTokenPrice(item, tokens).toFixed(5)
                        )
                      : setCurrencyRateTwo(
                          getLastTokenPrice(item, tokens).toFixed(5)
                        );
                    //updates the new currency name for the variable changed
                    modifyingCurrency === 1
                      ? setCurrencyOne(item)
                      : setCurrencyTwo(item);
                    setSearchCurrency(false);
                    //updates the new value to be shown in the input field (result)
                    modifyingCurrency === 1
                      ? valueOne === ""
                        ? setValueTwo("")
                        : setValueTwo(
                            Math.round(
                              valueOne *
                                getLastTokenPrice(item, tokens) *
                                (1e5 / currencyRateTwo),
                              5
                            ) / 1e5
                          )
                      : valueTwo === ""
                      ? setValueOne("")
                      : setValueOne(
                          Math.round(
                            valueTwo *
                              getLastTokenPrice(item, tokens) *
                              (1e5 / currencyRateOne),
                            5
                          ) / 1e5
                        );
                    setModifyingCurrency(0);
                  }}
                  className="text-slate-300 py-1 px-2 hover:bg-slate-800 duration-100 ease-linear"
                >
                  <span className="flex flex-row items-center">
                    <img
                      src={`/tokens/${item}.svg`}
                      alt={item}
                      className="w-9 h-9 mr-3 my-1"
                    />
                    {item}
                    <p className="ml-5 mr-2 text-xs text-neutral-400">
                      last price:
                    </p>
                    <p className="text-xs text-neutral-400">
                      USD$
                      {getLastTokenPrice(item, tokens).toFixed(5)}
                    </p>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <p className="flex text-slate-400 justify-center pt-4">
                No currency found
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TokenSearcher;

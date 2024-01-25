import React, { useState, useEffect, useContext } from "react";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { SharedStateContext } from "../SharedStateContext";

const Body = () => {
  const {
    setSearchCurrency,
    currencyOne,
    currencyTwo,
    currencyRateOne,
    currencyRateTwo,
    setModifyingCurrency,
    exchangeRate,
    setExchangeRate,
    valueOne,
    setValueOne,
    valueTwo,
    setValueTwo,
  } = useContext(SharedStateContext);

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-slate-400 rounded-sm border-2 border-slate-500 shadow-sm shadow-gray-500">
        <p className="pb-3 pt-2 px-3 text-lg font-extrabold">Exchange</p>
        <span className="flex flex-col items-center justify-center ml-2">
          <span className="flex flex-row items-center justify-between mx-4 my-2 bg-slate-300 h-24 w-sm shadow-sm shadow-slate-500">
            <button
              className="flex flex-row px-6 h-24 items-center"
              onClick={() => {
                setModifyingCurrency(1);
                setSearchCurrency(true);
              }}
            >
              <IoSearchSharp className="mr-2 rounded-lg bg-slate-600 scale-150 p-0.5 hover:bg-slate-500 text-slate-200" />
              {currencyOne === "" ? (
                <p>Select currency</p>
              ) : (
                <span className="flex flex-row items-center justify-center">
                  <img
                    src={`/tokens/${currencyOne}.svg`}
                    alt={currencyOne}
                    className="w-9 h-9 mx-3"
                  />
                  <span className="flex flex-col items-start">
                    <p className="text-xl">{currencyOne}</p>
                    <p className="text-xs">
                      {currencyRateOne} USD/{currencyOne}
                    </p>
                  </span>
                </span>
              )}
            </button>
            <input
              type="number"
              id="currency-one"
              value={valueOne}
              placeholder=" value..."
              autoComplete="off"
              className="pl-2 text-lg w-auto h-24 ml-3 bg-slate-200 hover:scale-102 focus:scale-102 focus:outline-0 focus:shadow-md focus:shadow-gray-500 ease-linear duration-75 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              onChange={(e) => {
                if (e.target.value !== "") {
                  const valOne = parseFloat(e.target.value);
                  setValueTwo(Math.round(valOne * exchangeRate * 1e5, 5) / 1e5);
                  setValueOne(valOne);
                } else {
                  setValueOne("");
                  setValueTwo("");
                }
              }}
            />
          </span>
          <MdOutlineCurrencyExchange className="m-2 w-6 h-6" />
          <span className="flex flex-row items-center mx-4 my-2 bg-slate-300 h-24 w-sm justify-between shadow-sm shadow-slate-500">
            <button
              className="flex flex-row px-6 h-24 items-center"
              onClick={() => {
                setModifyingCurrency(2);
                setSearchCurrency(true);
              }}
            >
              <IoSearchSharp className="mr-2 rounded-lg bg-slate-600 scale-150 p-0.5 hover:bg-slate-500 text-slate-200" />
              {currencyTwo === "" ? (
                <p>Select currency</p>
              ) : (
                <span className="flex flex-row items-center justify-center">
                  <img
                    src={`/tokens/${currencyTwo}.svg`}
                    alt={currencyTwo}
                    className="w-9 h-9 mx-3"
                  />
                  <span className="flex flex-col items-start">
                    <p className="text-xl">{currencyTwo}</p>
                    <p className="text-xs">
                      {currencyRateTwo} USD/{currencyTwo}
                    </p>
                  </span>
                </span>
              )}
            </button>
            <input
              type="number"
              value={valueTwo}
              id="currency-two"
              placeholder=" value..."
              autoComplete="off"
              className="pl-2 text-lg w-auto h-24 ml-3 bg-slate-200 hover:scale-102 focus:scale-102 focus:outline-0 focus:shadow-md focus:shadow-gray-500 ease-linear duration-75 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              onChange={(e) => {
                if (e.target.value !== "") {
                  const valTwo = parseFloat(e.target.value);
                  setValueOne(
                    Math.round((valTwo / exchangeRate) * 1e5, 5) / 1e5
                  );
                  setValueTwo(valTwo);
                } else {
                  setValueOne("");
                  setValueTwo("");
                }
              }}
            />
          </span>
          <p className="flex items-center justify-center text-sm mb-2">
            1 {currencyOne} = {(currencyRateOne / currencyRateTwo).toFixed(5)}
            {setExchangeRate(
              (currencyRateOne / currencyRateTwo).toFixed(5)
            )}{" "}
            {currencyTwo}
          </p>
        </span>
      </div>
    </>
  );
};

export default Body;

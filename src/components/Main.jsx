import React, { useState, useEffect, useContext } from "react";
import { Body, TokenSearcher, Dimmer } from "./index";
import { SharedStateContext } from "../SharedStateContext";

const Main = () => {
  const { searchCurrency } = useContext(SharedStateContext);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
  });

  return (
    <div classNmae="flex items-center justify-center">
      <Body />
      {searchCurrency ? (
        <>
          <TokenSearcher className="opacity-20" />
          <Dimmer />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Main;

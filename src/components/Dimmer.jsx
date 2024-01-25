import React, { useState, useEffect, useContext } from "react";
import { SharedStateContext } from "../SharedStateContext";

const Dimmer = () => {
  const [visibility, setVisibility] = useState(false);
  const { setSearchCurrency } = useContext(SharedStateContext);

  useEffect(() => {
    setVisibility(true);
  }, []);

  return (
    <div
      className={`fixed w-screen h-screen top-0 left-0 bg-black z-0 ${
        visibility
          ? "bg-opacity-40 transition-bg-opacity duration-200 ease-linear"
          : "bg-opacity-0"
      }`}
      onClick={() => {
        setSearchCurrency(false);
      }}
    ></div>
  );
};

export default Dimmer;

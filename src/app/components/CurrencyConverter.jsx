"use client";
import React, { useState, useEffect } from "react";
import CurrencyDropdown from "./dropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";

// api - currency-converter = 'https://api.frankfurter.app/currencies'
// api - latest-currencies = 'https://api.frankfurter.app/latest?amount=1&from=USD&to=INR'

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setfromCurrency] = useState("USD");
  const [toCurrency, settoCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false);
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem("favourites")) || ["INR", "USD"]
  );

  const fetchCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();

      // console.log(data + "hellooo" );
      setCurrencies(Object.keys(data));
      // console.log(data + "hellooo" + "22222");
      

    } catch (error) {
      console.log("Error fetching currencies", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  // console.log(currencies);

  const convertCurrency = async () => {
    if (!amount) return;
    setConverting(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );

      const data = await res.json();
      setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
      console.log(setConvertedAmount);
    } catch (error) {
      console.log("Error fetching currencies", error);
    } finally {
      setConverting(false);
    }
  };

  const handleFavourite = (currency) => {
    let updatedFavourites = [...favourites];
    if (favourites.includes(currency)) {
      updatedFavourites = updatedFavourites.filter((fav) => fav !== currency);
    } else {
      updatedFavourites.push(currency);
    }

    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    console.log(localStorage + "localStorage");
  };

  const swapCurrencies = () => {
    setfromCurrency(toCurrency);
    settoCurrency(fromCurrency);
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-2xl shadow-2xl">
      <h2 className="mb-5 text-4xl font-semibold text-grey-700 text-center">
        Currency Converter
      </h2>

      {/* From part of Currency */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <CurrencyDropdown
          favourites={favourites}
          currencies={currencies}
          title="From"
          currency={fromCurrency}
          setCurrency={setfromCurrency}
          handleFavourite={handleFavourite}
        />

        {/* Swapping Currency Button */}
        <div className="flex justify-center -mb-5 sm:mb-0">
          <button
            onClick={swapCurrencies}
            className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
          >
            <HiArrowsRightLeft className="text-xl text-gray-700" />
          </button>
        </div>

        {/* To part of Currency */}
        <CurrencyDropdown
          favourites={favourites}
          currencies={currencies}
          title="To"
          currency={toCurrency}
          setCurrency={settoCurrency}
          handleFavourite={handleFavourite}
        />
      </div>

      {/* Amount Part of Currency */}
      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount :
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          required
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
        />
      </div>

      {/* Convert currency part */}
      <div className="flex justify-end mt-6">
        <button
          onClick={convertCurrency}
          className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 
          ${converting ? "animate-pulse" : ""}`}
        >
          Convert
        </button>
      </div>

      {convertedAmount && (
        <div className="mt-4 text-lg font-medium text-right text-green-600">
          Converted Amount : {convertedAmount}
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;

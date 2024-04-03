import React from "react";
import { HiOutlineStar } from "react-icons/hi2";

const CurrencyDropdown = ({
  currencies,
  currency,
  setCurrency,
  favourites,
  handleFavourite,
  title = "",
}) => {
  return (
    <div>
      <label
        htmlFor={title}
        className="block text-sm font-medium text-gray-700"
      >
        {title}
      </label>

      <div className="mt-1 relative">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {/* render favourite currencies */}

          <hr />
          {currencies?.map((currency) => {
            return (
              <option value={currency} key={currency}>
                {currency}
              </option>
            );
          })}
        </select>

        <button
          onClick={() => handleFavourite(currency)}
          className="absolute inset-y-0 right-0 pr-7 flex items-center text-lg leading-5"
        >
          <HiOutlineStar />
        </button>
      </div>
    </div>
  );
};

export default CurrencyDropdown;

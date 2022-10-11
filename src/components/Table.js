import React, { useState } from "react";
import TableLine from "./TableLine";
import ToTop from "./ToTop";
import { useSelector } from "react-redux";

const Table = ({ coinsData }) => {
  const showStableCoins = useSelector((state) => state.showStable);
  const showFavList = useSelector((state) => state.showFavList);
  const [rangeNumber, setRangeNumber] = useState(100);
  const [orderBy, setOrderBy] = useState("Market Cap");
  const [input, setInput] = useState("");
  const tableHeader = [
    "Prix",
    "Market Cap",
    "Volume",
    "1h",
    "1j",
    "1s",
    "1m",
    "6m",
    "1a",
    "ATH",
  ];

  const excludeCoin = (coin) => {
    if (
      coin === "usdt" ||
      coin === "usdc" ||
      coin === "busd" ||
      coin === "dai" ||
      coin === "ust" ||
      coin === "mim" ||
      coin === "tusd" ||
      coin === "usdp" ||
      coin === "usdn" ||
      coin === "fei" ||
      coin === "tribe" ||
      coin === "gusd" ||
      coin === "frax" ||
      coin === "lusd" ||
      coin === "husd" ||
      coin === "ousd" ||
      coin === "xsgd" ||
      coin === "usdx" ||
      coin === "eurs"
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="table-container">
      <input
        type="text"
        placeholder="Recherche..."
        className="searchbar"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <ul className="table-header">
        <div className="range-container">
          <span>
            Top{" "}
            <input
              type="text"
              value={rangeNumber}
              onChange={(e) => setRangeNumber(e.target.value)}
            />
          </span>
          <input
            type="range"
            min="1"
            max="250"
            value={rangeNumber}
            onChange={(e) => setRangeNumber(e.target.value)}
          />
          <ToTop />
        </div>
        {tableHeader.map((el) => (
          <li key={el}>
            <input
              type="radio"
              name="header-el"
              id={el}
              defaultChecked={
                el === orderBy || el === orderBy + "reverse" ? true : false
              }
              onClick={(e) => {
                if (orderBy === el) {
                  setOrderBy(el + "reverse");
                } else {
                  setOrderBy(el);
                }
              }}
            />
            <label htmlFor={el}>{el}</label>
          </li>
        ))}
      </ul>
      {coinsData
        ?.slice(0, rangeNumber)
        // eslint-disable-next-line array-callback-return
        .filter((coin) => {
          if (input.length !== 0) {
            let formatedInput = input.toLowerCase();
            if (
              coin.name.toLowerCase().includes(formatedInput) ||
              coin.symbol.toLowerCase().includes(formatedInput)
            ) {
              return coin;
            }
          } else {
            return coin;
          }
        })
        // eslint-disable-next-line array-callback-return
        .filter((coin) => {
          if (showFavList) {
            let list = window.localStorage.coinList.split(",");
            if (list.includes(coin.id)) {
              return coin;
            }
          } else {
            return coin;
          }
        })
        // eslint-disable-next-line array-callback-return
        .filter((coin) => {
          if (showStableCoins) {
            return coin;
          } else {
            if (excludeCoin(coin.symbol)) {
              return coin;
            }
          }
        })
        .sort((a, b) => {
          switch (orderBy) {
            case "Prix":
              return b.current_price - a.current_price;
            case "Prixreverse":
              return a.current_price - b.current_price;
            case "Market Cap":
              return b.market_cap - a.market_cap;
            case "Market Capreverse":
              return a.market_cap - b.market_cap;
            case "Volume":
              return b.total_volume - a.total_volume;
            case "Volumereverse":
              return a.total_volume - b.total_volume;
            case "1h":
              return (
                b.price_change_percentage_1h_in_currency -
                a.price_change_percentage_1h_in_currency
              );
            case "1hreverse":
              return (
                a.price_change_percentage_1h_in_currency -
                b.price_change_percentage_1h_in_currency
              );
            case "1j":
              return (
                b.price_change_percentage_24h_in_currency -
                a.price_change_percentage_24h_in_currency
              );
            case "1jreverse":
              return (
                a.price_change_percentage_24h_in_currency -
                b.price_change_percentage_24h_in_currency
              );
            case "1s":
              return (
                b.price_change_percentage_7d_in_currency -
                a.price_change_percentage_7d_in_currency
              );
            case "1sreverse":
              return (
                a.price_change_percentage_7d_in_currency -
                b.price_change_percentage_7d_in_currency
              );
            case "1m":
              return (
                b.price_change_percentage_30d_in_currency -
                a.price_change_percentage_30d_in_currency
              );
            case "1mreverse":
              return (
                a.price_change_percentage_30d_in_currency -
                b.price_change_percentage_30d_in_currency
              );
            case "6m":
              return (
                b.price_change_percentage_200d_in_currency -
                a.price_change_percentage_200d_in_currency
              );
            case "6mreverse":
              return (
                a.price_change_percentage_200d_in_currency -
                b.price_change_percentage_200d_in_currency
              );
            case "1a":
              return (
                b.price_change_percentage_1y_in_currency -
                a.price_change_percentage_1y_in_currency
              );
            case "1areverse":
              return (
                a.price_change_percentage_1y_in_currency -
                b.price_change_percentage_1y_in_currency
              );
            case "ATH":
              return b.ath_change_percentage - a.ath_change_percentage;
            case "ATHreverse":
              return a.ath_change_percentage - b.ath_change_percentage;

            default:
              break;
          }
        })
        .map((coin, index) => (
          <TableLine coin={coin} index={index} key={index} />
        ))}
    </div>
  );
};

export default Table;

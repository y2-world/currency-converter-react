import { useState } from "react";
import styles from "./CurrencyConverter.module.css";

const currencies = {
  // 通貨記号のマッピング
  USD: "$",
  EUR: "€",
  GBP: "£",
  AUD: "A$",
  CAD: "C$",
  KRW: "₩",
  CNY: "¥",
  JPY: "¥",
};

export default function CurrencyConverter() {
  return (
    <div>
      <h1 className={styles.title}>Currency Converter</h1>

      <div className={styles.mb4}>
        <select id="select" className={styles.select} defaultValue="">
          <option value="" disabled>
            Select currency
          </option>
          {Object.keys(currencies)
            .filter((cur) => cur !== "JPY")
            .map((cur) => (
              <option key={cur} value={cur}>
                {cur} ({currencies[cur as keyof typeof currencies]})
              </option>
          ))}
        </select>
      </div>
      <br></br>
      <div className={styles.mb4}>
        <input
          type="text"
          id="input"
          placeholder="Enter amount"
          className={styles.input}
        />
      </div>

      <div id="result" className={styles.result}>
      </div>
    </div>
  );
}
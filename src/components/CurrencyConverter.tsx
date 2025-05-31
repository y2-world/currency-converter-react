import { useEffect, useState } from "react";
import styles from "./CurrencyConverter.module.css";

const symbols: Record<string, string> = {
  // 通貨記号のマッピング
  // 通貨コードとその記号を定義
  USD: "$",
  EUR: "€",
  GBP: "£",
  AUD: "A$",
  CAD: "C$",
  KRW: "₩",
  CNY: "¥",
  JPY: "¥",
};

const currencies = Object.keys(symbols); // 通貨記号のキーを取得

export default function CurrencyConverter() {
  const [inputValue, setInputValue] = useState<string>(""); // 入力値の状態を管理
  const [selectedCurrency, setSelectedCurrency] = useState<string>(""); // 選択された通貨の状態を管理
  const [convertedValue, setConvertedValue] = useState<string>("￥0"); // 変換された値の状態を管理
  const [exchangeRate, setExchangeRate] = useState<string>(""); // 為替レートの状態を管理
  const [error, setError] = useState<string>(""); // エラーメッセージの状態を管理

  const symbol = symbols[selectedCurrency] || ""; // 選択された通貨の記号を取得

  const fetchRate = async (amount: number, from: string) => {
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=JPY` // 為替レートを取得するAPIエンドポイント
      );
      if (!res.ok) throw new Error("API fetch failed"); // レスポンスが正常でない場合はエラーをスロー
      const data = await res.json(); // レスポンスをJSON形式でパース
      return data.rates.JPY; // JPYへの為替レートを取得
    } catch (err) {
      console.error("為替取得エラー:", err); // エラーをコンソールに出力
      throw err; // エラーをスロー
    }
  };

  const convertCurrency = async () => {
    setError(""); // エラーメッセージをリセット
    const amount = parseFloat(inputValue); // 入力値を数値に変換

    if (isNaN(amount) || amount <= 0) {
      setConvertedValue("￥0"); // 入力値が無効な場合は初期値にリセット
      setExchangeRate(""); // 為替レートをリセット
      return; // 処理を終了
    }

    try {
      const rate = await fetchRate(1, selectedCurrency); // 為替レートを取得
      setExchangeRate(`1 ${selectedCurrency} = ${rate} JPY`); // 為替レートを設定

      const total = await fetchRate(amount, selectedCurrency);
      setConvertedValue(`¥${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
    } catch {
      if (!selectedCurrency) {
        setError("通貨を選択してください。"); // 通貨が選択されていない場合のエラー
      } else {
        setError("Fetching error"); // ローディング中のメッセージを表示
      }
    }
  };

  useEffect(() => {
    convertCurrency(); // コンポーネントがマウントされたときに通貨変換を実行
  }, [inputValue, selectedCurrency]); // inputValueまたはselectedCurrencyが変更されたときに再実行

  return (
    <div>
      <h1 className={styles.title}>Currency Converter</h1>

      <div className={styles.mb4}>
      <select
        id="select"
        className={styles.select}
        value={selectedCurrency}
        onChange={(e) => setSelectedCurrency(e.target.value)}
      >
        <option value="" disabled>
        Select currency
        </option>
        {currencies
        .filter((cur) => cur !== "JPY")
        .map((cur) => (
          <option key={cur} value={cur}>
          {cur} ({symbols[cur]})
          </option>
        ))}
      </select>
      </div>
      <br></br>
      <div className={styles.mb4}>
      <span className={styles.result}>
      {symbol}
      </span>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        id="input"
        placeholder="Enter amount"
        className={styles.input}
      />
      </div>
      {!error && (
      <div id="result" className={styles.result}>
        <p>{convertedValue}</p>
      </div>
      )}
      {error && <p className={styles.error}>{error}</p>}
      {!error && exchangeRate && <p>{exchangeRate}</p>}
    </div>
  );
}

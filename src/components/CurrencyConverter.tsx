import { useState } from 'react';

const currencies = ["USD", "EUR", "GBP", "AUD", "CAD", "KRW", "CNY", "JPY"];

export default function CurrencyConverter() {
  return (
    <div className="p-4 bg-blue-100 text-center rounded-lg">
      <h1 className="text-2xl font-bold text-blue-800">Currency Converter</h1>
      <input
        type="number"
        className="mt-4 border border-gray-400 p-2 rounded w-full"
        placeholder="Enter amount"
      />
    </div>
  );
}
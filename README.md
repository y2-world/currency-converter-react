# Currency Converter（React + TypeScript版）

JavaScriptとTypeScriptの学習の一環として、React + TypeScriptを使用し、**リアルタイムで為替換算ができる通貨コンバーターアプリ**を構築しました。選択した通貨で金額を入力すると、最新のレートに基づき日本円（JPY）に換算されます。

## デモ

GitHub Pagesでホストされたデモはこちら : [https://y2-world.github.io/currency-converter-react/](https://y2-world.github.io/currency-converter-react/)

## 使用API

為替レート取得には、**[Frankfurter API](https://www.frankfurter.app/)** を使用しています。APIキー不要で、シンプルなGETリクエストで最新のレートが取得可能です。

## 対応通貨

以下の7通貨を日本円に換算可能です：

- 🇺🇸 米ドル（USD）
- 🇪🇺 ユーロ（EUR）
- 🇬🇧 英ポンド（GBP）
- 🇦🇺 豪ドル（AUD）
- 🇨🇦 カナダドル（CAD）
- 🇰🇷 韓国ウォン（KRW）
- 🇨🇳 中国元（CNY）

## 使用技術

- React 18
- TypeScript
- Axios（API通信）
- CSS Modules（スタイリング）

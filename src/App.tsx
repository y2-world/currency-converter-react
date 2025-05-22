import CurrencyConverter from './components/CurrencyConverter';
import { useEffect } from "react";  

function App() {
  useEffect(() => {
    document.title = "Currency Converter";
  }, []);
  return (
    <div className="App">
      <CurrencyConverter />
    </div>
  );
}

export default App;

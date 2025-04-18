import { useState } from "react";
import { useCounter } from "./hooks/useCounter";
import { Button } from "./components/Button";
import { fetchApi } from "./services/api";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const { count, increment } = useCounter();
  const [apiCall, setApiCall] = useState<string | null>(null);

  // Example API call with error handling
  async function checkHealth() {
    setApiCall(null);
    try {
      await fetchApi("/health");
      setApiCall("API is healthy!");
    } catch (err) {
      setApiCall("Could not reach backend API.");
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button onClick={increment}>count is {count}</Button>
        <Button onClick={checkHealth}>Check API Health</Button>
        {apiCall && <div>{apiCall}</div>}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

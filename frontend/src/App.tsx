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
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-2 sm:p-4">
      <div className="w-full max-w-2xl flex flex-col items-center">
        <header className="w-full flex flex-col items-center gap-4 mb-8 px-2 sm:px-4">
          <div className="flex gap-4 sm:gap-6 items-center flex-wrap justify-center">
            <a
              href="https://vite.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={viteLogo}
                className="h-10 w-10 sm:h-12 sm:w-12 drop-shadow-md hover:scale-110 transition-transform"
                alt="Vite logo"
              />
            </a>
            <span className="text-xl sm:text-2xl font-semibold text-gray-400">
              +
            </span>
            <a
              href="https://react.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={reactLogo}
                className="h-10 w-10 sm:h-12 sm:w-12 drop-shadow-md hover:scale-110 transition-transform"
                alt="React logo"
              />
            </a>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-blue-700 tracking-tight text-center">
            Vite + React
          </h1>
          <p className="text-gray-500 text-center max-w-xs sm:max-w-md text-base sm:text-lg">
            A modern starter powered by{" "}
            <span className="font-semibold text-blue-600">Vite</span> and{" "}
            <span className="font-semibold text-sky-600">React</span> with
            Tailwind CSS.
          </p>
        </header>
        <main className="w-full max-w-md bg-white shadow-xl rounded-2xl p-4 sm:p-8 flex flex-col items-center gap-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center">
            <Button onClick={increment}>count is {count}</Button>
            <Button onClick={checkHealth}>Check API Health</Button>
          </div>
          {apiCall && (
            <div className="text-green-600 font-medium text-center break-words">
              {apiCall}
            </div>
          )}
          <p className="text-gray-400 text-xs sm:text-sm text-center">
            Edit <code className="bg-gray-100 px-1 rounded">src/App.tsx</code>{" "}
            and save to test HMR
          </p>
        </main>
        <footer className="mt-8 sm:mt-10 text-gray-400 text-xs text-center px-2">
          Click on the Vite and React logos to learn more
        </footer>
      </div>
    </div>
  );
}

export default App;

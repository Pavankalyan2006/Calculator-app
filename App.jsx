import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (/^[0-9+\-*/.=()%]$/.test(event.key)) {
        setInput((prev) => prev + event.key);
      } else if (event.key === "Enter") {
        calculateResult();
      } else if (event.key === "Backspace") {
        handleBackspace();
      } else if (event.key.toLowerCase() === "c") {
        clearInput();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const clearInput = () => {
    setInput("");
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const calculateResult = () => {
    try {
      let expression = input.replace(/\÷/g, "/");
      const result = eval(expression).toString();
      setHistory((prevHistory) => [...prevHistory, `${input} = ${result}`]);
      setInput(result);
    } catch (error) {
      setInput("Error");
    }
  };

  return (
    <div className="flex justify-end items-center h-screen ">
      <motion.div
        className="w-80 p-6 bg-gray-900 text-white rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-4 text-right text-2xl bg-gray-800 p-4 rounded-lg">
          {input || "0"}
        </div>

        <div className="grid grid-cols-4 gap-2">
          {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"].map(
            (char) => (
              <motion.button
                key={char}
                onClick={() => (char === "=" ? calculateResult() : handleClick(char))}
                className="p-4 text-lg bg-gray-800 shadow-lg hover:bg-gray-700 transition transform hover:scale-105 rounded-lg"
                whileTap={{ scale: 0.9 }}
              >
                {char}
              </motion.button>
            )
          )}
          <motion.button
            onClick={handleBackspace}
            className="p-4 text-lg bg-yellow-500 text-white shadow-lg hover:bg-yellow-600 rounded-lg transition transform hover:scale-105"
          >
            ⌫
          </motion.button>
          <motion.button
            onClick={clearInput}
            className="p-4 text-lg bg-red-500 text-white shadow-lg hover:bg-red-600 rounded-lg transition transform hover:scale-105"
          >
            C
          </motion.button>
          <motion.button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="col-span-4 p-4 text-lg bg-blue-500 text-white shadow-lg hover:bg-blue-600 rounded-lg transition transform hover:scale-105"
          >
            {showAdvanced ? "Hide Advanced" : "Show Advanced"}
          </motion.button>
        </div>

        {showAdvanced && (
          <motion.div
            className="grid grid-cols-4 gap-2 mt-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {["sin(", "cos(", "tan(", "sqrt(", "pi", "exp(", "log(", "^"].map((func) => (
              <motion.button
                key={func}
                onClick={() => handleClick(func)}
                className="p-4 text-lg bg-gray-700 shadow-lg hover:bg-gray-600 rounded-lg transition transform hover:scale-105"
                whileTap={{ scale: 0.9 }}
              >
                {func}
              </motion.button>
            ))}
          </motion.div>
        )}

        <motion.div
          className="mt-4 w-full bg-gray-900 p-2 rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-white">History</h3>
          <ul className="text-sm text-gray-300">
            {history.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}

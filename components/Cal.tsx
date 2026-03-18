// app/components/Cal.tsx
"use client";

import { useState, useEffect, useCallback } from "react";

export default function Cal() {
  const [display, setDisplay] = useState("0");          // current operand (as string)
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);

  // Build the full expression to show in the display
  const getExpression = () => {
    if (storedValue === null) {
      return display;
    }
    const operatorSymbol = operator || "";
    if (waitingForOperand) {
      return `${storedValue} ${operatorSymbol} `;
    }
    return `${storedValue} ${operatorSymbol} ${display}`;
  };

  // Helper to check if display shows an error
  const isError = useCallback(() => display === "Error", [display]);

  // Reset calculator (clear all)
  const clearAll = () => {
    setDisplay("0");
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  // Handle digit input
  const inputDigit = useCallback(
    (digit: string) => {
      if (isError()) {
        setDisplay(digit);
        setWaitingForOperand(false);
      } else if (waitingForOperand) {
        setDisplay(digit);
        setWaitingForOperand(false);
      } else {
        setDisplay(display === "0" ? digit : display + digit);
      }
    },
    [display, waitingForOperand, isError]
  );

  // Handle decimal point
  const inputDecimal = useCallback(() => {
    if (isError()) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }, [display, waitingForOperand, isError]);

  // Toggle sign (±)
  const toggleSign = useCallback(() => {
    if (isError()) {
      clearAll();
      return;
    }
    const currentValue = parseFloat(display);
    const newValue = -currentValue;
    setDisplay(String(newValue));
    setWaitingForOperand(false);
  }, [display, isError]);

  // Unary operations: square, square root, reciprocal
  const performUnary = useCallback(
    (operation: "square" | "sqrt" | "reciprocal") => {
      if (isError()) {
        clearAll();
        return;
      }

      const currentValue = parseFloat(display);
      let result: number;

      switch (operation) {
        case "square":
          result = currentValue * currentValue;
          break;
        case "sqrt":
          if (currentValue < 0) {
            setDisplay("Error");
            setStoredValue(null);
            setOperator(null);
            setWaitingForOperand(true);
            return;
          }
          result = Math.sqrt(currentValue);
          break;
        case "reciprocal":
          if (currentValue === 0) {
            setDisplay("Error");
            setStoredValue(null);
            setOperator(null);
            setWaitingForOperand(true);
            return;
          }
          result = 1 / currentValue;
          break;
        default:
          return;
      }

      // Check for non-finite results (Infinity, NaN)
      if (!isFinite(result)) {
        setDisplay("Error");
        setStoredValue(null);
        setOperator(null);
        setWaitingForOperand(true);
        return;
      }

      setDisplay(String(result));
      setWaitingForOperand(false);
    },
    [display, isError]
  );

  // Binary operation calculation
  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return b !== 0 ? a / b : NaN;
      case "^":
        return Math.pow(a, b);
      default:
        return b;
    }
  };

  // Handle binary operators (+, -, *, /, ^)
  const performOperation = useCallback(
    (nextOperator: string) => {
      if (isError()) {
        clearAll();
        return;
      }

      const currentValue = parseFloat(display);

      if (storedValue === null) {
        setStoredValue(currentValue);
      } else if (operator) {
        const newValue = calculate(storedValue, currentValue, operator);
        if (!isFinite(newValue)) {
          setDisplay("Error");
          setStoredValue(null);
          setOperator(null);
          setWaitingForOperand(true);
          return;
        }
        setStoredValue(newValue);
        setDisplay(String(newValue));
      }

      setWaitingForOperand(true);
      setOperator(nextOperator);
    },
    [display, storedValue, operator, isError]
  );

  // Handle equals (=)
  const handleEquals = useCallback(() => {
    if (isError()) {
      clearAll();
      return;
    }

    if (storedValue !== null && operator) {
      const currentValue = parseFloat(display);
      const result = calculate(storedValue, currentValue, operator);
      if (!isFinite(result)) {
        setDisplay("Error");
        setStoredValue(null);
        setOperator(null);
        setWaitingForOperand(true);
        return;
      }
      setDisplay(String(result));
      setStoredValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  }, [storedValue, operator, display, isError]);

  // Keyboard support
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key;

      // Prevent default for calculator keys to avoid page actions
      if (
        /^[0-9.]$/.test(key) ||
        ["+", "-", "*", "/", "^", "Enter", "=", "Escape", "c", "C", "s", "S", "r", "R", "i", "I", "n", "N"].includes(key)
      ) {
        e.preventDefault();
      }

      // Digits
      if (/^[0-9]$/.test(key)) {
        inputDigit(key);
      }
      // Decimal
      else if (key === ".") {
        inputDecimal();
      }
      // Binary operators
      else if (key === "+" || key === "-" || key === "*" || key === "/") {
        performOperation(key);
      }
      // Power (^) – using regex for better matching (e.g., on international keyboards)
      else if (/^[\^]$/.test(key)) {
        performOperation("^");
      }
      // Equals
      else if (key === "Enter" || key === "=") {
        handleEquals();
      }
      // Clear
      else if (key === "Escape" || key === "c" || key === "C") {
        clearAll();
      }
      // Square (s)
      else if (key === "s" || key === "S") {
        performUnary("square");
      }
      // Square root (r)
      else if (key === "r" || key === "R") {
        performUnary("sqrt");
      }
      // Reciprocal (i)
      else if (key === "i" || key === "I") {
        performUnary("reciprocal");
      }
      // Toggle sign (n)
      else if (key === "n" || key === "N") {
        toggleSign();
      }
    },
    [inputDigit, inputDecimal, performOperation, handleEquals, performUnary, toggleSign]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="w-full">
      {/* Display area with horizontal scroll for long expressions */}
      <div className="bg-gray-100 p-2 rounded mb-2 text-right text-xl font-mono overflow-x-auto whitespace-nowrap">
        {getExpression()}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {/* First function row */}
        <button onClick={() => performUnary("square")} className="calc-btn bg-purple-200">
          x²
        </button>
        <button onClick={() => performUnary("sqrt")} className="calc-btn bg-purple-200">
          √
        </button>
        <button onClick={() => performOperation("^")} className="calc-btn bg-purple-200">
          x^y
        </button>
        <button onClick={() => performUnary("reciprocal")} className="calc-btn bg-purple-200">
          1/x
        </button>

        {/* Digit row 7 8 9 / */}
        <button onClick={() => inputDigit("7")} className="calc-btn">
          7
        </button>
        <button onClick={() => inputDigit("8")} className="calc-btn">
          8
        </button>
        <button onClick={() => inputDigit("9")} className="calc-btn">
          9
        </button>
        <button onClick={() => performOperation("/")} className="calc-btn bg-orange-200">
          /
        </button>

        {/* Digit row 4 5 6 * */}
        <button onClick={() => inputDigit("4")} className="calc-btn">
          4
        </button>
        <button onClick={() => inputDigit("5")} className="calc-btn">
          5
        </button>
        <button onClick={() => inputDigit("6")} className="calc-btn">
          6
        </button>
        <button onClick={() => performOperation("*")} className="calc-btn bg-orange-200">
          *
        </button>

        {/* Digit row 1 2 3 - */}
        <button onClick={() => inputDigit("1")} className="calc-btn">
          1
        </button>
        <button onClick={() => inputDigit("2")} className="calc-btn">
          2
        </button>
        <button onClick={() => inputDigit("3")} className="calc-btn">
          3
        </button>
        <button onClick={() => performOperation("-")} className="calc-btn bg-orange-200">
          -
        </button>

        {/* Digit row 0 . = + */}
        <button onClick={() => inputDigit("0")} className="calc-btn">
          0
        </button>
        <button onClick={inputDecimal} className="calc-btn">
          .
        </button>
        <button onClick={handleEquals} className="calc-btn bg-green-300">
          =
        </button>
        <button onClick={() => performOperation("+")} className="calc-btn bg-orange-200">
          +
        </button>

        {/* Bottom row: Clear (span 2) and ± (span 2) */}
        <button onClick={clearAll} className="col-span-2 calc-btn bg-red-200">
          C
        </button>
        <button onClick={toggleSign} className="col-span-2 calc-btn bg-blue-200">
          ±
        </button>
      </div>

      <style jsx>{`
        .calc-btn {
          @apply p-2 text-center rounded bg-gray-100 hover:bg-gray-200 transition font-medium;
        }
      `}</style>
    </div>
  );
}
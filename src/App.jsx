import { useState } from "react";

function App() {
  const [displayText, setDisplayText] = useState("0");
  // const [value, computeValue] = useState(0);
  let value = 0;

  const buttons = [
    { value: "÷", id: "divide", class: "operator" },
    { value: "7", id: "seven", class: "num" },
    { value: "8", id: "eight", class: "num" },
    { value: "9", id: "nine", class: "num" },
    { value: "×", id: "multiply", class: "operator" },
    { value: "4", id: "four", class: "num" },
    { value: "5", id: "five", class: "num" },
    { value: "6", id: "six", class: "num" },
    { value: "-", id: "subtract", class: "operator" },
    { value: "1", id: "one", class: "num" },
    { value: "2", id: "two", class: "num" },
    { value: "3", id: "three", class: "num" },
    { value: "+", id: "add", class: "operator" },
    { value: ".", id: "decimal", class: "num" },
    { value: "0", id: "zero", class: "num" },
  ];

  // const handleClick = (currentVal) => {
  //   // if (displayText.length === 1 && displayText === "0") {
  //   //   setDisplayText(currentVal);
  //   // } else {
  //   //   if (currentVal === ".") {
  //   //     // Check if the current term already includes a decimal
  //   //     const parts = displayText.split(/[\+\-\×÷]/); // Split on operators
  //   //     const currentNumber = parts[parts.length - 1];
  //   //     if (currentNumber.includes(".")) return; // Ignore if the current number already has a decimal
  //   //   }
  //   //   setDisplayText((prevVal) => (prevVal += currentVal));
  //   // }

  //   if (/[+\-×÷]/.test(currentVal)) {
  //     // Only allow "-" as the first operator if display is empty or "0"
  //     if (displayText === "" || displayText === "0") {
  //       if (currentVal === "-") {
  //         setDisplayText(currentVal);
  //       }
  //       return;
  //     }

  //     if (/[+\-×÷]$/.test(displayText)) {
  //       // Allow "-" after an operator, but replace consecutive operators otherwise
  //       if (currentVal === "-" && !displayText.endsWith("-")) {
  //         setDisplayText((prevVal) => prevVal + currentVal);
  //       } else {
  //         setDisplayText((prevVal) => prevVal.slice(0, -1) + currentVal);
  //       }
  //       return;
  //     }
  //   }

  //   // Handle decimal and other checks as before
  //   if (currentVal === ".") {
  //     const parts = displayText.split(/[\+\-\×÷]/);
  //     const currentNumber = parts[parts.length - 1];
  //     if (currentNumber.includes(".")) return;
  //   }

  //   // if (displayText.length === 1 && displayText === "0") {
  //   //   setDisplayText(currentVal);
  //   // } else {
  //   //   setDisplayText((prevVal) => prevVal + currentVal);
  //   // }

  //   if (displayText === "0") {
  //     if (currentVal === ".") {
  //       setDisplayText("0.");
  //     } else if (!/[+\-×÷]/.test(currentVal)) {
  //       setDisplayText(currentVal);
  //     } else {
  //       setDisplayText("0" + currentVal);
  //     }
  //   } else {
  //     setDisplayText((prevVal) => prevVal + currentVal);
  //   }
  // };
  const handleClick = (currentVal) => {
    // Handle operators
    if (/[+\-×÷]/.test(currentVal)) {
      // Only allow "-" as a negative sign if display is empty or "0"
      if (displayText === "" || displayText === "0") {
        if (currentVal === "-") {
          setDisplayText(currentVal);
        }
        return;
      }

      // Handle consecutive operators: replace multiple operators with the last one (keeping "-" if it's a sign)
      if (/[+\-×÷]$/.test(displayText)) {
        if (currentVal === "-") {
          setDisplayText((prevVal) => prevVal + currentVal); // Allow "-" to represent a negative number
        } else {
          // Remove all trailing operators and add only the last one
          setDisplayText(
            (prevVal) => prevVal.replace(/[+\-×÷]+$/, "") + currentVal
          );
        }
        return;
      }
    }

    // Handle decimal points
    if (currentVal === ".") {
      const parts = displayText.split(/[+\-×÷]/);
      const currentNumber = parts[parts.length - 1];
      if (currentNumber.includes(".")) return; // Prevent multiple decimals in the current number
    }

    // Handle initial zero
    if (displayText === "0") {
      // Replace "0" with the new number or "0." if the decimal is pressed
      setDisplayText(currentVal === "." ? "0." : currentVal);
    } else {
      setDisplayText((prevVal) => prevVal + currentVal);
    }
  };

  const compute = (eq) => {
    const cleanEq = eq.toString().replace(/÷/g, "/").replace(/×/g, "*");

    try {
      value = eval(cleanEq);
      setDisplayText(value);
    } catch (error) {
      setDisplayText("Error");
    }
  };

  const clearAll = () => {
    setDisplayText("");
    value = 0;
  };

  return (
    <>
      <div id="container">
        <div id="display-container">
          {/* <div id="display-history"></div> */}
          <div id="display">{displayText || "0"}</div>
        </div>
        <div id="buttons">
          <button id="clear" className="light-grey" onClick={(e) => clearAll()}>
            AC
          </button>
          {buttons.map((button) => (
            <button
              id={`${button.id}`}
              className={`${button.class}`}
              key={`${button.id}`}
              onClick={(e) => handleClick(button.value)}
            >
              {button.value}
            </button>
          ))}
          <button
            id="equals"
            className="operator"
            onClick={(e) => compute(displayText)}
          >
            =
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

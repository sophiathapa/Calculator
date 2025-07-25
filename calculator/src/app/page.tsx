"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const keys = [
  ["AC", "+/-", "%", "/"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["del", "0", ".", "="],
];

const operators = ["+", "-", "/", "*", "="];

const symbols = ["AC", "+/-", "%"];

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const onlyOperator = ["+", "-", "/", "*"];

const Calculator = () => {
  const [output, setOutput] = useState("");

  const handleCalculation = (val: string) => {
    const lastChar = output?.toString().slice(-1);
    const secondLastChar = output?.toString().slice(-2, -1);

    let foundOperator = false;
    for (const op of onlyOperator) {
      if (output.includes(op)) {
        foundOperator = true;
        break;
      }
    }

    switch (val) {
      case "=":
        if (output.includes("%")) {
          let expression = output.replace(/(\d*\.?\d*)%/g, "($1/100)");
          const result = eval(expression);
          setOutput(String(result));
        } else {
          const result = eval(output);
          setOutput(String(result));
        }
        break;

      case "AC":
        setOutput("");
        break;

      case "*":
        if (lastChar === "/") setOutput(output.slice(0, -1) + val);
        else if (lastChar === "+") setOutput(output.slice(0, -1) + val);
        else if (lastChar === "-") setOutput(output.slice(0, -1) + val);
        else if (lastChar === "*") setOutput(output);
        else setOutput(output + val);
        break;

      case "/":
        if (lastChar === "*") setOutput(output.slice(0, -1) + val);
        else if (lastChar === "+") setOutput(output.slice(0, -1) + val);
        else if (lastChar === "-") setOutput(output.slice(0, -1) + val);
        else if (lastChar === "/") setOutput(output);
        else setOutput(output + val);
        break;

      case "+":
        if (lastChar === "-") setOutput(output.slice(0, -1) + val);
        else if (lastChar === "+") setOutput(output);
        else setOutput(output + val);
        break;

      case "-":
        if (lastChar === "+") setOutput(output.slice(0, -1) + val);
        else if (lastChar === "-") setOutput(output);
        else setOutput(output + val);
        break;

      case "del":
        setOutput(output.slice(0, -1));
        break;

      case "0":
        output;
        if (output === "0") {
          setOutput(output);
        } else if (onlyOperator.includes(secondLastChar) && lastChar === "0") {
          setOutput(output);
        } else setOutput(output + val);
        break;

      case ".":
        if (output === "") {
          setOutput("0.");
        } else if (lastChar === ".") {
          setOutput(output);
        } else {
          const segments = output.split(/[\+\-\*\/]/);
          const currentSegment = segments[segments.length - 1];

          if (currentSegment.includes(".")) {
            setOutput(output);
          } else setOutput(output + val);
        }

        break;

      case "%":
        setOutput(output + val);
        break;

      case "+/-":
        if (numbers.includes(lastChar)) {
          const search = output.match(/([+\-*/])(\d*\.?\d*)$/);
          if (search) {
            const totalLastTerm = search[0];
            const length = totalLastTerm.length;
            const digit = search[2];
            const index = -length;
            if (search[1] === "-") {
              const result1 = output.slice(0, index);
              const result = output.slice(0, index) + "+" + digit;
              setOutput(result);
            } else if (search[1] === "+") {
              const result = output.slice(0, index) + "-" + digit;
              setOutput(result);
            } else if (
              totalLastTerm.includes("*") ||
              totalLastTerm.includes("/")
            ) {
              if (
                totalLastTerm.includes("*-") ||
                totalLastTerm.includes("/-")
              ) {
                const index2 = -search[2].length;
                const result = output.slice(0, index2) + digit.slice(1);
                setOutput(result);
              } else {
                const result = output.slice(0, index + 1) + "-" + digit;
                setOutput(result);
              }
            }
          }
        } else {
          setOutput(output);
        }
        break;

      default:
        if (/^[1-9]$/.test(val)) {
          if (output === "0") setOutput(val);
          else if (lastChar === "0" && onlyOperator.includes(secondLastChar)) {
            setOutput(output.slice(0, -1) + val);
          } else setOutput(output + val);
        } else setOutput(output + val);

        break;
    }
  };

  return (
    <div className="m-30 ml-90 bg-black w-70 h-100">
      <div className=" mr-5 pt-13 h-20 text-right text-2xl text-white">
        {output}
      </div>
      {keys.map((item, index) => {
        return (
          <div
            className="flex justify-center w-70 h-15 text-white gap-3 p-5"
            key={index}
          >
            {item.map((val, id) => {
              return (
                <Button
                  onClick={() => {
                    handleCalculation(val);
                  }}
                  className={`${
                    operators.includes(val)
                      ? "bg-orange-400"
                      : symbols.includes(val)
                      ? "bg-gray-400"
                      : "bg-gray-500"
                  } rounded-full p-5 `}
                  key={id}
                >
                  {val}
                </Button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Calculator;

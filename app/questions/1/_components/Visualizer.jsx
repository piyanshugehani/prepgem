"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import React from "react";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

const CodeEditor = ({ code, setCode }) => {
  return (
    <CodeMirror
      value={code}
      height="300px"
      width="100%"
      theme={vscodeDark}
      extensions={[javascript()]}
      onChange={(value) => setCode(value)}
      className="rounded-lg overflow-hidden"
      style={{
        caretShape: 'block',
        caretColor: '#fff'
      }}
      basicSetup={{
        lineNumbers: true,
        foldGutter: false,
        dropCursor: false,
        allowMultipleSelections: false,
        indentOnInput: true
      }}
    />
  );
};

const ComplexityAnalysis = () => {
  return (
    <div className="bg-black p-4 rounded-lg text-white">
      <h4 className="text-purple-400 font-semibold mb-2">Time Complexity Analysis</h4>
      <ul className="space-y-2">
        <li>Best Case: O(n) - When array is already sorted</li>
        <li>Average Case: O(n²)</li>
        <li>Worst Case: O(n²) - When array is reverse sorted</li>
        <li>Space Complexity: O(1)</li>
      </ul>
    </div>
  );
};

const SortingVisualizer = () => {
  const initialArray = [4, 3, 6, 1, 8, 2];
  const [array, setArray] = useState([...initialArray]);
  const [activeBars, setActiveBars] = useState([]);
  const [status, setStatus] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [showVisualization, setShowVisualization] = useState(false);
  const [userCode, setUserCode] = useState("");
  const [solutionCode] = useState(`function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}`);

  const animateSorting = () => {
    const animations = [];
    const arrayCopy = [...array];
  
    for (let i = 0; i < arrayCopy.length; i++) {
      for (let j = 0; j < arrayCopy.length - i - 1; j++) {
        animations.push({
          compare: [j, j + 1],
          swap: arrayCopy[j] > arrayCopy[j + 1] ? [j, j + 1] : null,
        });
  
        if (arrayCopy[j] > arrayCopy[j + 1]) {
          const temp = arrayCopy[j];
          arrayCopy[j] = arrayCopy[j + 1];
          arrayCopy[j + 1] = temp;
        }
      }
    }
  
    animations.forEach(({ compare, swap }, idx) => {
      setTimeout(() => {
        setActiveBars(compare);
        setStatus(`Comparing arr[${compare[0]}] and arr[${compare[1]}]`);
  
        gsap.to(`#bar-${compare[0]}`, { y: -20, duration: 0.3, yoyo: true, repeat: 1 });
        gsap.to(`#bar-${compare[1]}`, { y: -20, duration: 0.3, yoyo: true, repeat: 1 });
  
        if (swap) {
          const [i, j] = swap;
  
          setTimeout(() => {
            setStatus(`Swapping arr[${i}] and arr[${j}]`);
            gsap.to(`#bar-${i}`, { x: 50, duration: 0.5 });
            gsap.to(`#bar-${j}`, { x: -50, duration: 0.5, onComplete: () => {
              setArray(prevArray => {
                const newArray = [...prevArray];
                const temp = newArray[i];
                newArray[i] = newArray[j];
                newArray[j] = temp;
                return newArray;
              });
  
              gsap.to(`#bar-${i}`, { x: 0, duration: 0 });
              gsap.to(`#bar-${j}`, { x: 0, duration: 0 });
            }});
          }, 500);
        }
      }, idx * 1000);
    });
  
    setTimeout(() => {
      setStatus("Sorting Complete!");
      setActiveBars([])
      ;
    }, animations.length * 1000);
  };

  return (
    <div className="space-y-8 text-left bg-black p-6 rounded-xl w-full max-w-5xl">
      <div className="space-y-4 w-full">
        <h3 className="text-xl font-semibold text-purple-400">Code Editor</h3>
        <CodeEditor code={userCode} setCode={setUserCode} />
        {!showSolution && (
          <div className="text-left">
            <button
              onClick={() => setShowSolution(true)}
              className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-purple-700"
            >
              Show Solution
            </button>
          </div>
        )}
        {showSolution && (
          <div className="space-y-4 w-full">
            <h4 className="text-lg font-semibold text-purple-400 text-left">Solution:</h4>
            <CodeEditor code={solutionCode} setCode={() => {}} />
            <ComplexityAnalysis />
            {!showVisualization && (
              <div className="text-left">
                <button
                  onClick={() => setShowVisualization(true)}
                  className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-purple-700"
                >
                  Show Visualization
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {showVisualization && (
        <div className="space-y-4 w-full justify-center">
          <h3 className="text-xl font-semibold text-purple-400 text-left">Visualization</h3>
          <div className="flex justify-center items-end h-[350px] w-full relative bg-gray-900 opacity-90 p-4 rounded-lg overflow-x-auto">
            <div className="flex items-end gap-2 md:gap-4">
              {array.map((value, idx) => (
                <motion.div
                  key={idx}
                  id={`bar-${idx}`}
                  className={`w-8 md:w-12 flex flex-col items-center ${
                    activeBars.includes(idx) ? "bg-yellow-500" : "bg-gradient-to-r from-purple-600 to-indigo-600"
                  }`}
                  style={{ height: `${value * 30}px` }}
                >
                  <span className="text-xs md:text-sm text-white mb-1">{value}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <p className="text-base md:text-lg font-semibold text-purple-300 text-left">{status}</p>
          <div className="text-left">
            <button
              onClick={animateSorting}
              className="w-full md:w-auto bg-gradient-to-br from-purple-500 to-indigo-600 text-white px-4 md:px-6 py-2 rounded-lg shadow hover:bg-purple-700"
            >
              Run Visualization
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Visualizer = () => {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div className="p-10 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold text-left text-purple-400">Practice Problem Solving</h1>
      <div className="mt-8 space-y-6">
        <motion.div
          className="bg-gray-900 p-6 rounded-lg shadow-lg border border-purple-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-purple-400">Question 1: Bubble Sort</h2>
          <p className="text-gray-300">
            Implement the Bubble Sort algorithm to sort the array: <b>[4, 3, 6, 1, 8, 2]</b>.
          </p>
        </motion.div>

        <div className="flex justify-start">
          {!showEditor ? (
            <button
              onClick={() => setShowEditor(true)}
              className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-purple-700"
            >
              Start Coding
            </button>
          ) : (
            <SortingVisualizer />
          )}
        </div>
      </div>
    </div>
  );
};

export default Visualizer;

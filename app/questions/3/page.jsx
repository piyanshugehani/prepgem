"use client"
import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Link from 'next/link';
import Header from '@/app/dashboard/_components/Header';

export default function BigOComplexityCalculator() {
  // State for the calculator
  const [algorithmType, setAlgorithmType] = useState('');
  const [inputSize, setInputSize] = useState(10);
  const [customFunction, setCustomFunction] = useState('');
  const [complexityResult, setComplexityResult] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [activeTab, setActiveTab] = useState('calculator');
  
  // Set of predefined algorithms with their time and space complexities
  const algorithms = {
    quickSort: { time: 'O(n log n)', space: 'O(log n)', name: 'Quick Sort' },
    mergeSort: { time: 'O(n log n)', space: 'O(n)', name: 'Merge Sort' },
    bubbleSort: { time: 'O(n²)', space: 'O(1)', name: 'Bubble Sort' },
    binarySearch: { time: 'O(log n)', space: 'O(1)', name: 'Binary Search' },
    breadthFirstSearch: { time: 'O(V + E)', space: 'O(V)', name: 'Breadth-First Search' },
    depthFirstSearch: { time: 'O(V + E)', space: 'O(V)', name: 'Depth-First Search' },
    dijkstra: { time: 'O(V² + E)', space: 'O(V)', name: 'Dijkstra\'s Algorithm' },
  };
  
  // Reference for animation
  const calculatorRef = useRef(null);
  
  // Generate chart data based on input size
  useEffect(() => {
    generateChartData();
  }, [inputSize, algorithmType]);
  
  // Animation on mount
  useEffect(() => {
    if (calculatorRef.current) {
      const calculator = calculatorRef.current;
      calculator.style.opacity = 0;
      calculator.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        calculator.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        calculator.style.opacity = 1;
        calculator.style.transform = 'translateY(0)';
      }, 100);
    }
  }, []);

  // Calculate complexity based on algorithm or custom function
  const calculateComplexity = () => {
    if (algorithmType) {
      setComplexityResult(algorithms[algorithmType]);
    } else if (customFunction) {
      try {
        // This is a simplified analyzer that looks for keywords
        let timeComplexity = 'O(n)'; // Default
        let spaceComplexity = 'O(1)'; // Default
        
        // Very basic analysis - in a real app this would be much more sophisticated
        if (customFunction.includes('for') && customFunction.includes('for')) {
          if (customFunction.includes('for') && customFunction.match(/for/g).length >= 2) {
            timeComplexity = 'O(n²)';
          }
        } else if (customFunction.includes('while') && customFunction.includes('=')) {
          timeComplexity = 'O(n)';
        } else if (customFunction.includes('/= 2') || customFunction.includes('/ 2')) {
          timeComplexity = 'O(log n)';
        }
        
        if (customFunction.includes('new Array') || customFunction.includes('[]')) {
          spaceComplexity = 'O(n)';
        }
        
        setComplexityResult({
          time: timeComplexity,
          space: spaceComplexity,
          name: 'Custom Algorithm'
        });
      } catch (error) {
        setComplexityResult({
          time: 'Error analyzing',
          space: 'Error analyzing',
          name: 'Error'
        });
      }
    }
  };
  
  // Generate data for complexity comparison chart
  const generateChartData = () => {
    const data = [];
    const maxSize = inputSize || 100;
    
    for (let i = 1; i <= 10; i++) {
      const n = Math.floor((maxSize / 10) * i);
      const entry = { n };
      
      // Constant: O(1)
      entry.constant = 1;
      
      // Logarithmic: O(log n)
      entry.logarithmic = Math.log2(n) || 0.1;
      
      // Linear: O(n)
      entry.linear = n;
      
      // Log-linear: O(n log n)
      entry.logLinear = n * Math.log2(n) || 0.1;
      
      // Quadratic: O(n²)
      entry.quadratic = Math.min(n * n, 10000); // Cap at 10000 for visualization
      
      // Exponential: O(2^n)
      entry.exponential = Math.min(Math.pow(2, n), 10000); // Cap at 10000 for visualization
      
      data.push(entry);
    }
    
    setChartData(data);
  };
  
  // Get the color for a specific complexity
  const getComplexityColor = (complexity) => {
    const colors = {
      'O(1)': '#9333EA', // Purple
      'O(log n)': '#7C3AED', // Darker Purple
      'O(n)': '#6D28D9', // Even Darker Purple
      'O(n log n)': '#5B21B6', // Deep Purple
      'O(n²)': '#4C1D95', // Darkest Purple
      'O(2^n)': '#2E1065', // Very Dark Purple
    };
    
    return colors[complexity] || '#94A3B8'; // Default gray
  };
  
  // Map mathematical complexity to user-friendly text
  const complexityExplanations = {
    'O(1)': 'Constant Time - The algorithm takes the same amount of time regardless of input size.',
    'O(log n)': 'Logarithmic Time - The algorithm\'s time increases logarithmically as input size grows.',
    'O(n)': 'Linear Time - The algorithm\'s time increases linearly with input size.',
    'O(n log n)': 'Log-Linear Time - Common in efficient sorting algorithms like merge sort and quick sort.',
    'O(n²)': 'Quadratic Time - The algorithm\'s time increases with the square of the input size.',
    'O(2^n)': 'Exponential Time - The algorithm\'s time doubles with each additional input element.',
  };
  
  // Render example code for selected algorithm
  const renderExampleCode = () => {
    const codeExamples = {
      quickSort: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[0];
  const left = [];
  const right = [];
  
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }
  
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
      mergeSort: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) result.push(left.shift());
    else result.push(right.shift());
  }
  return [...result, ...left, ...right];
}`,
      bubbleSort: `function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
      binarySearch: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  
  return -1;
}`,
      breadthFirstSearch: `function bfs(graph, start) {
  const queue = [start];
  const visited = new Set([start]);
  
  while (queue.length > 0) {
    const vertex = queue.shift();
    console.log(vertex);
    
    for (const neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}`,
      depthFirstSearch: `function dfs(graph, start, visited = new Set()) {
  visited.add(start);
  console.log(start);
  
  for (const neighbor of graph[start]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  }
}`,
      dijkstra: `function dijkstra(graph, start) {
  const distances = {};
  const visited = new Set();
  
  // Initialize distances
  for (const vertex in graph) {
    distances[vertex] = Infinity;
  }
  distances[start] = 0;
  
  while (visited.size < Object.keys(graph).length) {
    // Find vertex with minimum distance
    let minVertex = null;
    let minDistance = Infinity;
    
    for (const vertex in distances) {
      if (!visited.has(vertex) && distances[vertex] < minDistance) {
        minVertex = vertex;
        minDistance = distances[vertex];
      }
    }
    
    if (minVertex === null) break;
    visited.add(minVertex);
    
    // Update distances to neighbors
    for (const neighbor in graph[minVertex]) {
      const distance = graph[minVertex][neighbor];
      const totalDistance = minDistance + distance;
      
      if (totalDistance < distances[neighbor]) {
        distances[neighbor] = totalDistance;
      }
    }
  }
  
  return distances;
}`,
    };
    
    return codeExamples[algorithmType] || customFunction || '// Select an algorithm or enter custom code';
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Header/>
     
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-200">Big-O Complexity Calculator</h1>
          <p className="mt-4 text-lg text-purple-300 max-w-3xl mx-auto">
            Analyze and visualize algorithm time and space complexity to understand performance implications as data size grows.
          </p>
        </div>

        <div ref={calculatorRef} className="bg-gradient-to-br from-gray-950 to-black rounded-xl shadow-2xl p-6 md:p-8 border border-gray-800">
          <div className="flex border-b border-gray-700 mb-6">
            <button 
              onClick={() => setActiveTab('calculator')}
              className={`px-4 py-2 font-medium text-sm ${activeTab === 'calculator' ? 'border-b-2 border-gray-400 text-purple-400' : 'text-purple-300 hover:text-purple-200'}`}
            >
              Calculator
            </button>
            <button 
              onClick={() => setActiveTab('visualizer')}
              className={`px-4 py-2 font-medium text-sm ${activeTab === 'visualizer' ? 'border-b-2 border-gray-400 text-purple-400' : 'text-purple-300 hover:text-purple-200'}`}
            >
              Complexity Visualizer
            </button>
          </div>

          {activeTab === 'calculator' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-purple-200">Algorithm Analysis</h2>
                
                <div className="mb-4">
                  <label className="block text-purple-200 text-sm font-medium mb-2">
                    Select Algorithm Type
                  </label>
                  <select 
                    className="w-full px-3 py-2 bg-gray-950 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-purple-200"
                    value={algorithmType}
                    onChange={(e) => {
                      setAlgorithmType(e.target.value);
                      setCustomFunction('');
                    }}
                  >
                    <option value="">-- Select Algorithm --</option>
                    {Object.keys(algorithms).map(algo => (
                      <option key={algo} value={algo}>{algorithms[algo].name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-purple-200 text-sm font-medium mb-2">
                    Or Enter Custom Code
                  </label>
                  <textarea 
                    className="w-full px-3 py-2 bg-gray-950 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 font-mono text-sm text-purple-200"
                    rows={10}
                    placeholder="// Enter your algorithm code here..."
                    value={customFunction}
                    onChange={(e) => {
                      setCustomFunction(e.target.value);
                      setAlgorithmType('');
                    }}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-purple-200 text-sm font-medium mb-2">
                    Input Size (n)
                  </label>
                  <input 
                    type="number"
                    className="w-full px-3 py-2 bg-gray-950 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-purple-200"
                    value={inputSize}
                    onChange={(e) => setInputSize(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                </div>
                
                <button 
                  className="w-full bg-gradient-to-r from-gray-600 to-gray-800 text-white py-2 px-4 rounded-md hover:from-gray-700 hover:to-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-lg"
                  onClick={calculateComplexity}
                >
                  Calculate Complexity
                </button>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4 text-purple-200">Analysis Results</h2>
                
                {complexityResult ? (
                  <div className="bg-gray-950/50 rounded-lg p-6 border border-gray-800">
                    <h3 className="text-lg font-medium mb-2 text-purple-200">{complexityResult.name}</h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-900/50 rounded-lg p-4 shadow-sm border border-gray-700">
                        <div className="text-sm text-purple-300 mb-1">Time Complexity</div>
                        <div className="text-xl font-semibold text-purple-200">
                          {complexityResult.time}
                        </div>
                      </div>
                      
                      <div className="bg-gray-900/50 rounded-lg p-4 shadow-sm border border-gray-700">
                        <div className="text-sm text-purple-300 mb-1">Space Complexity</div>
                        <div className="text-xl font-semibold text-purple-200">
                          {complexityResult.space}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-md font-medium mb-2 text-purple-200">Explanation</h4>
                      <p className="text-purple-300 text-sm">
                        {complexityExplanations[complexityResult.time] || 
                         `This algorithm has a ${complexityResult.time} time complexity, which means its performance scales accordingly with input size.`}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-md font-medium mb-2 text-purple-200">Performance at n = {inputSize}</h4>
                      <div className="overflow-hidden bg-gray-900/30 h-4 rounded-full">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-gray-500 to-gray-700"
                          style={{
                            width: complexityResult.time === 'O(1)' ? '5%' :
                                  complexityResult.time === 'O(log n)' ? '10%' :
                                  complexityResult.time === 'O(n)' ? '25%' :
                                  complexityResult.time === 'O(n log n)' ? '50%' :
                                  complexityResult.time === 'O(n²)' ? '75%' : '95%'
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-purple-400 mt-1">
                        <span>Efficient</span>
                        <span>Inefficient</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-950/50 rounded-lg p-6 flex flex-col items-center justify-center h-[90%] border border-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <p className="text-purple-300 text-center">
                      Select an algorithm or enter custom code to analyze its time and space complexity.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'visualizer' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-purple-200">Algorithm Visualization</h2>
              
              {algorithmType || customFunction ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-3 text-purple-200">Code Implementation</h3>
                    <div className="bg-gray-950/50 text-purple-200 rounded-lg p-4 overflow-auto max-h-96 border border-gray-800">
                      <pre className="font-mono text-sm">
                        <code>{renderExampleCode()}</code>
                      </pre>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3 text-purple-200">Performance Analysis</h3>
                    
                    {complexityResult && (
                      <div className="bg-gray-950/50 rounded-lg p-4 mb-4 border border-gray-800">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <span className="text-sm text-purple-300">Time Complexity</span>
                            <div className="text-xl font-semibold text-purple-200">
                              {complexityResult.time}
                            </div>
                          </div>
                          <div>
                            <span className="text-sm text-purple-300">Space Complexity</span>
                            <div className="text-xl font-semibold text-purple-200">
                              {complexityResult.space}
                            </div>
                          </div>
                        </div>
                        
                        <table className="w-full text-sm text-purple-200">
                          <thead>
                            <tr className="border-b border-gray-700">
                              <th className="py-2 text-left">Input Size (n)</th>
                              <th className="py-2 text-right">Operations</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[10, 100, 1000, 10000, 100000].map(size => (
                              <tr key={size} className="border-b border-gray-700">
                                <td className="py-2">{size.toLocaleString()}</td>
                                <td className="py-2 text-right">
                                  {complexityResult.time === 'O(1)' ? '1' : 
                                   complexityResult.time === 'O(log n)' ? Math.ceil(Math.log2(size)).toLocaleString() :
                                   complexityResult.time === 'O(n)' ? size.toLocaleString() :
                                   complexityResult.time === 'O(n log n)' ? Math.ceil(size * Math.log2(size)).toLocaleString() :
                                   complexityResult.time === 'O(n²)' ? (size * size).toLocaleString() :
                                   complexityResult.time === 'O(2^n)' ? (size <= 20 ? Math.pow(2, size).toLocaleString() : '≈ Infinity') :
                                   'Varies'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    
                    <div className="bg-gray-950/50 rounded-lg p-4 border border-gray-800">
                      <h4 className="text-md font-medium mb-2 text-purple-200">Time Complexity Growth</h4>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="n" stroke="#D1D5DB" />
                            <YAxis stroke="#D1D5DB" />
                            <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151' }} />
                            <Legend />
                            {complexityResult && complexityResult.time === 'O(1)' && (
                              <Line type="monotone" dataKey="constant" name="O(1)" stroke="#4B5563" strokeWidth={2} dot={false} />
                            )}
                            {complexityResult && complexityResult.time === 'O(log n)' && (
                              <Line type="monotone" dataKey="logarithmic" name="O(log n)" stroke="#6B7280" strokeWidth={2} dot={false} />
                            )}
                            {complexityResult && complexityResult.time === 'O(n)' && (
                              <Line type="monotone" dataKey="linear" name="O(n)" stroke="#9CA3AF" strokeWidth={2} dot={false} />
                            )}
                            {complexityResult && complexityResult.time === 'O(n log n)' && (
                              <Line type="monotone" dataKey="logLinear" name="O(n log n)" stroke="#D1D5DB" strokeWidth={2} dot={false} />
                            )}
                            {complexityResult && complexityResult.time === 'O(n²)' && (
                              <Line type="monotone" dataKey="quadratic" name="O(n²)" stroke="#E5E7EB" strokeWidth={2} dot={false} />
                            )}
                            {complexityResult && complexityResult.time === 'O(2^n)' && (
                              <Line type="monotone" dataKey="exponential" name="O(2^n)" stroke="#F3F4F6" strokeWidth={2} dot={false} />
                            )}
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-950/50 rounded-lg p-8 text-center border border-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <p className="text-purple-300 mb-4">
                    No algorithm selected. Please go to the Calculator tab first to select or enter an algorithm.
                  </p>
                  <button 
                    className="bg-gradient-to-r from-gray-600 to-gray-800 text-white py-2 px-4 rounded-md hover:from-gray-700 hover:to-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-lg"
                    onClick={() => setActiveTab('calculator')}
                  >
                    Go to Calculator
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

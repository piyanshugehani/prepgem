"use client"
import Header from "@/app/dashboard/_components/Header";
import React, { useState, useRef, useEffect } from "react";


let v1 = null,
  v2 = null;
let adj = [];
const delay = 500;
const color1 = "rgb(0, 204, 0)";

const Canvas = () => {
  const [points, setPoints] = useState([]);
  const [edges, setEdges] = useState([]);
  const [src, setSrc] = useState(0);
  const svgRef = useRef(null);

  const reset = () => {
    points.forEach((_, i) => {
      const point = document.getElementById(`point${i}`);
      if (point && (point.style.fill === "blue" || point.style.fill === color1)) {
        point.style.fill = "#000";
      }
    });
    edges.forEach((_, i) => {
      const edge = document.getElementById(`edge${i}`);
      if (edge && edge.style.stroke === "blue") {
        edge.style.stroke = "red";
      }
    });
  };

  const clearCanvas = () => {
    setPoints([]);
    setEdges([]);
    setSrc(0);
    v1 = null;
    v2 = null;
    adj = [];
  };

  const getMousePosition = (event) => {
    reset();
    const x = event.clientX - svgRef.current.getBoundingClientRect().left;
    const y = event.clientY - svgRef.current.getBoundingClientRect().top;

    for (let i = 0; i < points.length; i++) {
      const { x: x1, y: y1 } = points[i];
      const dist = (x - x1) ** 2 + (y - y1) ** 2;
      if (dist <= 900) {
        return;
      }
    }

    setPoints((prevPoints) => {
      adj.push([]);
      return [...prevPoints, { x, y }];
    });
  };

  const drawLine = (e, idx) => {
    reset();
    const u = document.getElementById(`point${idx}`);
    u.style.fill = "red";

    if (v1 === null) {
      v1 = idx;
    } else {
      v2 = idx;
      const point1 = document.getElementById(`point${v1}`);
      const point2 = document.getElementById(`point${v2}`);
      if (point1) point1.style.fill = "#000";
      if (point2) point2.style.fill = "#000";

      for (const edge of edges) {
        if (
          (edge.u === v1 && edge.v === v2) ||
          (edge.u === v2 && edge.v === v1)
        ) {
          v1 = null;
          v2 = null;
          return;
        }
      }
      if (v1 === v2) {
        v1 = null;
        v2 = null;
        return;
      }

      setEdges((prevEdges) => {
        if (!adj[v1]) adj[v1] = [];
        if (!adj[v2]) adj[v2] = [];
        
        adj[v1].push({ vertex: v2, edgeNo: prevEdges.length });
        adj[v2].push({ vertex: v1, edgeNo: prevEdges.length });
      
        console.log("Updated adj:", adj); // Keep track of the adjacency list
      
        // Return updated edges array with the new edge added
        return [...prevEdges, { u: v1, v: v2 }];
      });
      
    
    }
  };

  const bfs = (s) => {
    if (s >= points.length) return;

    reset();

    const vis = Array(points.length).fill(false);
    const queue = [s];
    const animations = [];
    vis[s] = true;

    while (queue.length > 0) {
      const x = queue.shift();
      animations.push({ x, y: -1, color: color1 });

      adj[x].forEach(({ vertex, edgeNo }) => {
        if (!vis[vertex]) {
          vis[vertex] = true;
          queue.push(vertex);
          animations.push({ x: edgeNo, y: -1, color: "edge" });
          animations.push({ x: edgeNo, y: -1, color: "shrinkEdge" });
          animations.push({ x: vertex, y: -1, color: "blue" });
        }
      });
    }

    animations.forEach((anim, i) => {
      setTimeout(() => {
        if (anim.color === "edge") {
          const edge = document.getElementById(`edge${anim.x}`);
          if (edge) {
            edge.style.stroke = "blue";
            edge.style.strokeWidth = "5";
          }
        } else if (anim.color === "shrinkEdge") {
          const edge = document.getElementById(`edge${anim.x}`);
          if (edge) {
            edge.style.strokeWidth = "2";
          }
        } else {
          const point = document.getElementById(`point${anim.x}`);
          if (point) {
            point.style.fill = anim.color;
          }
        }
      }, i * delay);
    });
  };

  const dfs = (s) => {
    if (s >= points.length) return;

    reset();

    const vis = Array(points.length).fill(false);
    const animations = [];
    const dfsUtil = (v) => {
      animations.push({ x: v, y: -1, color: color1 });
      vis[v] = true;

      adj[v].forEach(({ vertex, edgeNo }) => {
        if (!vis[vertex]) {
          animations.push({ x: edgeNo, y: -1, color: "edge" });
          animations.push({ x: edgeNo, y: -1, color: "shrinkEdge" });
          animations.push({ x: vertex, y: -1, color: "blue" });
          dfsUtil(vertex);
        }
      });
    };

    dfsUtil(s);

    animations.forEach((anim, i) => {
      setTimeout(() => {
        if (anim.color === "edge") {
          const edge = document.getElementById(`edge${anim.x}`);
          if (edge) {
            edge.style.stroke = "blue";
            edge.style.strokeWidth = "5";
          }
        } else if (anim.color === "shrinkEdge") {
          const edge = document.getElementById(`edge${anim.x}`);
          if (edge) {
            edge.style.strokeWidth = "2";
          }
        } else {
          const point = document.getElementById(`point${anim.x}`);
          if (point) {
            point.style.fill = anim.color;
          }
        }
      }, i * delay);
    });
  };

  return (
    <div className="bg">
      <Header/>
      <center className="pt-4 pb-4 text-white bg-gradient-to-r from-indigo-600 to-purple-600 font-semibold text-center py-10">
        <button className="button button4 mx-2" onClick={() => bfs(src)}>
          BFS
        </button>
        <button className="button button4 mx-2" onClick={() => dfs(src)}>
          DFS
        </button>
        <button className="button button4 mx-2" onClick={() => reset()}>
          Reset algorithm
        </button>
        <button className="button button4 mx-2" onClick={() => clearCanvas()}>
          Clear Canvas
        </button>
        <button className="button button4 mx-2">
          
          <input
          className="text-indigo-600 text-center rounded-lg"
          type="text"
          style={{ width: "140px" }}
          value={"Start/Source : 0"}
        /> 
        </button>
        {/* <label style={{ fontFamily: "Georgia" }}>
          &nbsp;&nbsp;&nbsp;Source/Starting Vertex &nbsp;
        </label>
        <input
          type="text"
          style={{ width: "25px" }}
          id="src"
          value={0}
          onChange={(e) => setSrc(Number(e.target.value))}
        /> */}
      </center>
      <center>
        <svg
          ref={svgRef}
          width={1535}
          height={600}
          style={{ backgroundColor: "#BEBEEC", cursor: "crosshair" }}
          onClick={getMousePosition}
        >
          <rect>
            <title>
              1. Click to plot some points.&#13;2. Connect two points by clicking
              on them consecutively.&#13;3. Run the algorithm.
            </title>
          </rect>
          {edges.map((edge, idx) => (
            <line
              key={`edge${idx}`}
              id={`edge${idx}`}
              x1={points[edge.u]?.x}
              y1={points[edge.u]?.y}
              x2={points[edge.v]?.x}
              y2={points[edge.v]?.y}
              style={{
                stroke: "red",
                strokeWidth: "2",
                transition: "all 0.2s linear",
              }}
            />
          ))}
          {points.map((point, idx) => (
            <circle
              key={`point${idx}`}
              id={`point${idx}`}
              cx={point.x}
              cy={point.y}
              r="14"
              stroke="black"
              strokeWidth="1.5"
              style={{
                fill: "#000",
                transition: "all 0.2s linear",
                cursor: "pointer",
              }}
              onClick={(event) => drawLine(event, idx)}
            />
          ))}
          {points.map((point, idx) => (
            <text
              key={`index${idx}`}
              id={`index${idx}`}
              fontSize="14"
              fontFamily="Arial"
              x={point.x - 4}
              y={point.y + 4}
              style={{
                fill: "#fff",
                transition: "all 0.2s linear",
                cursor: "pointer",
              }}
              onClick={(event) => drawLine(event, idx)}
            >
              {idx}
            </text>
          ))}
        </svg>
      </center>
    </div>
  );
};

export default Canvas;

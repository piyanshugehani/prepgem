"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

const LineChart = () => {
  const data = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [
      {
        label: "Students Engaged",
        data: [15, 25, 20, 30, 28],
        borderColor: "#696cff", // Primary color
        borderWidth: 2,
        pointBorderColor: "#696cff",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 2,
        tension: 0.4, // Add curve to the line
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(105, 108, 255, 0.3)");
          gradient.addColorStop(1, "rgba(105, 108, 255, 0.02)");
          return gradient;
        },
      },
      {
        label: "Average Attendance",
        data: [10, 18, 15, 22, 20],
        borderColor: "#03c3ec", // Info color
        borderWidth: 2,
        pointBorderColor: "#03c3ec",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 2,
        tension: 0.4,
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(3, 195, 236, 0.3)");
          gradient.addColorStop(1, "rgba(3, 195, 236, 0.02)");
          return gradient;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          boxWidth: 10,
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          color: "#566a7f",
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(0,0,0,0.05)",
          drawBorder: false,
        },
        ticks: {
          color: "#566a7f",
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(0,0,0,0.05)",
          drawBorder: false,
        },
        ticks: {
          color: "#566a7f",
          font: {
            size: 12,
          },
          stepSize: 10,
        },
      },
    },
    elements: {
      point: {
        radius: 3,
        hoverRadius: 5,
      },
    },
  };

  return (
    <div className="card-body">
      <h5 className="card-title mb-4">Student Engagement</h5>
      <div style={{ height: "300px", width: "100%" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};
export default LineChart;
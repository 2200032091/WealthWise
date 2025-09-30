import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const PortfolioChart = ({ investments }) => {
  if (!investments || investments.length === 0) {
    return <p className="text-gray-500">No investments yet to show growth.</p>;
  }

  // 🗓 find the range of years
  const years = investments.map((inv) => new Date(inv.buyDate).getFullYear());
  const startYear = Math.min(...years);
  const endYear = new Date().getFullYear();

  const labels = [];
  const values = [];

  for (let year = startYear; year <= endYear; year++) {
    labels.push(year.toString());

    // calculate portfolio value at this year
    let total = 0;

    investments.forEach((inv) => {
      const buyYear = new Date(inv.buyDate).getFullYear();
      if (year >= buyYear) {
        // simple compound interest from buyYear to this year
        const yearsHeld = year - buyYear;
        const amount =
          inv.quantity * inv.buyPrice * Math.pow(1 + 0.08, yearsHeld); // assume 8% annual growth for now
        total += amount;
      }
    });

    values.push(total.toFixed(2));
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Portfolio Value ($)",
        data: values,
        borderColor: "rgb(99, 102, 241)", // indigo-500
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Line
        data={data}
        options={{
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: (tooltipItem) => `$${tooltipItem.raw}`,
              },
            },
          },
          scales: {
            y: {
              title: {
                display: true,
                text: "Value ($)",
              },
            },
            x: {
              title: {
                display: true,
                text: "Year",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default PortfolioChart;

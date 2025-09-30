import React, { useState } from "react";
import { Line } from "react-chartjs-2";

// Register Chart.js components (required for Chart.js v3+)
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

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Projection = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [data, setData] = useState(null);

  const calculateProjection = () => {
    const p = Number(principal);
    const r = Number(rate);
    const y = Number(years);

    if (isNaN(p) || isNaN(r) || isNaN(y) || p <= 0 || r < 0 || y <= 0) {
      alert("Please enter valid positive numbers.");
      return;
    }

    const currentYear = new Date().getFullYear();
    const values = [];
    const labels = [];

    for (let year = 1; year <= y; year++) {
      const amount = p * Math.pow(1 + r / 100, year);
      values.push(parseFloat(amount.toFixed(2)));
      labels.push((currentYear + year).toString()); // use actual future year
    }

    setData({
      labels,
      datasets: [
        {
          label: "Investment Growth",
          data: values,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.3,
          fill: true,
        },
      ],
    });
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📈 Growth Projection</h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <input
          type="number"
          value={principal}
          min="0"
          className="border p-2 rounded"
          placeholder="Initial Investment"
          onChange={(e) => setPrincipal(e.target.value)}
        />
        <input
          type="number"
          value={rate}
          min="0"
          placeholder="Annual Rate (%)"
          onChange={(e) => setRate(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          value={years}
          min="1"
          placeholder="Years"
          onChange={(e) => setYears(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <button
        onClick={calculateProjection}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Calculate
      </button>

      {data && (
        <div className="mt-6">
          <Line
            data={data}
            options={{
              responsive: true,
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      return `Value: $${tooltipItem.raw}`;
                    },
                  },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Projection;

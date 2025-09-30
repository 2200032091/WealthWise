import React, { useState } from "react";
import { Line } from "react-chartjs-2";

const Projection = () => {
  const [principal, setPrincipal] = useState(1000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(10);
  const [data, setData] = useState(null);

  const calculateProjection = () => {
    let values = [];
    let labels = [];

    for (let year = 1; year <= years; year++) {
      let amount = principal * Math.pow(1 + rate / 100, year);
      values.push(amount.toFixed(2));
      labels.push(`Year ${year}`);
    }

    setData({
      labels,
      datasets: [
        {
          label: "Investment Growth",
          data: values,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.3,
          fill: false,
        },
      ],
    });
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">📈 Growth Projection</h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          className="border p-2 rounded"
          placeholder="Initial Investment"
        />
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="border p-2 rounded"
          placeholder="Annual Rate (%)"
        />
        <input
          type="number"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          className="border p-2 rounded"
          placeholder="Years"
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
          <Line data={data} />
        </div>
      )}
    </div>
  );
};

export default Projection;

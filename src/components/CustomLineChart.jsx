// CustomLineChart.jsx
import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white rounded-lg shadow-lg px-3 py-2 border border-gray-200">
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        <p className="text-base font-semibold text-purple-600">
          ₹{payload[0].value.toLocaleString('en-IN')}
        </p>
      </div>
    );
  }
  return null;
};

const CustomLineChart = ({ data = [] }) => {
  if (!data.length) {
    return (
      <div 
        className="flex items-center justify-center text-sm text-gray-400"
        style={{ width: '100%', height: '400px' }}
      >
        No income data for this month
      </div>
    );
  }

  // Calculate better Y-axis range with proper scaling
  const values = data.map(d => d.total);
  const maxValue = Math.max(...values);
  
  // Determine step size based on max value
  let step;
  if (maxValue > 1000000) {
    step = 2500000; // 25L steps for very large values
  } else if (maxValue > 500000) {
    step = 100000; // 1L steps
  } else if (maxValue > 100000) {
    step = 25000; // 25k steps
  } else if (maxValue > 50000) {
    step = 15000; // 15k steps
  } else {
    step = 10000; // 10k steps
  }
  
  const yAxisMax = Math.ceil(maxValue / step) * step;
  const numTicks = 5;
  const ticks = Array.from({ length: numTicks }, (_, i) => (yAxisMax / (numTicks - 1)) * i);

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 40, left: 0, bottom: 10 }}
        >
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.5} />
              <stop offset="50%" stopColor="#c4b5fd" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#e9d5ff" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          
          <CartesianGrid 
            strokeDasharray="0" 
            vertical={false}
            stroke="#e5e7eb"
            strokeWidth={1}
          />
          
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 13 }}
            dy={10}
          />
          
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 13 }}
            tickFormatter={(value) => {
              if (value === 0) return '0';
              if (value >= 10000000) return `${(value / 10000000).toFixed(1)}Cr`;
              if (value >= 100000) return `${(value / 100000).toFixed(0)},00,000`;
              if (value >= 1000) return `${(value / 1000).toFixed(0)},000`;
              return value.toString();
            }}
            domain={[0, yAxisMax]}
            ticks={ticks}
            width={80}
          />
          
          <Tooltip content={<CustomTooltip />} cursor={false} />
          
          <Area
            type="monotone"
            dataKey="total"
            stroke="#7c3aed"
            strokeWidth={2.5}
            fill="url(#colorIncome)"
            fillOpacity={1}
            dot={{ 
              fill: "#7c3aed", 
              strokeWidth: 0, 
              r: 5,
            }}
            activeDot={{ 
              r: 7, 
              fill: "#7c3aed",
              stroke: "#fff",
              strokeWidth: 2
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
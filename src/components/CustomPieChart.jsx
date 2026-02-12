import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const CustomPieChart = ({
  data = [],
  colors = [],
  label = "",
  totalAmount = "",
  showTextAnchor = false,
}) => {
  return (
    <div className="flex items-center justify-center">
      <PieChart width={320} height={320}>
        <Pie
          data={data}
          dataKey="amount"
          cx="50%"
          cy="50%"
          innerRadius={90}
          outerRadius={120}
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>

        {/* Center Text */}
        <text
          x="50%"
          y="35%"
          textAnchor={showTextAnchor ? "middle" : "start"}
          dominantBaseline="middle"
          style={{
            fontSize: "14px",
            fill: "#6b7280",
          }}
        >
          {label}
        </text>

        <text
          x="50%"
          y="45%"
          textAnchor={showTextAnchor ? "middle" : "start"}
          dominantBaseline="middle"
          style={{
            fontSize: "26px",
            fontWeight: "600",
            fill: "#111827",
          }}
        >
          {totalAmount}
        </text>

        <Tooltip />

        <Legend
          verticalAlign="bottom"
          align="center"
          iconType="circle"
          wrapperStyle={{
            fontSize: "14px",
            paddingTop: "20px",
          }}
        />
      </PieChart>
    </div>
  );
};

export default CustomPieChart;

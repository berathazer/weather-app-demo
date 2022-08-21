import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  Label,
  LabelList,
} from "recharts";


const TempChart = ({data,setIndex}) => {
  
  return (
    <div>
      <ResponsiveContainer width={"100%"} height={250}>
        <AreaChart data={data} onClick={(e)=>{setIndex(e.activeTooltipIndex)}} margin={{top:25}}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="yellow" stopOpacity={0.15} />
              <stop offset="95%" stopColor="yellow" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            padding={{ left: 25, right: 25 }}
            axisLine={false}
          />

          <Area
            type="basis"
            dataKey="degree"
            stroke="yellow"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#color)"

            className="cursor-pointer"
     
          >
            <LabelList
              dataKey="degree"
              position="top"
              fill="white"
              fontSize={16}
              margin={{bottom:10}}
              formatter={(value) => value + " ⁰C"}
            />
          </Area>
          <Tooltip cursor={false} content={<CustomTooltip />} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload) {
    return (
      <div className="bg-slate-800 text-white p-2  outline-none border-none shadow-md">
        <h4>Min: {payload[0]?.payload.min}</h4>
        <h4>Max: {payload[0]?.payload.max}</h4>
      </div>
    );
  }
};

export default TempChart;

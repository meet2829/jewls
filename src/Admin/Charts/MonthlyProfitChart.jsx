import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

const MonthlyProfitChart = ({ orders }) => {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

 
  const data = months.map(month => ({ month, profit: 0 }));

  orders.forEach(order => {
    const date = new Date(order.createdAt); 
    const monthIndex = date.getMonth(); 
    data[monthIndex].profit += Number(order.total); 
  });

  return (
    <div style={{ width: "100%", height: 400 }}>
      <LineChart width={700} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis stroke="#ffffff" dataKey="month"  />
        <YAxis stroke="oooooo" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="profit" stroke="#ff7300" />
      </LineChart>
    </div>
  );
};

export default MonthlyProfitChart;

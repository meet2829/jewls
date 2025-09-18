import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const MonthlyOrderChart = ({ orders }) => {
  // Prepare data: count orders per month
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Initialize count for each month
  const data = months.map((month) => ({ month, orders: 0 }));

  orders.forEach(order => {
    // Assuming order has a 'createdAt' field (ISO date string)
    const date = new Date(order.createdAt);
    const monthIndex = date.getMonth(); // 0-11
    data[monthIndex].orders += 1;
  });

  return (
    <div style={{ width: "100%", height: 400 }}>
      <BarChart width={700} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis stroke="#ffffff" dataKey="month" />
        <YAxis  stroke="#oooooo" allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="orders" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default MonthlyOrderChart;

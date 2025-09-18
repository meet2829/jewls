import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const UserCountChart = ({ users }) => {
  const data = [
    { name: "Users", count: users.length }
  ];

  return (
    <div style={{ width: 400, height: 300 }}>
      <BarChart width={400} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default UserCountChart;

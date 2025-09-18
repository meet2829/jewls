import { Pie, PieChart, Cell, Tooltip, Legend } from 'recharts'

const Colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EF5"];

const CatagoryPieChart = ({ products }) => {
  // Count number of products per category
  const data = products.reduce((acc, curr) => {
    const found = acc.find(item => item.name === curr.category);
    if (found) {
      found.value += 1; // increment count
    } else {
      acc.push({ name: curr.category, value: 1 }); // first product in this category
    }
    return acc;
  }, []);

  console.log("Pie chart data:", data); // debug

  if (!data.length) return <p>No data to show</p>;

  return (
    <div style={{ width: 400, height: 400 }}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={120}
          label
          labelLine={false}
          dataKey="value" // now this is count
        >
          {data.map((_, index) => (
            <Cell key={index} fill={Colors[index % Colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  )
}

export default CatagoryPieChart;

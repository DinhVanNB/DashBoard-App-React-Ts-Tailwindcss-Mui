
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import data from '../../data/data';

const ChartBar =()=> {

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          // width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="post" fill="#8884d8" />
          <Bar dataKey="like" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  export default ChartBar;
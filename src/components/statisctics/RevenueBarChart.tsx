import { useStatistics } from '@/hooks/useStatistics';
import { convertPrice } from '@/lib/utils';
import { Spinner } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const RevenueBarChart = ({ year }) => {
  const { getDataBarChart } = useStatistics();
  const {
    data: barData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['PieChart', year],
    queryFn: async () => {
      const res = await getDataBarChart({
        data: {
          year: Number(year),
        },
      });
      return res?.data;
    },
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      {isLoading ? (
        <div className="w-full h-[200px] flex justify-center">
          <Spinner size="md" />
        </div>
      ) : (
        <BarChart
          width={500}
          height={300}
          data={barData}
          margin={{
            top: 10,
            right: 30,
            left: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tickFormatter={value => `Tháng ${value}`} />
          <YAxis />
          <Tooltip
            labelFormatter={value => `Tháng ${value}`}
            formatter={value => convertPrice(value)}
          />
          <Legend />
          <Bar
            dataKey="Tổng chi"
            fill="#FFBB28"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="Tổng thu"
            fill="#00C49F"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      )}
    </ResponsiveContainer>
  );
};

export default RevenueBarChart;

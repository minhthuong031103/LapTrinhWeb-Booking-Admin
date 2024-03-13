'use client';
import { useStatistics } from '@/hooks/useStatistics';
import { convertPrice, convertPriceNotVND } from '@/lib/utils';
import { Spinner } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';

const RevenuePieChart = ({ month }) => {
  const { getDataPieChart } = useStatistics();
  const {
    data: pieData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['PieChart', month],
    queryFn: async () => {
      const res = await getDataPieChart({
        data: {
          month: Number(month),
          year: Number(new Date().getFullYear()),
        },
      });
      return res?.data;
    },
  });

  const COLORS = ['#FFBB28', '#00C49F'];

  const renderActiveShape = props => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,

      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={'#333'}>
          {convertPriceNotVND(
            pieData?.data[1]?.value - pieData?.data[0]?.value,
          )}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`${convertPrice(value)}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Tỉ lệ ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <ResponsiveContainer className="w-full flex items-center">
      {isLoading ? (
        <div className="w-full h-[200px] flex justify-center">
          <Spinner size="md" />
        </div>
      ) : (
        <PieChart width={800} height={500}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={pieData?.data}
            cx="50%"
            cy="30%"
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
            onMouseEnter={(e, index) => setActiveIndex(index)}
          >
            {pieData?.data?.map((item, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      )}
    </ResponsiveContainer>
  );
};

export default RevenuePieChart;

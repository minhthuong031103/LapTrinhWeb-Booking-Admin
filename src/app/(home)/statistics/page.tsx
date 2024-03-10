'use client';
import RevenueBarChart from '@/components/statisctics/RevenueBarChart';
import RevenuePieChart from '@/components/statisctics/RevenuePieChart';
import { getMonthsArray, getYearsArrayFrom2000ToNow } from '@/lib/utils';
import { Select, SelectItem } from '@nextui-org/react';

import { useState } from 'react';

const StatisticsPage = () => {
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
  const [year, setYear] = useState(new Date().getFullYear().toString());

  return (
    <div className="w-full h-full items-start gap-2">
      <div className="w-full p-3 rounded-md border-1">
        <div className="w-[345px] flex items-center justify-between">
          <span className="text-gray font-bold text-base">
            THỐNG KÊ LỢI NHUẬN THEO
          </span>
          <Select
            selectedKeys={month ? [month] : []}
            className="max-w-[120px]"
            disallowEmptySelection
            classNames={{
              selectorIcon: 'text-gray',
              value:
                'text-gray uppercase text-base font-bold group-data-[has-value=true]:text-gray',
              trigger:
                'data-[hover=true]:bg-white group-data-[focused=true]:bg-white bg-white',
            }}
            onChange={e => {
              setMonth(e.target.value);
            }}
          >
            {getMonthsArray()?.map(month => (
              <SelectItem key={month.id} value={month.id}>
                {month.name}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex flex-col relative w-full h-[500px]">
          <RevenuePieChart month={month} />
          <div className="absolute bottom-20 left-0 justify-end flex gap-3 items-center">
            <div className="w-fit space-y-6">
              <div>Số tiền thu</div>
              <div>Số tiền chi</div>
            </div>
            <div className="w-fit space-y-7">
              <div className="w-5 h-5 border-1 bg-[#00C49F]"></div>
              <div className="w-5 h-5 border-1 bg-[#FFBB28]"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-3 rounded-md border-1">
        <span className="text-gray font-bold">THỐNG KÊ LỢI NHUẬN THEO</span>
        <Select
          selectedKeys={year ? [year] : []}
          className="max-w-[130px]"
          disallowEmptySelection
          classNames={{
            selectorIcon: 'text-gray',
            value:
              'text-gray uppercase text-base font-bold group-data-[has-value=true]:text-gray',
            trigger:
              'data-[hover=true]:bg-white group-data-[focused=true]:bg-white bg-white',
          }}
          onChange={e => {
            setYear(e.target.value);
          }}
        >
          {getYearsArrayFrom2000ToNow()?.map(year => (
            <SelectItem key={year.id} value={year.id}>
              {year.name}
            </SelectItem>
          ))}
        </Select>
        <div className="w-full h-[500px]">
          <RevenueBarChart year={year} />
        </div>
      </div>
    </div>
  );
};
export default StatisticsPage;

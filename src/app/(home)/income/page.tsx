'use client';

import DataTable from '@/components/datatable/Datatable';

import { useStatistics } from '@/hooks/useStatistics';
import { KEY_CONTEXT, queryKey } from '@/lib/constant';
import { IncomeProps } from '@/lib/interface';
import { convertPrice, convertPrismaTimeToDateTime } from '@/lib/utils';

import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

interface ResponseProps {
  items: IncomeProps[];
  totalItems: number;
  totalPages: number;
}

const columnKeys = {
  apartmentName: 'apartmentName',
  roomName: 'roomName',
  endDate: 'endDate',
  totalPrice: 'totalPrice',
  userName: 'userName',
};

const columns = [
  {
    id: columnKeys.apartmentName,
    title: 'Tên căn hộ',
    sortable: true,
  },
  {
    id: columnKeys.roomName,
    title: 'Tên phòng',
    sortable: true,
  },
  {
    id: columnKeys.userName,
    title: 'Nhân viên thu',
  },
  {
    id: columnKeys.endDate,
    title: 'Ngày thu',
  },
  {
    id: columnKeys.totalPrice,
    title: 'Tổng tiền thu',
  },
];

const NormalRenderCell = ({ cellValue }) => {
  return (
    <div className="flex flex-col">
      <p className="text-bold text-small ">{cellValue}</p>
    </div>
  );
};

const UserPage = () => {
  const [limit, setLimit] = useState('10');
  const [currentPage, setCurrentPage] = useState(1);
  const { getAllBill } = useStatistics();
  const userId = JSON.parse(localStorage.getItem(KEY_CONTEXT.USER) || '{}')?.id;

  const { data: bills, isLoading } = useQuery<ResponseProps>({
    queryKey: [queryKey.BILL, { currentPage, limit, userId }],
    queryFn: async () => {
      const res = await getAllBill({
        page: currentPage,
        limit,
      });
      return {
        items: res?.data?.items.map((item: any) => ({
          id: item.id,
          endDate: convertPrismaTimeToDateTime(item?.endDate),
          userName: item?.userName || 'Không tìm thấy',
          apartmentName: item?.apartment?.name,
          roomName: item?.room?.name,
          totalPrice: convertPrice(item?.room?.netProceeds),
        })),
        totalItems: res?.data?.totalItems,
        totalPages: res?.data?.totalPages,
      };
    },
  });
  const renderCell = React.useCallback(
    (user: IncomeProps, columnKey: React.Key) => {
      const cellValue = user[columnKey];
      switch (columnKey) {
        default:
          return <NormalRenderCell cellValue={cellValue} />;
      }
    },
    [],
  );
  return (
    <>
      <div className="flex items-end justify-between ">
        <p className="font-semibold font-lg text-gray">QUẢN LÝ THU</p>
      </div>
      <div className="w-full h-full mt-4 grid gap-4 grid-cols-1">
        <DataTable
          columns={columns}
          keyName={queryKey.BILL}
          isLoading={isLoading}
          data={bills?.items || []}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={bills?.totalPages || 0}
          totalItems={bills?.totalItems || 0}
          limit={limit}
          setLimit={setLimit}
          setSearch={{}}
          renderCell={renderCell}
        />
      </div>
    </>
  );
};

export default UserPage;

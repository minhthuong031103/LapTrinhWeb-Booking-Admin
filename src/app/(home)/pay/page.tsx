'use client';

import { CommonSvg } from '@/assets/CommonSvg';
import DataTable from '@/components/datatable/Datatable';
import { VerticalDotsIcon } from '@/components/datatable/VerticalDotsIcon';
import { useModal } from '@/hooks/useModalStore';

import { BillProps, useStatistics } from '@/hooks/useStatistics';
import { EModalType, KEY_CONTEXT, queryKey } from '@/lib/constant';
import { IncomeProps } from '@/lib/interface';
import { convertPrice, convertPrismaTimeToDateTime } from '@/lib/utils';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';

import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

interface ResponseProps {
  items: BillProps[];
  totalItems: number;
  totalPages: number;
}

const columnKeys = {
  apartmentName: 'apartmentName',
  roomName: 'roomName',
  payDay: 'payDay',
  paymentAmount: 'paymentAmount',
  userName: 'userName',
  paymentType: 'paymentType',
  action: 'action',
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
    id: columnKeys.paymentType,
    title: 'Loại chi',
  },
  {
    id: columnKeys.userName,
    title: 'Nhân viên chi',
  },
  {
    id: columnKeys.payDay,
    title: 'Ngày chi',
  },
  {
    id: columnKeys.paymentAmount,
    title: 'Tổng tiền chi',
  },
  {
    id: columnKeys.action,
    title: 'Thao tác',
    sortable: false,
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
  const { getAllPay } = useStatistics();
  const { onOpen } = useModal();
  const userId = JSON.parse(localStorage.getItem(KEY_CONTEXT.USER) || '{}')?.id;

  const {
    data: bills,
    isLoading,
    refetch,
  } = useQuery<ResponseProps>({
    queryKey: [queryKey.PAYMENTS, { currentPage, limit, userId }],
    queryFn: async () => {
      const res = await getAllPay({
        page: currentPage,
        limit,
      });
      return {
        items: res?.data?.items.map((item: any) => ({
          id: item.id,
          payDay: convertPrismaTimeToDateTime(item?.payDay),
          userName: item?.userName || 'Không tìm thấy',
          apartmentName: item?.apartment?.name,
          apartmentId: item?.apartment?.id,
          roomId: item?.room?.id,
          payMoney: item?.paymentAmount,
          payDayDefault: item?.payDay,
          roomName: item?.room?.name,
          paymentType: item?.paymentType,
          paymentAmount: convertPrice(item?.paymentAmount),
        })),
        totalItems: res?.data?.totalItems,
        totalPages: res?.data?.totalPages,
      };
    },
  });
  const renderCell = React.useCallback(
    (bill: BillProps, columnKey: React.Key) => {
      const cellValue = bill[columnKey];
      switch (columnKey) {
        case columnKeys.action:
          return (
            <div className="relative flex w-24 ml-3 items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-black" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => onOpen('editPay', bill, refetch)}
                  >
                    Chỉnh sửa
                  </DropdownItem>

                  <DropdownItem
                    onClick={() => onOpen(EModalType.PAY_DELETE, bill, refetch)}
                  >
                    Xóa
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return <NormalRenderCell cellValue={cellValue} />;
      }
    },
    [],
  );
  return (
    <>
      <div className="flex items-end justify-between ">
        <p className="font-semibold font-lg text-gray">QUẢN LÝ CHI</p>
      </div>
      <div className="w-full h-full mt-4 grid gap-4 grid-cols-1">
        <DataTable
          renderHeader={() => {
            return (
              <Button
                onPress={() => onOpen('addPay', {}, refetch)}
                className="rounded-[8px] px-4 py-2 bg-blueButton"
              >
                <div className="flex flex-row items-center gap-x-[8px] ">
                  <div>{CommonSvg.plus()}</div>
                  <div className="text-white mt-[1px] font-medium">
                    Thêm phiếu chi
                  </div>
                </div>
              </Button>
            );
          }}
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

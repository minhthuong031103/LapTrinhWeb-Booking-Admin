'use client';

import { CommonSvg } from '@/assets/CommonSvg';
import DataTable from '@/components/datatable/Datatable';
import { VerticalDotsIcon } from '@/components/datatable/VerticalDotsIcon';
import { useEmployee } from '@/hooks/useEmployee';

import { useModal } from '@/hooks/useModalStore';
import { KEY_CONTEXT, queryKey } from '@/lib/constant';
import { EmployeeProps } from '@/lib/interface';
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
  items: EmployeeProps[];
  totalItems: number;
  totalPages: number;
}

const columnKeys = {
  email: 'email',
  name: 'name',
  phone: 'phone',
  bankNumber: 'bankNumber',
  bank: 'bank',
  action: 'action',
};

const columns = [
  {
    id: columnKeys.email,
    title: 'Email',
    sortable: true,
  },
  {
    id: columnKeys.name,
    title: 'Tên nhân viên',
    sortable: true,
  },
  {
    id: columnKeys.phone,
    title: 'Số điện thoại',
    sortable: true,
  },
  {
    id: columnKeys.bank,
    title: 'Ngân hàng',
  },
  {
    id: columnKeys.bankNumber,
    title: 'Số tài khoản',
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
  const { onOpen } = useModal();
  const { getEmployees } = useEmployee();
  const userAdmin = JSON.parse(localStorage.getItem(KEY_CONTEXT.USER) as any);
  const {
    data: employees,
    isLoading,
    refetch,
  } = useQuery<ResponseProps>({
    queryKey: [queryKey.EMPLOYEES, { currentPage, limit, userAdmin }],
    queryFn: async () => {
      const res = await getEmployees({
        page: currentPage,
        limit,
      });
      return res?.data;
    },
  });

  const renderCell = React.useCallback(
    (user: EmployeeProps, columnKey: React.Key) => {
      const cellValue = user[columnKey];
      switch (columnKey) {
        case columnKeys.action:
          return (
            <div className="relative flex w-24 ml-2 items-center gap-2">
              {userAdmin?.roleName === 'Admin' &&
                Number(userAdmin?.id) !== user.id && (
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly size="sm" variant="light">
                        <VerticalDotsIcon className="text-black" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem
                        onClick={() => onOpen('editEmployee', user, refetch)}
                      >
                        Chỉnh sửa
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => onOpen('updatePassword', user, refetch)}
                      >
                        Đổi mật khẩu
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => onOpen('deleteEmployee', user, refetch)}
                      >
                        Xóa
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                )}
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
      <div className="flex items-end justify-between">
        <p className="font-semibold font-lg text-gray">DANH SÁCH NHÂN VIÊN</p>
      </div>
      <div className="w-full h-full mt-4 grid gap-4 grid-cols-1">
        <DataTable
          renderHeader={() => {
            return (
              <Button
                onPress={() => onOpen('createEmployee', {}, refetch)}
                className="rounded-[8px] px-4 py-2 bg-blueButton"
              >
                <div className="flex flex-row items-center gap-x-[8px] ">
                  <div>{CommonSvg.plus()}</div>
                  <div className="text-white mt-[1px] font-medium">
                    Thêm nhân viên
                  </div>
                </div>
              </Button>
            );
          }}
          columns={columns}
          keyName={queryKey.EMPLOYEES}
          isLoading={isLoading}
          data={employees?.items || []}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={employees?.totalPages || 0}
          totalItems={employees?.totalItems || 0}
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

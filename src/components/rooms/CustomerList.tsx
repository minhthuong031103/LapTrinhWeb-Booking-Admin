import { CommonSvg } from '@/assets/CommonSvg';
import DataTable from '@/components/datatable/Datatable';
import { VerticalDotsIcon } from '@/components/datatable/VerticalDotsIcon';
import { useCustomer } from '@/hooks/useCustomer';
import { useModal } from '@/hooks/useModalStore';
import { EModalType, KEY_CONTEXT, queryKey } from '@/lib/constant';
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
interface CustomerProps {
  id: string;
  title: string;
  phone: string;
  address: string;
  identityCard: string;
  city: string;
  district: string;
  ward: string;
  houseNumber: string;
  registeredTemporaryResidence: boolean;
  plate: string;
}

interface ResponseProps {
  items: CustomerProps[];
  totalItems: number;
  totalPages: number;
}
const columnKeys = {
  name: 'name',
  phone: 'phone',
  address: 'address',
  identityCard: 'identityCard',
  registeredTemporaryResidence: 'registeredTemporaryResidence',
  roomId: 'roomId',
  action: 'action',
};

const columns = [
  {
    id: columnKeys.name,
    title: 'Tên khách hàng',
    sortable: true,
  },
  {
    id: columnKeys.phone,
    title: 'Số điện thoại',
    sortable: true,
  },
  {
    id: columnKeys.address,
    title: 'Địa chỉ',
    sortable: true,
  },
  {
    id: columnKeys.identityCard,
    title: 'Số CMND',
    sortable: true,
  },

  {
    id: columnKeys.registeredTemporaryResidence,
    title: 'Tạm trú',
    sortable: true,
  },
  {
    id: columnKeys.roomId,
    title: 'Phòng',
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
const CustomerList = ({ roomId }) => {
  const [limit, setLimit] = useState('10');
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState(null);
  const [searchField, setSearchField] = useState('name');
  const { getCustomersByRoom } = useCustomer();
  const { onOpen } = useModal();
  const userId = JSON.parse(localStorage.getItem(KEY_CONTEXT.USER) || '{}')?.id;

  const { data: customers, isLoading } = useQuery<ResponseProps>({
    queryKey: [queryKey.CUSTOMERS, { currentPage, limit, search, userId }],
    queryFn: async () => {
      const res = await getCustomersByRoom({
        page: currentPage,
        limit,
        search,
        searchField,
        roomId,
      });
      return res?.data;
    },
  });

  const renderCell = React.useCallback(
    (user: CustomerProps, columnKey: React.Key) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
        case columnKeys.registeredTemporaryResidence:
          return (
            <div className="flex items-center justify-start ml-3">
              <Checkbox
                color="success"
                disabled
                isSelected={cellValue}
              ></Checkbox>
            </div>
          );
        case columnKeys.action:
          return (
            <div className="relative flex w-24 ml-2 items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-black" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => onOpen(EModalType.CUSTOMER_EDIT)}
                  >
                    Chỉnh sửa
                  </DropdownItem>
                  <DropdownItem>Xóa</DropdownItem>
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
      <div className="w-full h-full mt-4 grid gap-4 grid-cols-1">
        <DataTable
          renderHeader={() => {
            return (
              <Button
                onPress={() => onOpen(EModalType.CUSTOMER_CREATE)}
                className="rounded-[8px] px-4 py-2 bg-blueButton"
              >
                <div className="flex flex-row items-center gap-x-[8px] ">
                  <div>{CommonSvg.plus()}</div>
                  <div className="text-white mt-[1px] font-medium">
                    Thêm khách trọ
                  </div>
                </div>
              </Button>
            );
          }}
          columns={columns}
          keyName={queryKey.CUSTOMERS}
          search={search}
          setSearch={setSearch}
          isLoading={isLoading}
          data={customers?.items || []}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={customers?.totalPages || 0}
          totalItems={customers?.totalItems || 0}
          limit={limit}
          setLimit={setLimit}
          renderCell={renderCell}
        />
      </div>
    </>
  );
};

export default CustomerList;

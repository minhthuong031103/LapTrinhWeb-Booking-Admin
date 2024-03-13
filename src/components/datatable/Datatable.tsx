import { CommonSvg } from '@/assets/CommonSvg';
import { Customer } from '@/types';
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
  Select,
  SelectItem,
  Selection,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from '@nextui-org/react';
import React from 'react';
import Loader from '../Loader';
import { VerticalDotsIcon } from './VerticalDotsIcon';

interface CustomerProps {
  id: string;
  name: string;
  address: string;
  identity: string;
  temporaryResidence: boolean;
  plate: string;
}

interface dataTableProps {
  data: any[];
  currentPage: number;
  setCurrentPage: any;
  limit: string;
  setLimit?: any;
  totalPages: number;
  totalItems: number;
  keyName: string;
  search?: string | null;
  setSearch: any;
  renderRight?: any;
  renderCell?: any;
  isLoading?: boolean;
  columns: any;
  showLimit?: boolean;
  renderHeader?: any;
}

interface ColumnProps {
  id: string;
  title: string;
  sortable?: boolean;
}

const limitOptions = [
  { label: '5', value: '5' },
  { label: '10', value: '10' },
  { label: '15', value: '15' },
  { label: '20', value: '20' },
];

export default function DataTable({
  data,
  currentPage,
  setCurrentPage,
  limit,
  setLimit,
  totalPages,
  isLoading,
  totalItems,
  keyName,
  search = null,
  setSearch,
  showLimit = true,
  renderRight,
  renderCell,
  renderHeader,
  columns,
}: dataTableProps) {
  const headerColumns = React.useMemo(() => {
    return columns;
  }, []);

  // const onSearchChange = React.useCallback((value?: string) => {
  //     if (value) {
  //       setFilterValue(value);
  //       setPage(1);
  //     } else {
  //       setFilterValue("");
  //     }
  //   }, []);

  // const onClear = React.useCallback(()=>{
  //   setFilterValue("")
  //   setPage(1)
  // },[])

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-5 items-start">
          {renderHeader && renderHeader()}
          <div className="flex flex-row gap-x-5 items-center">
            <Select
              label="Giới hạn"
              placeholder="Chọn giới hạn"
              className="w-[120px]"
              selectedKeys={[limit]}
              onChange={e => {
                setLimit(e.target.value);
                setCurrentPage(1);
              }}
            >
              {limitOptions.map(limit => (
                <SelectItem key={limit.value} value={limit.value}>
                  {limit.label}
                </SelectItem>
              ))}
            </Select>
            <div>
              Tổng số: <span className="font-semibold">{totalItems}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }, [data]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-center items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={currentPage}
          total={totalPages}
          onChange={setCurrentPage}
        />
      </div>
    );
  }, [currentPage, totalPages, data]);
  return isLoading ? (
    <div className="w-full h-[300px] flex items-center justify-center">
      <Spinner />
    </div>
  ) : (
    <Table
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: 'max-h-[700px]',
      }}
      topContent={showLimit ? topContent : null}
      selectionMode="single"
      topContentPlacement="outside"
    >
      <TableHeader columns={headerColumns}>
        {(column: ColumnProps) => (
          <TableColumn
            key={column.id}
            align={column.id === 'actions' ? 'center' : 'start'}
            style={{ backgroundColor: '#2458C6', color: 'white' }}
          >
            {column.title}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody emptyContent={'Không tìm thấy dữ liệu'} items={data}>
        {item => {
          return (
            <TableRow key={item.id}>
              {columnKey => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          );
        }}
      </TableBody>
    </Table>
  );
}

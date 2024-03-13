'use client';

import { SearchBar } from './(components)/home/searchbar';
import ListApartment from './(components)/home/list-apartment';
import { useEffect, useState } from 'react';
import { useApartment } from '@/hooks/useApartment';
import { ChevronDown } from 'lucide-react';
import { Pagination, Spinner } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { KEY_CONTEXT, queryKey } from '@/lib/constant';
import { Apartment } from '@/types';
import Loader from '@/components/Loader';
interface ResponseProps {
  items: Apartment[];
  totalItems: number;
  totalPages: number;
}
const page = () => {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { getApartments } = useApartment();
  const userId = JSON.parse(localStorage.getItem(KEY_CONTEXT.USER) || '{}')?.id;
  const {
    data: apartments,
    isLoading,
    refetch,
  } = useQuery<ResponseProps>({
    queryKey: [
      queryKey.APARTMENTS,
      { currentPage, limit: 10, searchValue, searchField: 'name', userId },
    ],
    queryFn: async () => {
      const res = await getApartments({
        page: currentPage,
        limit: 10,
        search: searchValue,
        searchField: 'name',
      });
      return res?.data;
    },
  });

  return (
    <>
      <div className="w-full p-3 border-1 drop-shadow border-borderColor rounded-lg">
        <p className="font-medium text-sm text-black">Tìm kiếm</p>
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setCurrentPage={setCurrentPage}
        />
        <div className="w-fit pb-2 flex items-center gap-3 cursor-pointer group">
          <p className="font-medium text-base text-gray group-hover:font-semibold group-hover:scale-105">
            Tìm kiếm nâng cao
          </p>
          <ChevronDown
            className="text-gray group-hover:font-semibold group-hover:scale-105"
            size={18}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="w-full flex justify-center items-center h-[200px]">
          <Spinner />
        </div>
      ) : apartments?.items.length === 0 ? (
        <div className="w-full h-[300px] flex items-center justify-center">
          <p className="font-medium text-base text-room-detail/50">
            Không có dữ liệu...
          </p>
        </div>
      ) : (
        <div className="w-full h-full mt-4">
          <ListApartment
            apartments={apartments?.items || []}
            onAction={refetch}
          />
          <div className="py-8 px-2 flex justify-center items-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={currentPage}
              total={apartments?.totalPages || 1}
              onChange={setCurrentPage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default page;

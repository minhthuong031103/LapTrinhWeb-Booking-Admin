'use client';
import { CommonSvg } from '@/assets/CommonSvg';

import { useApartment } from '@/hooks/useApartment';
import { KEY_CONTEXT, queryKey } from '@/lib/constant';
import { cn, getCurrentMonth } from '@/lib/utils';
import { Apartment } from '@/types';
import { Select, SelectItem, Spinner } from '@nextui-org/react';
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ChevronDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { CustomSelect } from '../(components)/home/custom-select';
import { SearchBar } from '../(components)/home/searchbar';
import ListBill from './ListBill';

const FormsPage = () => {
  const [searchAdvanced, setSearchAdvanced] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [electricityPrice, setElectricityPrice] = useState('');
  const [statusRoom, setStatusRoom] = useState('');
  const [statusPayment, setStatusPayment] = useState('');
  const [apartmentChosen, setApartmentChosen] = useState('');

  const [currentPage, setCurrentPage] = useState(1);

  const { getApartments } = useApartment();
  const userId = JSON.parse(localStorage.getItem(KEY_CONTEXT.USER) || '{}')?.id;

  const {
    data: apartments,
    fetchNextPage,
    hasNextPage,
    refetch: refetchData,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [queryKey.APARTMENTS_SELECT, { currentPage, limit: 10, userId }],
    ({ pageParam = 0 }) =>
      getApartments({
        page: pageParam,
        limit: 10,
        search: searchValue,
        searchField: 'name',
      }),
    {
      staleTime: 1000 * 60 * 1,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, pages) => {
        if (
          lastPage?.data.currentPage === 1 &&
          pages?.length < lastPage?.data.totalPages
        )
          return 2;
        if (pages?.length < lastPage?.data.totalPages) return pages?.length;
        else return undefined;
      },
    },
  );
  useEffect(() => {
    if (apartments?.pages?.[0]?.data?.items[0]?.id && apartmentChosen === '') {
      setApartmentChosen(apartments?.pages[0]?.data?.items[0]?.id?.toString());
    }
  }, [apartments]);
  const apartment: Apartment = apartments?.pages?.map(page => {
    return page?.data?.items.find(
      item => item.id.toString() === apartmentChosen,
    );
  })[0];

  const [month, setMonth] = useState('');
  const handleSearch = () => {
    //
  };
  const classNameChosen = 'font-semibold text-sm text-white';
  const classNameNotChosen = 'font-medium text-sm text-black';

  const [isOpen, setIsOpen] = useState(false);
  const [flag, setFlag] = useState(false);
  const [, scrollerRef] = useInfiniteScroll({
    isEnabled: isOpen,
    hasMore: hasNextPage,
    shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
    onLoadMore: () => {
      fetchNextPage();
    },
  });
  return (
    <>
      <div className="w-full p-3 border-1 drop-shadow border-borderColor rounded-lg">
        <p className="font-medium text-sm text-black">Tìm kiếm</p>
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleSearch={handleSearch}
        />
        <div
          className="w-fit pb-2 flex items-center gap-3 cursor-pointer group"
          onClick={() => setSearchAdvanced(!searchAdvanced)}
        >
          <p className="font-medium text-base text-gray group-hover:font-semibold group-hover:scale-105">
            Tìm kiếm nâng cao
          </p>
          <ChevronDown
            className={cn(
              'text-gray group-hover:font-semibold group-hover:scale-105',
              searchAdvanced && 'transform rotate-180',
            )}
            size={18}
          />
        </div>
        {searchAdvanced && (
          <div className="flex w-full gap-5 mt-2 pb-2">
            <CustomSelect
              label="Cập nhật điện nước"
              value={electricityPrice}
              setValue={setElectricityPrice}
              data={['1', '2', '3']}
            />
            <CustomSelect
              label="Trạng thái phòng"
              value={statusRoom}
              setValue={setStatusRoom}
              data={['1', '2', '3']}
            />
            <CustomSelect
              label="Trạng thái thu tiền"
              value={statusPayment}
              setValue={setStatusPayment}
              data={['1', '2', '3']}
            />
            <CustomSelect
              label="Tháng"
              value={month}
              setValue={setMonth}
              data={['1', '2', '3']}
            />
          </div>
        )}
      </div>
      <div className="w-full h-full mt-4">
        <div className="flex gap-4 items-center">
          <Select
            placeholder="Chọn căn hộ"
            className="max-w-[250px]"
            selectedKeys={apartmentChosen ? [apartmentChosen] : []}
            isLoading={isFetching}
            disallowEmptySelection
            scrollRef={scrollerRef}
            onOpenChange={setIsOpen}
            classNames={{
              selectorIcon: 'text-gray',
              value:
                'text-gray uppercase font-semibold text-lg group-data-[has-value=true]:text-gray',
              trigger:
                'data-[hover=true]:bg-white group-data-[focused=true]:bg-white bg-white',
            }}
            onChange={e => {
              setApartmentChosen(e.target.value);
              setCurrentPage(1);
            }}
          >
            {apartments ? (
              apartments?.pages?.map(page =>
                page?.data?.items?.map((item: Apartment) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                )),
              )
            ) : (
              <SelectItem key={''}></SelectItem>
            )}
          </Select>
          <p className="font-bold text-gray text-lg">
            Tháng {getCurrentMonth()}
          </p>
        </div>
        {apartmentChosen && (
          <div className="mt-2 space-y-5 pl-4">
            <div className="flex gap-2 items-center ">
              <div>{CommonSvg.address()}</div>
              <p className="text-black font-semibold text-sm ">
                {apartment?.address}
              </p>
            </div>
            <div className="flex items-end">
              <div
                className={cn(
                  'flex items-center justify-center p-2 border-1 cursor-pointer',
                  !flag && 'bg-gray pointer-events-none',
                )}
                onClick={() => setFlag(!flag)}
              >
                <p className={!flag ? classNameChosen : classNameNotChosen}>
                  Danh sách hóa đơn
                </p>
              </div>
              <div
                className={cn(
                  'flex items-center justify-center p-2 border-1 cursor-pointer',
                  !!flag && 'bg-gray pointer-events-none',
                )}
                onClick={() => setFlag(!flag)}
              >
                <p className={!flag ? classNameNotChosen : classNameChosen}>
                  Danh sách biểu mẫu
                </p>
              </div>
            </div>

            <div>
              {!flag ? (
                <ListBill
                  search={searchValue}
                  setSearch={setSearchValue}
                  searchField="name"
                  apartmentId={Number(apartmentChosen)}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FormsPage;

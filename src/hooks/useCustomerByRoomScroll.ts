import { useApiAxios } from '@/components/providers/ApiProvider';
import { KEY_CONTEXT, queryKey } from '@/lib/constant';
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useCustomer } from './useCustomer';
import { useDebounce } from './useDebounce';

export const useCustomerByRoomScroll = ({ roomId }) => {
  const [customerChosen, setCustomerChosen] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { getCustomersByRoom } = useCustomer();
  const { debounceValue } = useDebounce(searchValue, 500);
  const userId = JSON.parse(localStorage.getItem(KEY_CONTEXT.USER) || '{}')?.id;

  const {
    data: customers,
    fetchNextPage,
    hasNextPage,
    refetch: refetchData,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [
      queryKey.CUSTOMERS_SELECT,
      { currentPage, limit: 10, debounceValue, roomId, userId },
    ],
    ({ pageParam = 0 }) =>
      getCustomersByRoom({
        page: pageParam,
        limit: 10,
        search: debounceValue,
        searchField: 'name',
        roomId,
      }),
    {
      staleTime: 1000 * 60 * 1,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, pages) => {
        if (
          lastPage?.data.currentPage === 1 &&
          pages.length < lastPage?.data.totalPages
        )
          return 2;
        if (pages.length < lastPage?.data.totalPages) return pages.length;
        else return undefined;
      },
    },
  );
  const [isScrollOpen, setIsScrollOpen] = useState(false);
  const [flag, setFlag] = useState(false);
  const [, scrollerRef] = useInfiniteScroll({
    isEnabled: isScrollOpen,
    hasMore: hasNextPage,
    shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
    onLoadMore: () => {
      fetchNextPage();
    },
  });

  return {
    customerChosen,
    setCustomerChosen,
    searchValue,
    setSearchValue,
    currentPage,
    setCurrentPage,
    loading,
    setLoading,
    customers,
    fetchNextPage,
    hasNextPage,
    refetchData,
    isFetching,
    isFetchingNextPage,
    isScrollOpen,
    setIsScrollOpen,
    flag,
    setFlag,
    scrollerRef,
  };
};

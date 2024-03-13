import { KEY_CONTEXT, queryKey } from '@/lib/constant';
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useEmployee } from './useEmployee';

export const useEmployeeScroll = () => {
  const [employeesChosen, setEmployeeChosen] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { getEmployees } = useEmployee();
  const userId = JSON.parse(localStorage.getItem(KEY_CONTEXT.USER) || '{}')?.id;

  const {
    data: employees,
    fetchNextPage,
    hasNextPage,
    refetch: refetchData,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [queryKey.EMPLOYEES, { currentPage, limit: 10, userId }],
    ({ pageParam = 0 }) =>
      getEmployees({
        page: pageParam + 1,
        limit: 10,
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
    employeesChosen,
    setEmployeeChosen,
    currentPage,
    setCurrentPage,
    loading,
    setLoading,
    employees,
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

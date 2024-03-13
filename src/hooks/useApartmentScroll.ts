import { useApiAxios } from '@/components/providers/ApiProvider';
import { KEY_CONTEXT, queryKey } from '@/lib/constant';
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useApartment } from './useApartment';

export const useApartmentScroll = () => {
  const [apartmentChosen, setApartmentChosen] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { getApartments } = useApartment();
  const { requestApi } = useApiAxios();
  const [rooms, setRooms] = useState([]);
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
  const getRooms = async ({
    apartmentId,
    search = '',
    searchField = 'name',
  }) => {
    try {
      const res = await requestApi({
        endPoint: `/room/apartment/${apartmentId}?search=${search}&searchField=${searchField}`,
        method: 'GET',
      });
      return res;
    } catch (error) {
      console.log('🚀 ~ getRooms ~ error:', error);
    }
  };
  const handleGetRooms = async () => {
    setLoading(true);
    const res = await getRooms({
      apartmentId: Number(apartmentChosen),
      search: searchValue,
    });
    setRooms(res?.data?.rooms);
    setLoading(false);
  };
  useEffect(() => {
    if (Number(apartmentChosen)) {
      handleGetRooms();
    }
  }, [apartmentChosen]);

  return {
    apartmentChosen,
    setApartmentChosen,
    searchValue,
    setSearchValue,
    currentPage,
    setCurrentPage,
    loading,
    setLoading,
    apartments,
    fetchNextPage,
    hasNextPage,
    refetchData,
    isFetching,
    isFetchingNextPage,
    isScrollOpen,
    setIsScrollOpen,
    getRooms,
    flag,
    setFlag,
    scrollerRef,
    rooms,
  };
};

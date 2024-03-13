import { useApiAxios } from '@/components/providers/ApiProvider';
import { CreateApartmentProps } from '@/lib/interface';
import { RETURNED_MESSAGES } from '@/lib/translate';
import { GetQueryParamsProps, getQueryParams } from '@/lib/utils';
import toast from 'react-hot-toast';

export const useApartment = () => {
  const { requestApi } = useApiAxios();
  const createApartment = async (
    data: CreateApartmentProps,
    resetState: () => void,
    onClose: () => void,
  ) => {
    try {
      const res = await requestApi({
        endPoint: '/apartment/create',
        method: 'POST',
        body: data,
      });
      if (res?.message == RETURNED_MESSAGES.APARTMENT.APARTMENT_CREATED.ENG) {
        toast.success(RETURNED_MESSAGES.APARTMENT.APARTMENT_CREATED.VIE);
        resetState();
        onClose();
      } else if (
        res?.message == RETURNED_MESSAGES.APARTMENT.APARTMENT_EXISTED.ENG
      ) {
        toast.error(RETURNED_MESSAGES.APARTMENT.APARTMENT_EXISTED.VIE);
      }
      return res;
    } catch (error) {
      console.log('🚀 ~ createApartment ~ error:', error);
    }
  };

  // const getApartments = async ({ searchField = '', search = '' }) => {
  //   try {
  //     const res = await requestApi({
  //       endPoint: `/apartment/all?searchField=${searchField}&search=${search}`,
  //       method: 'GET'
  //     })
  //     return res
  //   } catch (error) {
  //     console.log('🚀 ~ getApartment ~ error:', error)
  //   }
  // }
  const getApartments = async ({
    searchField = null,
    search = null,
    page,
    limit = 10,
    sortBy = 'createdAt',
    sortDirection = 'asc',
  }: GetQueryParamsProps) => {
    try {
      const res = await requestApi({
        endPoint: `/apartment/all?${getQueryParams({
          searchField,
          search,
          page,
          limit,
          sortBy,
          sortDirection,
        })}`,
        method: 'GET',
      });
      return res;
    } catch (error) {
      console.log('🚀 ~ getApartments ~ error:', error);
    }
  };

  const updateApartment = async (
    data: CreateApartmentProps,
    refetch: () => void,
  ) => {
    try {
      const res = await requestApi({
        endPoint: '/apartment/info/update',
        method: 'PUT',
        body: data,
      });
      if (res?.message == RETURNED_MESSAGES.APARTMENT.APARTMENT_UPDATED.ENG) {
        toast.success(RETURNED_MESSAGES.APARTMENT.APARTMENT_UPDATED.VIE);
        refetch();
      } else if (
        res?.message == RETURNED_MESSAGES.APARTMENT.APARTMENT_EXISTED.ENG
      ) {
        toast.error(RETURNED_MESSAGES.APARTMENT.APARTMENT_EXISTED.VIE);
      }
      return res;
    } catch (error) {
      console.log('🚀 ~ createApartment ~ error:', error);
    }
  };
  const deleteApartment = async (apartmentId: number, refetch: () => void) => {
    try {
      const res = await requestApi({
        endPoint: `/apartment/${apartmentId}`,
        method: 'DELETE',
      });
      if (res?.message == RETURNED_MESSAGES.APARTMENT.APARTMENT_DELETED.ENG) {
        toast.success(RETURNED_MESSAGES.APARTMENT.APARTMENT_DELETED.VIE);
        refetch();
      } else if (
        res?.message == RETURNED_MESSAGES.APARTMENT.APARTMENT_NOT_FOUND.ENG
      ) {
        toast.error(RETURNED_MESSAGES.APARTMENT.APARTMENT_NOT_FOUND.VIE);
      }
      return res;
    } catch (error) {
      console.log('🚀 ~ createApartment ~ error:', error);
    }
  };
  return { createApartment, getApartments, updateApartment, deleteApartment };
};

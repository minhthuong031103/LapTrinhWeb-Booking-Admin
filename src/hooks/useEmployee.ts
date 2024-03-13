import { useApiAxios } from '@/components/providers/ApiProvider';
import { CreateEmployeeProps, EmployeeProps } from '@/lib/interface';
import { RETURNED_MESSAGES } from '@/lib/translate';
import { GetQueryParamsProps, getQueryParams } from '@/lib/utils';

import toast from 'react-hot-toast';

export const useEmployee = () => {
  const { requestApi } = useApiAxios();

  const createEmployee = async (
    data: CreateEmployeeProps,
    onClose: () => void,
  ) => {
    try {
      const res = await requestApi({
        endPoint: '/user/create',
        method: 'POST',
        body: data,
      });
      if (res?.message == RETURNED_MESSAGES.AUTH.USER_CREATED.ENG) {
        toast.success(RETURNED_MESSAGES.AUTH.USER_CREATED.VIE);
        onClose();
      } else if (res?.message == RETURNED_MESSAGES.AUTH.USER_EXISTED.ENG) {
        toast.error(RETURNED_MESSAGES.AUTH.USER_EXISTED.VIE);
      }
      return res;
    } catch (error) {
      console.log('🚀 ~ createUser ~ error:', error);
    }
  };

  const getEmployees = async ({
    page,
    limit = 10,
    sortBy = 'createdAt',
    sortDirection = 'asc',
  }: GetQueryParamsProps) => {
    try {
      const res = await requestApi({
        endPoint: `/user/all?${getQueryParams({
          page,
          limit,
          sortBy,
          sortDirection,
        })}`,
        method: 'GET',
      });
      return res;
    } catch (error) {
      console.log('🚀 ~ getEmployees ~ error:', error);
    }
  };

  const updateEmployee = async (data: EmployeeProps, onClose: () => void) => {
    try {
      const res = await requestApi({
        endPoint: '/user/update',
        method: 'PUT',
        body: data,
      });
      if (res?.message == RETURNED_MESSAGES.AUTH.USER_UPDATED.ENG) {
        toast.success(RETURNED_MESSAGES.AUTH.USER_UPDATED.VIE);
        onClose();
      } else if (res?.message == RETURNED_MESSAGES.AUTH.USER_EXISTED.ENG) {
        toast.error(RETURNED_MESSAGES.AUTH.USER_EXISTED.VIE);
      }
      return res;
    } catch (error) {
      console.log('🚀 ~ updateEmployee ~ error:', error);
    }
  };
  const updatePassword = async (data: any, onClose: () => void) => {
    try {
      const res = await requestApi({
        endPoint: '/user/change-password',
        method: 'PUT',
        body: data,
      });
      if (res?.message == RETURNED_MESSAGES.AUTH.USER_UPDATED.ENG) {
        toast.success(RETURNED_MESSAGES.AUTH.USER_UPDATED.VIE);
        onClose();
      } else if (res?.message == RETURNED_MESSAGES.AUTH.USER_EXISTED.ENG) {
        toast.error(RETURNED_MESSAGES.AUTH.USER_EXISTED.VIE);
      }
      return res;
    } catch (error) {
      console.log('🚀 ~ changePassword ~ error:', error);
    }
  };

  const deleteEmployee = async ({ data, refetch }) => {
    try {
      const res = await requestApi({
        endPoint: `/user/delete/${data.id}`,
        method: 'DELETE',
      });
      if (res?.message == RETURNED_MESSAGES.AUTH.USER_DELETED.ENG) {
        toast.success(RETURNED_MESSAGES.AUTH.USER_DELETED.VIE);
        refetch();
      } else if (res?.message == RETURNED_MESSAGES.AUTH.NOT_FOUND_USER.ENG) {
        toast.error(RETURNED_MESSAGES.AUTH.NOT_FOUND_USER.VIE);
      } else {
        toast.error('Xóa phòng thất bại');
      }
    } catch (error) {
      toast.error('Xóa phòng thất bại');
    }
  };
  return {
    getEmployees,
    updateEmployee,
    createEmployee,
    updatePassword,
    deleteEmployee,
  };
};

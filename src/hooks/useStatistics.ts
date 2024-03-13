import { useApiAxios } from '@/components/providers/ApiProvider';
import { RETURNED_MESSAGES } from '@/lib/translate';
import { GetQueryParamsProps, getQueryParams } from '@/lib/utils';

import toast from 'react-hot-toast';

interface createBillProps {
  data: {
    userName: string;
    paymentType: string;
    paymentAmount: number;
    apartmentId: number;
    roomId: number;
    payDay: Date;
  };
  refetch: () => void;
}

export interface BillProps {
  id: number;
  userName: string;
  paymentType: string;
  paymentAmount: number;
  apartmentId: number;
  roomId: number;
  payDay: Date;
}

interface updateBillProps {
  data: BillProps;
  refetch: () => void;
}
export const useStatistics = () => {
  const { requestApi } = useApiAxios();

  const getAllBill = async ({
    page,
    limit = 10,
    sortBy = 'createdAt',
    sortDirection = 'asc',
  }: GetQueryParamsProps) => {
    try {
      const res = await requestApi({
        endPoint: `/bill/all?${getQueryParams({
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
  const createPay = async ({ data, refetch }: createBillProps) => {
    try {
      const res = await requestApi({
        endPoint: `/payment/create`,
        method: 'POST',
        body: data,
      });
      if (res?.message == RETURNED_MESSAGES.PAYMENT.PAYMENT_CREATED.ENG) {
        toast.success(RETURNED_MESSAGES.PAYMENT.PAYMENT_CREATED.VIE);
        refetch();
      } else {
        toast.error('Tạo phiếu chi thất bại');
      }
    } catch (error) {
      toast.error('Tạo phiếu chi thất bại');
    }
  };
  const editPay = async ({ data, refetch }: updateBillProps) => {
    try {
      const res = await requestApi({
        endPoint: `/payment/update`,
        method: 'PUT',
        body: data,
      });
      refetch();
      if (res?.message == RETURNED_MESSAGES.PAYMENT.PAYMENT_UPDATED.ENG) {
        toast.success(RETURNED_MESSAGES.PAYMENT.PAYMENT_UPDATED.VIE);
        refetch();
      } else {
        toast.error('Cập nhật phiếu chi thất bại');
      }
      return res;
    } catch (error) {
      console.log('🚀 ~ createBill ~ error:', error);
    }
  };
  const deletePay = async ({ paymentId, refetch }) => {
    try {
      const res = await requestApi({
        endPoint: `/payment/delete/${paymentId}`,
        method: 'DELETE',
      });
      if (res?.message == RETURNED_MESSAGES.PAYMENT.PAYMENT_DELETED.ENG) {
        toast.success(RETURNED_MESSAGES.PAYMENT.PAYMENT_DELETED.VIE);
        refetch();
      } else {
        toast.error('Xóa phiếu chi thất bại');
      }

      return res;
    } catch (error) {
      console.log('🚀 ~ createBill ~ error:', error);
    }
  };
  const getAllPay = async ({
    page,
    limit = 10,
    sortBy = 'createdAt',
    sortDirection = 'asc',
  }: GetQueryParamsProps) => {
    try {
      const res = await requestApi({
        endPoint: `/payment/all?${getQueryParams({
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

  const getDataPieChart = async ({ data }) => {
    try {
      const res = await requestApi({
        endPoint: `/chart/revenue-and-payment/month`,
        method: 'POST',
        body: data,
      });
      return res;
    } catch (error) {
      console.log('🚀 ~ getData ~ error:', error);
    }
  };
  const getDataBarChart = async ({ data }) => {
    try {
      const res = await requestApi({
        endPoint: `/chart/revenue-and-payment/year`,
        method: 'POST',
        body: data,
      });
      return res;
    } catch (error) {
      console.log('🚀 ~ getData ~ error:', error);
    }
  };
  return {
    getAllBill,
    createPay,
    editPay,
    deletePay,
    getAllPay,
    getDataPieChart,
    getDataBarChart,
  };
};

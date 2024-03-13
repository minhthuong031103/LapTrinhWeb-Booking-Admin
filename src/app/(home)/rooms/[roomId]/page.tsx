'use client';
import CustomerList from '@/components/rooms/CustomerList';
import RoomInfo from '@/components/rooms/RoomInfo';
import RoomSetting from '@/components/rooms/RoomSetting';
import { useModal } from '@/hooks/useModalStore';
import { useRoom } from '@/hooks/useRoom';
import { KEY_CONTEXT, queryKey } from '@/lib/constant';
import { cn } from '@/lib/utils';
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Divider,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const RoomDetailPage = () => {
  const { roomId } = useParams();
  const classNameChosen = 'font-semibold text-sm text-white';
  const classNameNotChosen = 'font-medium text-sm text-black';
  const [flag, setFlag] = useState('finance');
  const { onOpen } = useModal();

  const render = [
    {
      name: 'Tài chính phòng',
      key: 'finance',
    },
    {
      name: 'Danh sách khách thuê',
      key: 'customerList',
    },
    {
      name: 'Cấu hình phòng',
      key: 'setting',
    },
  ];
  const buttonRender = [
    {
      content: 'Hợp đồng',
      action: () => {
        onOpen('contractRoom', {}, refetch);
      },
    },
    {
      content: 'Xóa hợp đồng',
      action: () => {
        onOpen('deleteContract', roomDetail, refetch);
      },
    },
    {
      content: 'Xuất phiếu',
      action: () => {
        onOpen('exportBill', { roomId: Number(roomId) }, refetch);
      },
    },
    {
      content: 'Đổi phòng',
      action: () => {
        onOpen('createRoom', {
          numberFloor: 5,
          apartmentId: 1,
        });
      },
    },
  ];
  const { getDetailRoom, dispatch, getContract, handleSetContract } = useRoom();
  useEffect(() => {
    const handleGetContract = async () => {
      const res = await getContract({ roomId });
      if (res?.data) {
        handleSetContract('note', res?.data?.note);
        handleSetContract(
          'defaultElectric',
          res?.data?.defaultElectric.toString(),
        );
        handleSetContract(
          'daySignContract',
          new Date(res?.data?.daySignContract),
        );
        handleSetContract(
          'dayEndContract',
          new Date(res?.data?.dayEndContract),
        );
        handleSetContract('customerId', res?.data?.customer?.id);
        handleSetContract('clientPNumber', res?.data?.customer?.phone);
        handleSetContract('clientName', res?.data?.customer?.name);
      }
    };
    if (roomId) {
      handleGetContract();
    }
  }, [roomId]);
  const userId = JSON.parse(localStorage.getItem(KEY_CONTEXT.USER) || '{}')?.id;

  const {
    data: roomDetail,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [queryKey.ROOMDETAILS, { roomId, userId }],
    queryFn: async () => {
      const res = await getDetailRoom({
        roomId: roomId,
      });
      if (res?.data && res?.data?.startDate && res?.data?.endDate) {
        const endDate = new Date(res?.data?.endDate);
        const startDate = new Date(res?.data?.startDate);
        const dayStayed = Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24),
        );
        if (
          endDate.getMonth() === new Date().getMonth() &&
          endDate.getFullYear() === new Date().getFullYear() &&
          startDate.getMonth() === new Date().getMonth() &&
          startDate.getFullYear() === new Date().getFullYear()
        ) {
          dispatch({
            type: 'SET_VALUES',
            payload: { ...res?.data, endDate: endDate, startDate: startDate },
          });
        } else {
          dispatch({
            type: 'SET_VALUES',
            payload: {
              ...res?.data,
              startDate: new Date(new Date().setDate(1)),
              endDate: new Date(),
              dayStayed: dayStayed,
            },
          });
        }
      }
      return res?.data;
    },
  });
  return (
    <div className="pt-2 space-y-4">
      <Breadcrumbs>
        <BreadcrumbItem href="/rooms">Danh sách phòng</BreadcrumbItem>
        <BreadcrumbItem>{roomDetail?.name}</BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex items-end pt-3">
        {render?.map(item => (
          <div
            key={item.key}
            className={cn(
              'flex items-center justify-center p-2 border-1 cursor-pointer',
              flag === item.key && 'bg-gray pointer-events-none',
            )}
            onClick={() => setFlag(item.key)}
          >
            <p
              className={
                flag === item.key ? classNameChosen : classNameNotChosen
              }
            >
              {item.name}
            </p>
          </div>
        ))}
        <div className="ml-auto gap-3 flex">
          {buttonRender?.map(item => (
            <div key={item.content}>
              <Button
                className="rounded-[8px] px-4 py-2 bg-blueButton"
                onPress={item.action}
              >
                <div className="flex flex-row items-center gap-x-[8px] ">
                  <div className="text-white mt-[1px] font-medium">
                    {item.content}
                  </div>
                </div>
              </Button>
            </div>
          ))}
        </div>
      </div>
      <Divider className="mt-8" />

      <div>
        {flag === 'finance' ? (
          <RoomInfo roomId={roomId} refetch={refetch} isLoading={isLoading} />
        ) : flag === 'customerList' ? (
          <CustomerList roomId={roomId} />
        ) : (
          <RoomSetting />
        )}
      </div>
    </div>
  );
};

export default RoomDetailPage;

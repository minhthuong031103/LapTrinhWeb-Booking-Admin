'use client';
import { CommonSvg } from '@/assets/CommonSvg';
import ApartmentCard from './apartment-card';
import { Button } from '@nextui-org/react';
import { useModal } from '@/hooks/useModalStore';
import { Apartment } from '@/types';

interface ListApartmentProps {
  apartments: Apartment[];
  onAction?: () => void;
}

const ListApartment = ({ apartments, onAction }: ListApartmentProps) => {
  const { onOpen } = useModal();
  return (
    <>
      <div className="flex items-end justify-between">
        <p className="font-semibold font-lg text-gray">Danh sách căn hộ</p>
        <Button
          onPress={() => onOpen('createApartment', {}, onAction)}
          className="rounded-[8px] px-4 py-2 bg-blueButton"
        >
          <div className="flex flex-row items-center gap-x-[8px] ">
            <div>{CommonSvg.plus()}</div>
            <div className="text-white mt-[1px] font-medium">Thêm mới</div>
          </div>
        </Button>
      </div>
      <div className="w-full h-full mt-4 grid gap-5 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        {apartments?.map((apartment, index) => (
          <div key={index}>
            <ApartmentCard apartment={apartment} refresh={onAction} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ListApartment;

'use client';
import { useApartmentScroll } from '@/hooks/useApartmentScroll';
import { useModal } from '@/hooks/useModalStore';
import { Apartment, Room } from '@/types';
import { Modal } from '@mantine/core';
import { Button, Select, SelectItem, Spinner } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { DatePicker } from '../ui/date-picker';
import { payTypes } from '@/lib/constant';
import { useEmployeeScroll } from '@/hooks/useEmployeeScroll';
import { EmployeeProps } from '@/lib/interface';
import { CustomInput } from '@/app/(home)/(components)/home/custom-input';
import {
  checkValueNumberInput,
  insertSpaceEveryThreeCharacters,
} from '@/lib/utils';
import { useStatistics } from '@/hooks/useStatistics';

const AddPayModal = () => {
  const { isOpen, onClose, type, onAction, data } = useModal();
  const [payType, setPayType] = useState('');
  const [payDay, setPayDay] = useState(new Date());
  const [payMoney, setPayMoney] = useState('');
  const [roomId, setRoomId] = useState('');
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    if (data) {
      setPayType(data?.paymentType);
      setPayDay(
        new Date(data?.payDayDefault ? data?.payDayDefault : new Date()),
      );
      setPayMoney(data?.payMoney?.toString());
      setEmployeeChosen(data?.userName);
      setApartmentChosen(data?.apartmentId?.toString());
    }
  }, [data]);
  const resetState = () => {
    setPayType('');
    setPayDay(new Date());
    setPayMoney('');
    setRoomId('');
    setApartmentChosen('');
    setEmployeeChosen('');
    setFlag(true);
    onClose();
    onAction();
  };
  const isModalOpen = isOpen && type === 'editPay';
  const { editPay } = useStatistics();
  const handleEditPay = async () => {
    if (
      payType &&
      payMoney &&
      payDay &&
      employeesChosen &&
      apartmentChosen &&
      roomId
    ) {
      await editPay({
        data: {
          id: Number(data?.id),
          userName: employeesChosen,
          paymentType: payType,
          paymentAmount: Number(payMoney),
          apartmentId: Number(apartmentChosen),
          roomId: Number(roomId),
          payDay: new Date(payDay),
        },
        refetch: resetState,
      });
    } else {
      toast.error('Vui lòng nhập đủ thông tin');
    }
    // resetCustomerState()
  };

  const {
    apartmentChosen,
    setApartmentChosen,
    setCurrentPage,
    apartments,
    isFetching,
    setIsScrollOpen,
    scrollerRef,
    rooms,
  } = useApartmentScroll();

  const {
    employees,
    employeesChosen,
    setEmployeeChosen,
    setCurrentPage: setCurrentPageEmployee,
    isFetching: isFetchingEmployee,
    setIsScrollOpen: setIsScrollOpenEmployee,
    scrollerRef: scrollerRefEmployee,
  } = useEmployeeScroll();
  useEffect(() => {
    if (flag && apartmentChosen) {
      setRoomId(data?.roomId?.toString());
      setFlag(false);
    }
  }, [flag, apartmentChosen]);
  return (
    <Modal
      closeOnClickOutside={false}
      centered
      title="Cập nhật phiếu chi"
      classNames={{
        header: 'flex justify-center items-center relative',
        title: 'font-bold text-gray uppercase font-bold text-xl',
        close: 'm-0 absolute right-3 top-3',
      }}
      opened={isModalOpen}
      onClose={onClose}
      size="xl"
      className=""
      radius={15}
      removeScrollProps={{ allowPinchZoom: true }}
    >
      <div className="flex flex-col gap-y-[20px]">
        <div className="flex gap-[20px] w-full items-end">
          <div className="w-[33%]">
            <Select
              label="Loại chi"
              labelPlacement="outside"
              isRequired={true}
              placeholder="Chọn loại chi"
              className="max-w-[100%] "
              disallowEmptySelection
              selectedKeys={payType ? [payType] : []}
              onChange={e => {
                setPayType(e.target.value);
              }}
            >
              {payTypes?.map((item: any) => {
                return (
                  <SelectItem key={item.value} value={item.value}>
                    {item.value}
                  </SelectItem>
                );
              })}
            </Select>
          </div>
          <div className="w-[33%]">
            <Select
              labelPlacement="outside"
              label="Nhân viên chi"
              isRequired={true}
              placeholder="Chọn nhân viên"
              className="max-w-[100%]"
              selectedKeys={employeesChosen ? [employeesChosen] : []}
              isLoading={isFetchingEmployee}
              disallowEmptySelection
              scrollRef={scrollerRefEmployee}
              onOpenChange={setIsScrollOpenEmployee}
              onChange={e => {
                setEmployeeChosen(e.target.value);
                setCurrentPageEmployee(1);
              }}
            >
              {employees ? (
                employees?.pages?.map(page =>
                  page?.data?.items?.map((item: EmployeeProps) => (
                    <SelectItem key={item.name} value={item.name}>
                      {item.name}
                    </SelectItem>
                  )),
                )
              ) : (
                <SelectItem key={''}></SelectItem>
              )}
            </Select>
          </div>
          <div className="w-[33%]">
            <DatePicker
              label="Ngày chi"
              date={payDay}
              labelCustom="font-medium text-sm text-black"
              setDate={value => setPayDay(value)}
            />
          </div>
        </div>
        <div className="flex gap-[20px] w-full items-end">
          <div className="w-[50%] ">
            <Select
              labelPlacement="outside"
              label="Căn hộ"
              isRequired={true}
              placeholder="Chọn căn hộ"
              className="max-w-[100%]"
              selectedKeys={apartmentChosen ? [apartmentChosen] : []}
              isLoading={isFetching}
              disallowEmptySelection
              scrollRef={scrollerRef}
              onOpenChange={setIsScrollOpen}
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
          </div>
          <div className="w-[50%] z-[100]">
            <Select
              label="Phòng"
              labelPlacement="outside"
              isRequired={true}
              placeholder="Chọn phòng"
              className="max-w-[100%] "
              disallowEmptySelection
              isLoading={flag}
              isDisabled={!apartmentChosen?.length}
              selectedKeys={roomId ? [roomId] : []}
              onChange={e => {
                setRoomId(e.target.value);
              }}
            >
              {rooms?.map((item: any) => {
                return item?.rooms?.map((room: Room) => {
                  return (
                    <SelectItem key={room.id} value={room.id}>
                      {room.name}
                    </SelectItem>
                  );
                });
              })}
            </Select>
          </div>
        </div>
        <div className="flex w-full items-end">
          <CustomInput
            label="Tiền chi"
            type="text"
            placeholder="Nhập số tiền chi"
            isRequired
            value={insertSpaceEveryThreeCharacters(payMoney)}
            setValue={value => {
              value = value.split(' ').join('');
              checkValueNumberInput('payMoney', value) && setPayMoney(value);
            }}
          />
        </div>
        <div className="flex w-full flex-row justify-end mt-[60px]">
          <Button
            className="rounded-[8px] w-[133px] px-4 py-2 bg-blueButton text-white font-semibold text-sm"
            onPress={handleEditPay}
          >
            Lưu
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddPayModal;

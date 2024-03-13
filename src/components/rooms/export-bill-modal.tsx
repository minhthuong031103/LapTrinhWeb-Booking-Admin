'use client';

import { CustomInput } from '@/app/(home)/(components)/home/custom-input';
import { useModal } from '@/hooks/useModalStore';
import { useRoom } from '@/hooks/useRoom';
import {
  convertPrice,
  formatDateCustom,
  getDaysAmountInMonth,
  insertSpaceEveryThreeCharacters,
} from '@/lib/utils';
import { Modal } from '@mantine/core';
import { Button, Divider, Spinner } from '@nextui-org/react';
import { BlobProvider } from '@react-pdf/renderer';
import Invoice from '../invoice/invoice';
import { saveAs } from 'file-saver';
import { useState } from 'react';
import { Textarea } from '../ui/text-area';
import { KEY_CONTEXT } from '@/lib/constant';
const ExportBillModal = () => {
  const { isOpen, onClose, type, data, onAction } = useModal();
  const { roomId } = data;
  const { state, exportBill, contractState, updateRoomStates } = useRoom();
  const [isLoading, setIsLoading] = useState(false);
  const isModalOpen = isOpen && type === 'exportBill';
  const handleExportBill = async blob => {
    setIsLoading(true);
    const data = {
      fileName: state.name,
      apartmentId: state.apartmentId,
      roomId: roomId,
      customerId: '1',
      endDate: state.endDate,
      roomPrice: Math.floor(
        (Number(state.roomPrice) * Number(state.dayStayed)) /
          getDaysAmountInMonth(
            new Date().getMonth() + 1,
            new Date().getFullYear(),
          ),
      ),
      totalElectricPrice: state.totalElectricPrice,
      totalWaterPrice: state.totalWaterPrice,
      totalElevatorPrice: state.totalElevatorPrice,
      totalParkingPrice: state.totalParkingPrice,
      internetPrice: state.internetPrice,
      servicePrice: state.servicePrice,
      otherPrice: state.otherPrice,
      totalSurcharge:
        Number(state.peopleRealStayed) - 4 > 0
          ? (Number(state.peopleRealStayed) - 4) * Number(state.surcharge)
          : 0,
      suspenseMoney: state.suspenseMoney,
      newDebt: state.newDebt,
      oldDebt: state.oldDebt,
      newElectric: state.newElectric,
      oldElectric: state.oldElectric,
      userName: JSON?.parse(localStorage.getItem(KEY_CONTEXT.USER) as any)
        ?.name,
      files: [blob],
      note: state.note,
    };
    // await updateRoomStates({ roomId, refetch: () => {} });
    await exportBill(data, onAction, () => {
      saveAs(
        blob,
        `${state.name} T${
          new Date().getMonth() + 1
        }/${new Date().getFullYear()}.pdf`,
      );
    });
    setIsLoading(false);

    onClose();
  };

  const renderInput = (
    label,
    value,
    placeholder,
    inputType,
    disabled = false,
  ) => {
    if (label !== 'Điện tiêu thụ') {
      // value = insertSpaceEveryThreeCharacters(value);
      value = insertSpaceEveryThreeCharacters(value);
    }
    return (
      <div className="w-[31%]" key={label}>
        <CustomInput
          label={label}
          value={value}
          placeholder={placeholder}
          type={inputType}
          isRequired={false}
          readonly={true}
          setValue={() => {}}
          disabled={disabled}
        />
      </div>
    );
  };
  const renderNumberInput = (label, value, placeholder, disabled = false) =>
    renderInput(label, value, placeholder, 'text', disabled);

  const renderInputRow = inputs => (
    <div className="w-full flex items-center gap-5">{inputs}</div>
  );

  const userInfo = JSON.parse(localStorage.getItem(KEY_CONTEXT.USER) as any);
  return (
    <Modal
      closeOnClickOutside={false}
      radius={15}
      size={'auto'}
      title="Xuất phiếu thu"
      classNames={{
        header: 'flex justify-center items-center relative',
        title: 'font-bold text-gray uppercase font-bold text-xl',
        close: 'm-0 absolute right-3 top-3',
      }}
      removeScrollProps={{ allowPinchZoom: true }}
      opened={isModalOpen}
      centered
      onClose={onClose}
    >
      <>
        <div className="space-y-2">
          <p className="text-gray font-semibold text-lg">Tiền phòng</p>
          {renderInputRow([
            renderNumberInput('Tiền phòng', state.roomPrice, 'Tiền phòng'),
            renderNumberInput('Tiền cọc', state.depositPrice, 'Tiền Cọc'),
            renderNumberInput(
              'Số ngày ở trong tháng',
              state.dayStayed,
              'Số ngày ở trong tháng',
            ),
          ])}
          {renderInputRow([
            renderNumberInput('Tiền nợ cũ', state.oldDebt, 'Tiền nợ cũ'),
            renderNumberInput('Tiền nợ mới', state.newDebt, 'Tiền nợ mới'),
            renderNumberInput(
              'Tổng tiền phụ thu',
              Number(state.peopleRealStayed) - 4 > 0
                ? (Number(state.peopleRealStayed) - 4) * Number(state.surcharge)
                : 0,
              'Tổng tiền phụ thu',
            ),
          ])}
          <p className="text-gray font-semibold text-lg">Tiền dịch vụ</p>

          {renderInputRow([
            renderNumberInput('Giá điện', state.electricPrice, 'Nhập giá điện'),
            renderNumberInput(
              'Điện tiêu thụ',
              Number(state.oldElectric) >= Number(state.newElectric)
                ? 0
                : Math.floor(
                    (Number(state.newElectric) - Number(state.oldElectric)) *
                      10,
                  ) / 10,

              'Điện tiêu thụ',
            ),
            renderNumberInput(
              'Tổng tiền điện',
              state.totalElectricPrice,
              'Tổng tiền điện',
            ),
          ])}
          {renderInputRow([
            renderNumberInput(
              'Tổng tiền nước',
              state.totalWaterPrice,
              'Tổng tiền nước',
            ),
            renderNumberInput(
              'Tiền dịch vụ',
              state.servicePrice,
              'Tiền dịch vụ',
            ),
            renderNumberInput(
              'Chi phí phát sinh khác',
              state.otherPrice,
              'Chi phí phát sinh',
            ),
            renderNumberInput(
              'Tổng tiền giữ xe',
              state.totalParkingPrice,
              'Tổng tiền giữ xe',
            ),
          ])}
          <p className="text-gray font-semibold text-lg">Ghi chú</p>
          <Textarea
            value={state.note}
            placeholder="Trống"
            className="disabled:opacity-100"
            disabled
          />
          <div className="w-full pt-2">
            <Divider className="my-4" />
            <div className="w-full flex justify-between gap-5 px-5">
              <div className="flex gap-5">
                <p className="font-bold text-black text-lg">TẠM THU</p>
                <p className="text-xl font-bold text-room-red">
                  {convertPrice(state.suspenseMoney)}
                </p>
              </div>
              <div className="flex gap-5">
                <p className="font-bold text-black text-lg">TỔNG TIỀN</p>
                <p className="text-xl font-bold text-room-red">
                  {convertPrice(state.netProceeds)}
                </p>
              </div>
            </div>
            <Divider className="mt-4" />
          </div>
        </div>
        <div className="mt-5 flex justify-end py-4">
          <BlobProvider
            document={
              <Invoice
                data={{
                  ...state,
                  startDate: formatDateCustom(state.startDate),
                  endDate: formatDateCustom(state.endDate),
                  bank: userInfo?.bank,
                  bankNumber: userInfo?.bankNumber,
                  bankName: userInfo?.name,
                  clientName: contractState?.clientName,
                  clientPNumber: contractState?.clientPNumber,
                  daySigned: formatDateCustom(contractState?.daySignContract),
                }}
              />
            }
          >
            {({ blob }) => (
              <Button
                className="rounded-[8px] w-[133px] px-4 py-2 bg-room-green text-white font-semibold text-sm"
                onPress={() => handleExportBill(blob)}
              >
                {isLoading ? <Spinner color="white" size="sm" /> : 'Xác nhận'}
              </Button>
            )}
          </BlobProvider>
        </div>
      </>
    </Modal>
  );
};

export default ExportBillModal;

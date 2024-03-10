/* eslint-disable no-unsafe-optional-chaining */
'use client';
import { Button, Spinner } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { GoDownload } from 'react-icons/go';

interface ExportExcelProps {
  data: [pages: any, rooms: any];
  fileName: string;
}
const ExportExcel = ({ data, fileName }: ExportExcelProps) => {
  const headers = [
    {
      label: 'Mã phòng',
      key: 'id',
    },
    {
      label: 'Giá phòng',
      key: 'roomPrice',
    },

    {
      label: 'Tiền cọc',
      key: 'depositPrice',
    },
    { label: 'Nợ cũ', key: 'oldDebt' },
    { label: 'Nợ mới', key: 'newDebt' },
    { label: 'Số lượng người ở thực tế', key: 'peopleRealStayed' },
    { label: 'Phụ thu (VND/người)', key: 'surcharge' },
    { label: 'Chỉ số điện lúc bàn giao (KWh)', key: 'defaultElectric' },
    { label: 'Chỉ số điện cũ (KWh)', key: 'oldElectric' },
    { label: 'Giá điện (VND/KWh)', key: 'electricPrice' },
    { label: 'Chỉ số điện mới (KWh)', key: 'newElectric' },
    { label: 'Số lượng người sử dụng dịch vụ', key: 'peopleAmount' },
    { label: 'Tiền nước (VND/người)', key: 'waterPrice' },
    { label: 'Tiền thang máy (VND/người)', key: 'elevatorPrice' },
    { label: 'Chi phí phát sinh', key: 'otherPrice' },
    { label: 'Tiền internet (VND/người)', key: 'internetPrice' },
    { label: 'Tiền dịch vụ (VND/phòng)', key: 'servicePrice' },
    { label: 'Số lượng xe', key: 'vehicleAmount' },
    { label: 'Tiền giữ xe (VND/xe)', key: 'parkingPrice' },
  ];
  const [isLoading, setIsLoading] = useState(true);
  const [exportData, setExportData] = useState([] as any);
  useEffect(() => {
    if (data) {
      setIsLoading(true);
      setExportData(
        [
          ...data?.map(item => {
            return item?.rooms?.map(room => {
              return {
                id: room?.id || '',
                roomPrice: room?.roomPrice || 0,
                depositPrice: room?.depositPrice || 0,
                oldDebt: room?.oldDebt || 0,
                newDebt: room?.newDebt || 0,
                peopleRealStayed: room?.peopleRealStayed || 0,
                surcharge: room?.surcharge || 0,
                defaultElectric: room?.defaultElectric || 0,
                oldElectric: room?.oldElectric || 0,
                electricPrice: room?.electricPrice || 0,
                newElectric: room?.newElectric || 0,
                peopleAmount: room?.peopleAmount || 0,
                waterPrice: room?.waterPrice || 0,
                elevatorPrice: room?.elevatorPrice || 0,
                otherPrice: room?.otherPrice || 0,
                internetPrice: room?.internetPrice || 0,
                servicePrice: room?.servicePrice || 0,
                vehicleAmount: room?.vehicleAmount || 0,
                parkingPrice: room?.parkingPrice || 0,
              };
            });
          }),
        ]
          .flat()
          .sort((a, b) => a.id - b.id),
      );

      setIsLoading(false);
    }
  }, [data]);
  return (
    <CSVLink
      data={exportData}
      filename={fileName.toUpperCase()}
      headers={headers}
    >
      <Button className="rounded-[8px] bg-blueButton ml-4">
        {isLoading ? (
          <Spinner size="sm" color="white" />
        ) : (
          <div className="text-white flex cursor-pointer items-center first-letter:text-sm">
            Xuất Excel
            <GoDownload className="ml-2 h-4 w-4 text-white" />
          </div>
        )}
      </Button>
    </CSVLink>
  );
};

export default ExportExcel;

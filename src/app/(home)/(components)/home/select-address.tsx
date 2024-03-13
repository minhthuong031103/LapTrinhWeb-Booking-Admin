/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
// import { getRequest } from '@/lib/fetch'
import axios from 'axios';
import TinhTP from '../../../../../hanhchinhvn/tinh_tp.json';
import QuanHuyen from '../../../../../hanhchinhvn/quan_huyen.json';

import XaPhuong from '../../../../../hanhchinhvn/xa_phuong.json';

interface SelectAddressProps {
  provinceValue: string;
  setProvinceValue: (value: string) => void;
  districtValue: string;
  setDistrictValue: (value: string) => void;
  wardValue: string;
  setWardValue: (value: string) => void;
}
export const SelectAddress = ({
  provinceValue,
  setProvinceValue,
  districtValue,
  setDistrictValue,
  wardValue,
  setWardValue,
}: SelectAddressProps) => {
  const [selectedProvince, setSelectedProvince] = useState(new Set([]));
  const [selectedDistrict, setSelectedDistrict] = useState(new Set([]));
  const [selectedWard, setSelectedWard] = useState(new Set([]));

  const [provinceTouched, setProvinceTouched] = useState(false);
  const [districtTouched, setDistrictTouched] = useState(false);
  const [wardTouched, setWardTouched] = useState(false);

  const [isLoadingProvince, setIsLoadingProvince] = useState(false);
  const [isLoadingDistrict, setIsLoadingDistrict] = useState(false);
  const [isLoadingWard, setIsLoadingWard] = useState(false);

  const [provinces, setProvince] = useState([]);
  const [districts, setDistrict] = useState([]);
  const [wards, setWard] = useState([]);
  useEffect(() => {
    async function getProvince() {
      setIsLoadingProvince(true);
      // const res = await getRequest({
      //   endPoint: 'https://provinces.open-api.vn/api/p/'
      // })
      // const res = await axios('https://provinces.open-api.vn/api/p/');
      // setProvince(res.data);
      setProvince(
        Object.values(TinhTP).sort((a, b) =>
          a.name.localeCompare(b.name),
        ) as any,
      );
      setIsLoadingProvince(false);
    }
    getProvince();
  }, []);
  useEffect(() => {
    setDistrict([]);
    setWard([]);
    async function getDistrict() {
      if (selectedProvince.size > 0) {
        setIsLoadingDistrict(true);
        const valuesArray = Array.from(selectedProvince);
        const provinceCode = valuesArray[0];
        // const res = await getRequest({
        //   endPoint: `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
        // })
        const filterCity = Object.keys(QuanHuyen)
          .filter(
            key => QuanHuyen[key].parent_code === TinhTP[provinceCode]?.code,
          )
          .map(key => QuanHuyen[key]);

        setDistrict(
          Object.values(filterCity).sort((a, b) =>
            a.name.localeCompare(b.name),
          ) as any,
        );
        setIsLoadingDistrict(false);
      }
    }
    getDistrict();
  }, [selectedProvince]);

  useEffect(() => {
    setWard([]);
    async function getWard() {
      if (selectedDistrict.size > 0) {
        setIsLoadingWard(true);
        const valuesArray = Array.from(selectedDistrict);
        const districtCode = valuesArray[0];
        // const res = await getRequest({
        //   endPoint: `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
        // })
        // const res = await axios.get(
        //   `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`,
        // );
        const filterWard = Object.keys(XaPhuong)
          .filter(
            key => XaPhuong[key].parent_code === QuanHuyen[districtCode]?.code,
          )
          .map(key => XaPhuong[key]);
        setWard(
          Object.values(filterWard).sort((a, b) =>
            a.name.localeCompare(b.name),
          ) as any,
        );
        setIsLoadingWard(false);
      }
    }

    getWard();
  }, [selectedDistrict]);
  useEffect(() => {
    async function setValue() {
      if (selectedWard.size > 0) {
        const valuesArrayProvince = Array.from(selectedProvince);
        const provinceCode = valuesArrayProvince[0];
        const provinceValue = await provinces.find(
          province => province.code == provinceCode,
        )?.name;
        setProvinceValue(provinceValue);
        const valuesArrayDistrict = Array.from(selectedDistrict);
        const districtCode = valuesArrayDistrict[0];
        const districtValue = await districts.find(
          district => district.code == districtCode,
        )?.name;
        setDistrictValue(districtValue);
        const valuesArrayWard = Array.from(selectedWard);
        const wardCode = valuesArrayWard[0];
        const wardValue = await wards.find(ward => ward.code == wardCode)?.name;
        setWardValue(wardValue);
      }
    }

    setValue();
  }, [selectedWard]);

  useEffect(() => {
    if (provinceValue && provinces) {
      const province = Object.values(provinces).find(
        province => province.name === provinceValue,
      );
      setSelectedProvince(new Set([province?.code]));
    }
  }, [provinces, provinceValue]);
  useEffect(() => {
    if (districtValue && districts) {
      const district = districts.find(
        district => district.name === districtValue,
      );
      setSelectedDistrict(new Set([district?.code]));
    }
  }, [districts, districtValue]);
  useEffect(() => {
    if (wardValue && wards) {
      const ward = wards.find(ward => ward.name === wardValue);
      setSelectedWard(new Set([ward?.code]));
    }
  }, [wards, wardValue]);
  const isProvinceValid = selectedProvince.size > 0;
  const isDistrictValid = selectedDistrict.size > 0;
  const isWardValid = selectedWard.size > 0;

  return (
    <>
      <Select
        key={'province'}
        radius={'sm'}
        variant={'bordered'}
        label="Thành phố, tỉnh thành"
        isInvalid={isProvinceValid || !provinceTouched ? false : true}
        errorMessage={
          isProvinceValid || !provinceTouched
            ? ''
            : 'Vui lòng chọn tỉnh, thành phố'
        }
        autoFocus={false}
        placeholder="Chọn thành phố, tỉnh thành"
        selectedKeys={selectedProvince}
        isLoading={isLoadingProvince}
        onSelectionChange={setSelectedProvince}
        isRequired
        labelPlacement="outside"
        className="w-full "
        onClose={() => setProvinceTouched(true)}
      >
        {provinces?.map(province => (
          <SelectItem key={province.code} value={province.code}>
            {province.name}
          </SelectItem>
        ))}
      </Select>
      <Select
        key={'district'}
        radius={'sm'}
        variant={'bordered'}
        isRequired
        label="Quận, huyện"
        isInvalid={isDistrictValid || !districtTouched ? false : true}
        errorMessage={
          isDistrictValid || !districtTouched ? '' : 'Vui lòng chọn quận, huyện'
        }
        autoFocus={false}
        placeholder="Chọn quận, huyện"
        selectedKeys={selectedDistrict}
        isLoading={isLoadingDistrict}
        onSelectionChange={setSelectedDistrict}
        labelPlacement="outside"
        className="w-full "
        onClose={() => setDistrictTouched(true)}
      >
        {districts?.map(district => (
          <SelectItem key={district.code} value={district.code}>
            {district.name}
          </SelectItem>
        ))}
      </Select>
      <Select
        key={'ward'}
        radius={'sm'}
        variant={'bordered'}
        isRequired
        label="Xã, phường"
        isInvalid={isWardValid || !wardTouched ? false : true}
        errorMessage={
          isWardValid || !wardTouched ? '' : 'Vui lòng chọn xã, phường'
        }
        autoFocus={false}
        placeholder="Chọn xã, phường"
        selectedKeys={selectedWard}
        isLoading={isLoadingWard}
        onSelectionChange={setSelectedWard}
        className="w-full "
        labelPlacement="outside"
        onClose={() => setWardTouched(true)}
      >
        {wards?.map(ward => (
          <SelectItem key={ward.code} value={ward.code}>
            {ward.name}
          </SelectItem>
        ))}
      </Select>
    </>
  );
};

'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { CustomInput } from './custom-input';
import { SelectAddress } from './select-address';
import toast from 'react-hot-toast';
import { useModal } from '@/hooks/useModalStore';
import { useApartment } from '@/hooks/useApartment';

const EditApartmentModal = () => {
  const { isOpen, onClose, type, data, onAction } = useModal();

  const [apartmentName, setApartmentName] = useState('');
  const [apartmentFloor, setApartmentFloor] = useState('');
  const [address, setAddress] = useState('');

  const [provinceValue, setProvinceValue] = useState('');
  const [districtValue, setDistrictValue] = useState('');
  const [wardValue, setWardValue] = useState('');

  const [initProvince, setInitProvince] = useState('');
  const [initDistrict, setInitDistrict] = useState('');
  const [initWard, setInitWard] = useState('');
  useEffect(() => {
    if (data) {
      setApartmentName(data?.name || '');
      setApartmentFloor(data.numberFloor?.toString() || '0');
      setAddress(data?.houseNumber || '');
      setProvinceValue(data?.city || '');
      setDistrictValue(data?.district || '');
      setWardValue(data?.ward || '');
      setInitProvince(data?.city || '');
      setInitDistrict(data?.district || '');
      setInitWard(data?.ward || '');
    }
  }, [data]);
  const isModalOpen = isOpen && type === 'editApartment';
  const { updateApartment } = useApartment();
  const resetState = () => {
    setApartmentName('');
    setApartmentFloor('');
    setAddress('');
  };
  const handleEditApartment = async () => {
    if (
      apartmentName &&
      apartmentFloor &&
      address &&
      provinceValue &&
      districtValue &&
      wardValue
    ) {
      const updateData = {
        name: apartmentName,
        numberFloor: parseInt(apartmentFloor),
        address: `${address}, ${wardValue}, ${districtValue}, ${provinceValue}`,
        ward: wardValue,
        district: districtValue,
        city: provinceValue,
        houseNumber: address,
        id: data?.id,
      };
      await updateApartment(updateData, onAction);
      resetState();
      onClose();
    } else {
      toast.error('Vui lòng nhập đầy đủ thông tin trước khi chỉnh sửa');
    }
  };
  return (
    <Modal size="2xl" isOpen={isModalOpen} onOpenChange={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex justify-center items-center text-gray uppercase font-bold text-xl">
              Cập nhật thông tin căn hộ
            </ModalHeader>
            <ModalBody className="space-y-4">
              <div className="flex gap-[20px]">
                <div className="w-[60%]">
                  <CustomInput
                    label="Tên căn hộ"
                    placeholder="Nhập tên căn hộ"
                    value={apartmentName}
                    setValue={setApartmentName}
                  />
                </div>
                <div className="w-[40%]">
                  <CustomInput
                    label="Số tầng"
                    placeholder="Nhập số tầng"
                    value={apartmentFloor}
                    setValue={setApartmentFloor}
                  />
                </div>
              </div>
              <div className="flex gap-[20px]">
                <SelectAddress
                  provinceValue={initProvince}
                  districtValue={initDistrict}
                  wardValue={initWard}
                  setProvinceValue={setProvinceValue}
                  setDistrictValue={setDistrictValue}
                  setWardValue={setWardValue}
                />
              </div>
              <div className="">
                <div className="w-full">
                  <CustomInput
                    label="Địa chỉ"
                    placeholder="Nhập địa chỉ"
                    value={address}
                    setValue={setAddress}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                className="rounded-[8px] w-[133px] px-4 py-2 bg-blueButton text-white font-semibold text-sm"
                onPress={handleEditApartment}
              >
                Lưu
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditApartmentModal;

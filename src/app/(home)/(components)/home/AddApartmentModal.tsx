'use client';

import { useApartment } from '@/hooks/useApartment';
import { useModal } from '@/hooks/useModalStore';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { CustomInput } from './custom-input';
import { SelectAddress } from './select-address';

const AddApartmentModal = () => {
  const { isOpen, onClose, type, onAction } = useModal();
  const { createApartment } = useApartment();
  const [apartmentName, setApartmentName] = useState('');
  const [apartmentFloor, setApartmentFloor] = useState('');
  const [address, setAddress] = useState('');
  const [provinceValue, setProvinceValue] = useState('');
  const [districtValue, setDistrictValue] = useState('');
  const [wardValue, setWardValue] = useState('');

  const isModalOpen = isOpen && type === 'createApartment';
  const resetState = () => {
    setProvinceValue('');
    setDistrictValue('');
    setWardValue('');
    setApartmentName('');
    setApartmentFloor('');
    setAddress('');
  };
  const handleAddApartment = async () => {
    if (
      apartmentName &&
      apartmentFloor &&
      address &&
      provinceValue &&
      districtValue &&
      wardValue
    ) {
      const data = {
        name: apartmentName,
        numberFloor: parseInt(apartmentFloor),
        address: `${address}, ${wardValue}, ${districtValue}, ${provinceValue}`,
        ward: wardValue,
        district: districtValue,
        city: provinceValue,
        houseNumber: address,
      };
      await createApartment(data, resetState, onClose);
      onAction();
    } else {
      toast.error('Vui lòng nhập đầy đủ thông tin trước khi tạo căn hộ');
    }
  };
  const handleClose = () => {
    resetState();
    onClose();
  };
  return (
    <Modal size="2xl" isOpen={isModalOpen} onOpenChange={handleClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex justify-center items-center text-gray uppercase font-bold text-xl">
              Tạo mới căn hộ
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
                    type="number"
                    value={apartmentFloor}
                    setValue={setApartmentFloor}
                  />
                </div>
              </div>
              <div className="flex gap-[20px]">
                <SelectAddress
                  provinceValue={provinceValue}
                  districtValue={districtValue}
                  wardValue={wardValue}
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
                onPress={handleAddApartment}
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

export default AddApartmentModal;

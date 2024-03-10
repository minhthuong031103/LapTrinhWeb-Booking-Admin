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
import { useModal } from '@/hooks/useModalStore';
import { CustomInput } from '@/app/(home)/(components)/home/custom-input';
import { CustomSelect } from '@/app/(home)/(components)/home/custom-select';
import { useRoom } from '@/hooks/useRoom';
import toast from 'react-hot-toast';

const EditRoomModal = () => {
  const { isOpen, onClose, type, data, onAction } = useModal();
  const [floor, setFloor] = useState([]);
  const [floorChosen, setFloorChosen] = useState(new Set<string>([]));

  useEffect(() => {
    if (data && floor.length === 0 && data.numberFloor) {
      for (let i = 1; i <= data.numberFloor; i++) {
        setFloor((prev: any) => [...prev, `Tầng ${i}`] as any);
      }
    }
    setRoomName(data?.name || '');
  }, [data]);
  useEffect(() => {
    if (data && floor.length > 0 && data.floor) {
      setFloorChosen(new Set([`Tầng ${data.floor}`]));
    }
  }, [data, floor]);
  const [roomName, setRoomName] = useState('');
  const isModalOpen = isOpen && type === 'editRoom';
  const { updateRoom } = useRoom();
  const resetState = () => {
    setFloor([]);
    setRoomName('');
    setFloorChosen(new Set<string>([]));
  };
  const handleEditRoom = async () => {
    if (roomName === '' || Array.from(floorChosen)[0] === '') {
      toast.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    await updateRoom({
      data: {
        name: roomName,
        floor: Number(Array.from(floorChosen)[0].split(' ')[1]),
        roomId: data.roomId,
      },
      refetch: onAction,
    });
    resetState();
    onClose();
  };
  return (
    <Modal size="2xl" isOpen={isModalOpen} onOpenChange={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex justify-center items-center text-gray uppercase font-bold text-xl">
              Cập nhật thông tin phòng
            </ModalHeader>
            <ModalBody className="space-y-4">
              <div className="flex gap-[20px]">
                <CustomInput
                  label="Tên phòng"
                  placeholder="Nhập tên phòng"
                  value={roomName}
                  setValue={setRoomName}
                />
                <CustomSelect
                  label="Tầng"
                  value={floorChosen}
                  setValue={value => setFloorChosen(new Set(value))}
                  data={floor}
                  isRequired={true}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                className="rounded-[8px] w-[133px] px-4 py-2 bg-blueButton text-white font-semibold text-sm"
                onPress={handleEditRoom}
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

export default EditRoomModal;

'use client';
import { useRoom } from '@/hooks/useRoom';
import { numberFloor } from '@/types';
import { useEffect, useState } from 'react';

interface RoomCardProps {
  apartmentId: string;
}
const Map = ({ apartmentId }: RoomCardProps) => {
  const [floors, setFloors] = useState([]);
  const { getRooms } = useRoom();
  useEffect(() => {
    const handleGetRooms = async () => {
      const res = await getRooms({ apartmentId: apartmentId });
      setFloors(res.data.rooms);
    };
    if (apartmentId) {
      handleGetRooms();
    }
  }, [apartmentId]);
  const bgColors = {
    'Đã thuê': 'bg-room-green',
    'Đang sửa chữa': 'bg-room-red',
    'Đang trống': 'bg-room-empty',
  };

  return (
    <>
      {!!floors?.length &&
        floors.map((floor: numberFloor) => {
          return (
            <div className="w-full shrink-0 gap-6 flex items-center">
              <p className="text-base text-black font-bold w-[60px] text-center">
                Tầng {floor.floor}
              </p>
              <div className="flex gap-[2px] w-full flex-wrap flex-1">
                {floor.rooms.map(room => {
                  return (
                    <div
                      className={`w-[100px] h-[100px] ${bgColors[room?.roomStatus ? room?.roomStatus : 'Đang trống']} items-center justify-center flex border-1 border-room-borderColor`}
                    >
                      <span className="font-semibold text-sm text-white w-full px-2 text-center truncate">
                        {room.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Map;

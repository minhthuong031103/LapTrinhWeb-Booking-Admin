import { useRoom } from '@/hooks/useRoom';
import { useEffect, useState } from 'react';
import RoomCard from './room-card';
import { numberFloor } from '@/types';

const ListRooms = ({ floors, getRooms, numberFloor }) => {
  return (
    <div className="w-full h-auto space-y-4">
      {floors?.map((floor: numberFloor) => {
        return (
          <div key={floor?.floor} className="w-full h-full shrink-0 space-y-2">
            <p className="text-base text-black font-bold">
              Tầng {floor?.floor}
            </p>
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
              {floor?.rooms?.map(room => {
                return (
                  <div key={room.id}>
                    <RoomCard
                      room={room}
                      numberFloor={numberFloor}
                      getRooms={getRooms}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListRooms;

'use client';

import { cn } from '@/lib/utils';

const MeaningRoom = () => {
  const meaningRoom = [
    {
      id: 1,
      content: 'Đang sửa chửa',
      className: 'bg-room-red',
    },
    {
      id: 2,
      content: 'Đang trống',
      className: 'bg-room-empty border-1 border-room-borderColor',
    },

    {
      id: 3,
      content: 'Đã thuê',
      className: 'bg-room-green',
    },
  ];
  return (
    <>
      {meaningRoom.map(item => (
        <div className="flex gap-4 items-center" key={item.id}>
          <div className={cn(`w-[39px] h-[39px] ${item.className}`)}></div>
          <span className="font-medium text-base text-black">
            {item.content}
          </span>
        </div>
      ))}
    </>
  );
};

export default MeaningRoom;

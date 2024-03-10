import { Room } from '@/types';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from '@nextui-org/react';
import RoomAction from './room-action';
import RoomDropdown from '@/app/(home)/(components)/home/room-dropdown';
import { useRouter } from 'next/navigation';
import { convertPriceNotVND } from '@/lib/utils';
interface RoomCardProps {
  room: Room;
  numberFloor: number;
  getRooms: () => void;
}
const RoomCard = ({ room, numberFloor, getRooms }: RoomCardProps) => {
  const bgColors = {
    'Đã thuê': 'bg-room-green',
    'Đang sửa chữa': 'bg-room-red',
    'Đang trống': 'bg-room-empty',
  };
  const router = useRouter();
  return (
    <Card
      className="max-w-[190px] h-[333px]"
      classNames={{
        header: 'p-0 flex relative',
        base: 'rounded-none drop-shadow border-1 border-borderColor bg-white',
      }}
    >
      <CardHeader onClick={() => router.push(`/rooms/${room.id}`)}>
        <div
          className={`w-[190px] h-[10px] ${bgColors[room?.roomStatus ? room?.roomStatus : 'Đang trống']} cursor-pointer`}
        ></div>
        <RoomDropdown
          className="absolute top-[18px] right-2 z-50 cursor-pointer hover:scale-105 border-1 rounded-full drop-shadow"
          actionType="Room"
          data={{
            roomId: room.id,
            numberFloor: numberFloor,
            name: room.name,
            floor: room.floor,
          }}
          refecth={getRooms}
        />
      </CardHeader>
      <Divider />
      <CardBody
        className="gap-4 cursor-pointer"
        onClick={() => router.push(`/rooms/${room.id}`)}
      >
        <p className="text-sm font-semibold text-black">{room.name}</p>
        <div className="space-y-3.5">
          <div className="flex items-center">
            <p className="text-room-detail font-normal text-sm">Số người</p>
            <p className="text-black font-semibold text-sm ml-auto">4</p>
          </div>
          <div className="flex items-center">
            <p className="text-room-detail font-normal text-sm">Tiền phòng</p>
            <p className="text-black font-semibold text-sm ml-auto">
              {convertPriceNotVND(room.roomPrice)}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-room-detail font-normal text-sm">Tiền cọc</p>
            <p className="text-black font-semibold text-sm ml-auto">
              {convertPriceNotVND(room.depositPrice)}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-room-detail font-normal text-sm">Tạm thu</p>
            <p className="text-black font-semibold text-sm ml-auto">
              {convertPriceNotVND(room.suspenseMoney)}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-room-detail font-normal text-sm">Nợ cũ</p>
            <p className="text-black font-semibold text-sm ml-auto">
              {convertPriceNotVND(room.oldDebt)}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-room-detail font-normal text-sm">Thực thu</p>
            <p className="text-black font-semibold text-sm ml-auto">
              {convertPriceNotVND(room.netProceeds)}
            </p>
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="flex items-center justify-center">
        <RoomAction
          onAction={() => {
            router.push(`/rooms/${room.id}`);
          }}
          status={room?.roomStatus}
        />
      </CardFooter>
    </Card>
  );
};
export default RoomCard;

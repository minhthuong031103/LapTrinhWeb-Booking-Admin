import { CommonSvg } from '@/assets/CommonSvg';

interface RoomActionProps {
  status: string;
  onAction: () => void;
}
const RoomAction = ({ status, onAction }: RoomActionProps) => {
  const renderStayed = () => {
    return (
      <>
        <div className="py-2 px-4 flex items-center justify-center bg-room-red">
          <p className="text-white text-sm font-bold ">Xuất phiếu</p>
        </div>
        <div className="ml-[10px]">{CommonSvg.export()}</div>
      </>
    );
  };
  // const renderEmpty = () => {
  //   return (
  //     <>
  //       <p className="text-room-empty text-sm font-bold ">Trống</p>
  //       <div className="ml-[10px]">{CommonSvg.empty()}</div>
  //     </>
  //   );
  // };
  return (
    <div
      className="flex items-center justify-center cursor-pointer"
      onClick={onAction}
    >
      {renderStayed()}
    </div>
  );
};

export default RoomAction;

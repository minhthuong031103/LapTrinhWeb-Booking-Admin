import Map from './Map';
import MeaningRoom from './MeaningRoom';

interface BuildingPlanProps {
  apartmentId: string;
}

const BuildingPlan = ({ apartmentId }: BuildingPlanProps) => {
  return (
    <div className="w-full h-full flex gap-10">
      <div className="w-[78%] space-y-10">
        <Map apartmentId={apartmentId} />
      </div>
      <div className="w-[22%] space-y-5">
        <MeaningRoom />
      </div>
    </div>
  );
};

export default BuildingPlan;

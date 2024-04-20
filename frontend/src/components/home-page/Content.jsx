import Achievements from "./Achievements";
import LocateUs from "./LocateUs";
import PlacementSlider from "./PlacementSlider";
import VisionMission from "./VisionMission";
import Welcome from "./Welcome";

export default function Content() {
  return (<>
    <div className="px-[5rem] py-[3rem]">
      {/* <h1 className="text-[3rem] font-bold text-center">L.D. College Of Engineering</h1> */}
      <Welcome />
      <VisionMission />
      <Achievements />
      <PlacementSlider />
      <LocateUs />
    </div>
  </>
  )
}
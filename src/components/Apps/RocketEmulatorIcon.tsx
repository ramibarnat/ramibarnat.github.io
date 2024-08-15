import BaseAppIcon from "./BaseAppIcon"
import rocket from '../../assets/spaceship_icon.png'
import { useContext } from "react";
import { TabContext } from "../Task Bar/TabContext";
import RocketEmulator from "./RocketEmulator";

interface RocketEmulatorIconProps {
    init_x?: number,
    init_y?: number,
}
function ProjectsAppIcon({init_x, init_y}: RocketEmulatorIconProps){
    const { addTab } = useContext(TabContext);
    
    const openApp = (id: string) => {
        addTab("Rocket Simulator", id, RocketEmulator)
    }

    return (
        <BaseAppIcon openApp={openApp} name={"Rocket Simulator"} init_x={init_x} init_y={init_y} app_img={rocket}/>
    )
}

export default ProjectsAppIcon
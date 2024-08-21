import BaseAppIcon from "./BaseAppIcon"
import rocket from '../../assets/App_Icons/spaceship_icon.png'
import { useContext } from "react";
import { TabContext } from "../Task Bar/TabContext";
import RocketEmulator from "./RocketEmulator";

interface RocketEmulatorIconProps {
    init_x?: number,
    init_y?: number,
}
function ProjectsAppIcon({init_x, init_y}: RocketEmulatorIconProps){
    const { addTab } = useContext(TabContext);
    const name = "Rocket Simulator (WIP)"
    
    const openApp = (id: string) => {
        addTab(name, id, RocketEmulator, rocket);
    }

    return (
        <BaseAppIcon openApp={openApp} name={name} init_x={init_x} init_y={init_y} app_img={rocket}/>
    )
}

export default ProjectsAppIcon
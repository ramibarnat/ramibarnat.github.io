import BaseAppIcon from "./BaseAppIcon"
import rocket from '../../assets/spaceship_icon.png'
import { useContext } from "react";
import { TabContext } from "../Task Bar/TabContext";
import Projects from './Projects'

interface ProjectsAppIconProps {
    init_x?: number,
    init_y?: number,
}
function ProjectsAppIcon({init_x, init_y}: ProjectsAppIconProps){
    const { addTab } = useContext(TabContext);
    
    const openApp = (id: string) => {
        addTab("Rocket Emulator", id, Projects)
    }

    return (
        <BaseAppIcon openApp={openApp} name={"Rocket Emulator"} init_x={init_x} init_y={init_y} app_img={rocket}/>
    )
}

export default ProjectsAppIcon
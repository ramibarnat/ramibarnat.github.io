import BaseAppIcon from "./BaseAppIcon"
import filled_folder from '../../assets/filled_folder.png'
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
        addTab("Projects", id, Projects)
    }

    return (
        <BaseAppIcon openApp={openApp} name={"Projects"} init_x={init_x} init_y={init_y} app_img={filled_folder}/>
    )
}

export default ProjectsAppIcon
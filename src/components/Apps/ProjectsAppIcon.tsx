import BaseAppIcon from "./BaseAppIcon"
import filled_folder from '../../assets/App_Icons/filled_folder.png'
import { useContext } from "react";
import { TabContext } from "../Task Bar/TabContext";
import Projects from './Projects'

interface ProjectsAppIconProps {
    init_x?: number,
    init_y?: number,
    id: string,
}
function ProjectsAppIcon({init_x, init_y, id}: ProjectsAppIconProps){
    const { addTab } = useContext(TabContext);
    
    const openApp = () => {
        addTab("Projects", id, Projects, filled_folder)
    }

    return (
        <BaseAppIcon openApp={openApp} name={"Projects"} init_x={init_x} init_y={init_y} app_img={filled_folder}/>
    )
}

export default ProjectsAppIcon
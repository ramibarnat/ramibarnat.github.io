import BaseAppIcon from "./BaseAppIcon"
import filled_folder from '../../assets/App_Icons/filled_folder.png'
import { useContext } from "react";
import { TabContext } from "../Task Bar/TabContext";
import Folder from './Folder'

interface FolderIconProps {
    init_x?: number,
    init_y?: number,
    id: string,
}
function FolderIcon({init_x, init_y, id}: FolderIconProps){
    const { addTab } = useContext(TabContext);
    console.log(id);
    
    const openApp = () => {
        console.log(id);
        addTab("Folder", id, Folder, filled_folder);
    }

    return (
        <BaseAppIcon openApp={openApp} name={"Folder"} init_x={init_x} init_y={init_y} app_img={filled_folder}/>
    )
}

export default FolderIcon
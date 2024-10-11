import BaseAppIcon from "./BaseAppIcon"
import filled_folder from '../../assets/App_Icons/filled_folder.png'
import empty_folder from '../../assets/App_Icons/folder.png'
import { useContext } from "react";
import { TabContext } from "../Task Bar/TabContext";
import FileExplorer from './FileExplorer'
import { FileSystemContext } from "../File System/FileSystemContext";

interface FolderIconProps {
    init_x?: number,
    init_y?: number,
    id: string,
    change_folder?: (id: string) => void, // this will change the active folder in the file explorer
}
function FolderIcon({init_x, init_y, id, change_folder}: FolderIconProps){
    const { addTab } = useContext(TabContext);
    const { folders } = useContext(FileSystemContext)
    const name = folders[id]?.name || "New Folder";
    
    const openApp = () => {
        if (change_folder) {
            change_folder(id);
        } else {
            addTab(name, id, FileExplorer, filled_folder);
        }
    }

    return (
        <>
            {folders[id] && Object.keys(folders[id].children).length > 0 ? (
                <BaseAppIcon openApp={openApp} name={name} init_x={init_x} init_y={init_y} app_img={filled_folder} app_id={id}/>
            ) : (
                <BaseAppIcon openApp={openApp} name={name} init_x={init_x} init_y={init_y} app_img={empty_folder} app_id={id}/>
            )}
        </>

    )
}

export default FolderIcon
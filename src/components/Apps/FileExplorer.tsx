import { useContext, useEffect, useRef, useState } from "react"
import WindowInsideBorder from "../Windows/WindowInsideBorder"
import { FileSystemContext } from "../File System/FileSystemContext"
import { TabContext } from "../Task Bar/TabContext";
import FileExplorerContextMenu from "../Windows/FileExplorerContextMenu";
import FolderIcon from "./FolderIcon";

function FileExplorer({id}: {id: string}) {
    const { folders, addApp } = useContext(FileSystemContext)
    const [currentFolderID, setCurrentFolderID] = useState("");
    const { changeTabName, itemDraggedID, setItemDraggedID } = useContext(TabContext)
    
    const contextMenuRef = useRef<HTMLDivElement | null>(null);
    const [contextMenuPos, setContextMenuPos] = useState({x: 0, y:0});
    const [contextMenuVisible, setContextMenuVisible] = useState(false);

    const explorerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Sets current folder if incorrectly intialized
        if (!currentFolderID && folders[id]) {
            setCurrentFolderID(id)
        } 
    }, [])
    
    function change_folder(new_id: string) {
        console.log(new_id)
        if (folders[new_id]) {
            setCurrentFolderID(new_id);

            // We use the tab id here, not the folder id
            changeTabName(id, folders[new_id].name);
        } else {
            console.log('Folder not found');
        }
    }

    const handleClick = (event: any) => {
        console.log('clicked');
        if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
            setContextMenuVisible(false);
        }
    }

    const handleRightClick = (event: any) => {
        event.preventDefault();
        
        if (event.target === event.currentTarget) {
            setContextMenuPos({x: event.clientX, y: event.clientY})
            setContextMenuVisible(true);
            console.log('right clicked');
        } else {
            setContextMenuVisible(false);
        }
    }

    const handleMouseUp = () => {
        // console.log(`Mouse up detected on File Explorer ${id}`);    
        if (itemDraggedID && folders[currentFolderID] && !folders[currentFolderID]['children'][itemDraggedID]) {
            addApp(itemDraggedID, currentFolderID, FolderIcon, {init_x: 100, init_y: 100})
            console.log(currentFolderID);
        }        
        setItemDraggedID(null);
      };

    const removeContextMenu = () => {
        if (contextMenuVisible) {
            setContextMenuVisible(false);
        }
    }

    return (
            <WindowInsideBorder id={id}>
                <div onContextMenu={handleRightClick} onClick={handleClick} onMouseUp={handleMouseUp} ref={explorerRef}
                    className="file-explorer-container" style={{width: "100%"}}>

                    {currentFolderID && Object.entries(folders[currentFolderID].children).map(([id,child]) => {
                        return (
                            <child.component key={id} change_folder={change_folder} id={id} {...child.props}/>
                        )
                    })}
                    {contextMenuVisible && 
                            <div ref={contextMenuRef}>
                                <FileExplorerContextMenu  is_visible={contextMenuVisible} x_pos={contextMenuPos.x} y_pos={contextMenuPos.y} removeContextMenu={removeContextMenu}/>
                            </div>
                        }
                </div>
            </WindowInsideBorder>
    )
}

export default FileExplorer
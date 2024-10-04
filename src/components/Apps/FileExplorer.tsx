import { useContext, useEffect, useRef, useState } from "react"
import WindowInsideBorder from "../Windows/WindowInsideBorder"
import { FileSystemContext } from "../File System/FileSystemContext"
import { TabContext } from "../Task Bar/TabContext";
import FileExplorerContextMenu from "../Windows/FileExplorerContextMenu";

function FileExplorer({id}: {id: string}) {
    const { folders } = useContext(FileSystemContext)
    const [currentFolder, setCurrentFolder] = useState(folders[id] || null);
    const { changeTabName, itemDraggedID, setItemDraggedID } = useContext(TabContext)
    
    const contextMenuRef = useRef<HTMLDivElement | null>(null);
    const [contextMenuPos, setContextMenuPos] = useState({x: 0, y:0});
    const [contextMenuVisible, setContextMenuVisible] = useState(false);

    const explorerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Sets current folder if incorrectly intialized
        if (!currentFolder && folders[id]) {
            setCurrentFolder(folders[id])
        }
        const handleMouseUp = (event: any) => {
            if (explorerRef.current && explorerRef.current.contains(event.target) && itemDraggedID) {
              console.log(`Mouse up detected on File Explorer ${id}`);
            }
          };
          
          // We set the third argument to true to listen during capture phase.
          // This gives priority and ensures that this is triggered first,
          // preventing the draggable components from preventing our default
          // event propogation.
          document.addEventListener('mouseup', handleMouseUp, true);
      
          return () => {
            document.removeEventListener('mouseup', handleMouseUp, true);
          };
    }, [])
    
    function change_folder(new_id: string) {
        console.log(new_id)
        if (folders[new_id]) {
            setCurrentFolder(folders[new_id]);

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

    const removeContextMenu = () => {
        if (contextMenuVisible) {
            setContextMenuVisible(false);
        }
    }

    return (
            <WindowInsideBorder id={id}>
                <div onContextMenu={handleRightClick} onClick={handleClick} ref={explorerRef}
                    className="file-explorer-container" style={{width: "100%"}}>

                    {currentFolder && Object.entries(currentFolder.children).map(([id,child]) => {
                        return (
                            <child.component key={id} change_folder={change_folder} {...child.props}/>
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
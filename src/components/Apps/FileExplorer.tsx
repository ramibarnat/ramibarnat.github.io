import { useContext, useEffect, useState } from "react"
import WindowInsideBorder from "../Windows/WindowInsideBorder"
import { FileSystemContext } from "../File System/FileSystemContext"
import { TabContext } from "../Task Bar/TabContext";

function FileExplorer({id}: {id: string}) {
    const { folders } = useContext(FileSystemContext)
    const [currentFolder, setCurrentFolder] = useState(folders[id] || null);
    const { changeTabName } = useContext(TabContext)

    useEffect(() => {
        // Sets current folder if incorrectly intialized
        if (!currentFolder && folders[id]) {
            setCurrentFolder(folders[id])
        }
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

    return (
        <WindowInsideBorder id={id}>
            {currentFolder && Object.entries(currentFolder.children).map(([id,child]) => {
                return (
                    <child.component key={id} change_folder={change_folder} {...child.props}/>
                )
            })}
        </WindowInsideBorder>
    )
}

export default FileExplorer
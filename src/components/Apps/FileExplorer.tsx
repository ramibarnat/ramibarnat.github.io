import { useContext, useEffect } from "react"
import WindowInsideBorder from "../Windows/WindowInsideBorder"
import { FileSystemContext } from "../File System/FileSystemContext"

function FileExplorer({id}: {id: string}) {
    const { folders } = useContext(FileSystemContext)
    let this_folder = folders[id] || null;

    useEffect(() => {
        if (!this_folder) {
            this_folder = folders[id]
            console.log('here');
        }
    }, [])
    
    function change_folder(new_id: string) {
        console.log(new_id)
        this_folder = folders[new_id];
    }

    return (
        <WindowInsideBorder id={id}>
            {this_folder && Object.entries(this_folder.children).map(([id,child]) => {
                console.log(this_folder.children);
                return (
                    <child.component key={id} change_folder={change_folder} {...child.props}/>
                )
            })}
        </WindowInsideBorder>
    )
}

export default FileExplorer
import { useContext, useEffect } from "react"
import WindowInsideBorder from "../Windows/WindowInsideBorder"
import { FileSystemContext } from "../File System/FileSystemContext"

function Folder({id}: {id: string}) {
    const { folders } = useContext(FileSystemContext)
    let this_folder = folders[id]

    useEffect(() => {
        this_folder = folders[id]
        console.log(folders)
        console.log(id)
    }, [])
    
    return (
        <WindowInsideBorder id={id}>
            {this_folder && Object.entries(this_folder.children).map(([id,child]) => (
                <child.component key={id} {...child.props}/>
            ))}
        </WindowInsideBorder>
    )
}

export default Folder
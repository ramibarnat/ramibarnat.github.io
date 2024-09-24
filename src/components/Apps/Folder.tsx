import { useContext } from "react"
import WindowInsideBorder from "../Windows/WindowInsideBorder"
import { FileSystemContext } from "../File System/FileSystemContext"

function Folder({id}: {id: string}) {
    const { folders } = useContext(FileSystemContext)
    
    return (
        <WindowInsideBorder id={id}>

        </WindowInsideBorder>
    )
}

export default Folder
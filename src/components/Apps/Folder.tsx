import { useContext, useEffect } from "react"
import WindowInsideBorder from "../Windows/WindowInsideBorder"
import { FileSystemContext } from "../File System/FileSystemContext"

function Folder({id}: {id: string}) {
    const { folders } = useContext(FileSystemContext)

    useEffect(() => {
        const this_folder = folders[id]
        console.log(this_folder)
    }, [])
    
    return (
        <WindowInsideBorder id={id}>
            {/* {Object.entries(folders).map(([id,tab]) => (
                <tab.component key={id} id={id} {...tab.props}/>
            ))} */}
        </WindowInsideBorder>
    )
}

export default Folder
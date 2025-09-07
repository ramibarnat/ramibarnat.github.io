import './ContextMenu.css'
import pyramid from '../../assets/pyramid.png'
import { useContext, useEffect, useRef } from 'react'
import { FileSystemContext } from '../file-system/FileSystemContext'
import generateRandomID from '../GenerateRandomID'

function FileExplorerContextMenu({is_visible, x_pos, y_pos, removeContextMenu}: {is_visible: boolean, x_pos: number, y_pos: number, removeContextMenu: () => void }) {
    const { addFolder } = useContext(FileSystemContext);
    const contextMenuRef = useRef<HTMLDivElement | null>(null);

    const createNewFolder = () => {
        const id = generateRandomID()
        addFolder(id, "desktop", "New Folder", {init_x: x_pos, init_y: y_pos});
        removeContextMenu();
    }

    const handleOutsideClick = (event: any) => {
        // Check if we're clicking on context menu, if not remove
        if (is_visible && contextMenuRef.current && !(contextMenuRef.current as HTMLElement).contains(event.target)) {
            removeContextMenu();
        }
    }

    useEffect(() => {
        // document.addEventListener("contextmenu", handleOutsideClick);
        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
            // document.removeEventListener("contextmenu", handleOutsideClick);
        }
    }, [])

    return (
        <div style={{top: y_pos, left: x_pos, position: 'absolute'}} ref={contextMenuRef} className='context-menu-container'>
            <div className='context-menu-inner'>

                {/* Create new item */}
                <div className='context-menu-item create-new-item'>
                    New
                    <img className='new-item-pyramid-image' src={pyramid}/>
                    <div className='new-item-selector'>
                        <div style={{paddingRight: '2px'}} className='context-menu-inner'>
                            <span className='context-menu-item' onClick={createNewFolder}>Folder</span>
                            <span className='context-menu-item'>Text File</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default FileExplorerContextMenu;
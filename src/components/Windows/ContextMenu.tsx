import './ContextMenu.css'
import pyramid from '../../assets/pyramid.png'
import { useContext } from 'react'
import { FileSystemContext } from '../File System/FileSystemContext'
import generateRandomID from '../GenerateRandomID'

function ContextMenu({x_pos, y_pos, removeContextMenu}: {x_pos: number, y_pos: number, removeContextMenu: () => void }) {
    const { addFolder } = useContext(FileSystemContext);

    const createNewFolder = () => {
        const id = generateRandomID()
        addFolder(id, "desktop", "New Folder", {init_x: x_pos, init_y: y_pos});
        removeContextMenu();
    }

    return (
        <div style={{top: y_pos, left: x_pos}} className='context-menu-container'>
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

export default ContextMenu;
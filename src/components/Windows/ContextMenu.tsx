import './ContextMenu.css'
import pyramid from '../../assets/pyramid.png'
import FolderIcon from '../Apps/FolderIcon'

function ContextMenu({x_pos, y_pos, addApp}: {x_pos: number, y_pos: number, addApp: any}) {
    const createNewFolder = () => {
        addApp(FolderIcon, {init_x: x_pos, init_y: y_pos})
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
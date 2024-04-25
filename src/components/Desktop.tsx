import './Desktop.css'
import Folder from './Folder'
import Draggable from 'react-draggable'


function Desktop() {
    return (
        <div id="desktop-container">
            <Draggable>
                <div className="draggable-components">
                    <Folder/>
                </div>
            </Draggable>
        </div>
    )
}

export default Desktop;
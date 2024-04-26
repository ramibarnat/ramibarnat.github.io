import './Desktop.css'
import Folder from './Folder'
import Draggable from 'react-draggable'


function Desktop() {
    return (
        <div id="desktop-container">
            <Draggable bounds={"parent"} onMouseDown={(event) => event.preventDefault()}>
                <div className="draggable-components">
                    <Folder folder_name="Projects"/>
                </div>
            </Draggable>
        </div>
    )
}

export default Desktop;
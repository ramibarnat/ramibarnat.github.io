import './Desktop.css'
import Folder from './Folder'
// import Draggable from 'react-draggable'


function Desktop() {
    return (
        <div id="desktop-container">
            <Folder folder_name="Projects" init_x={30} init_y={30}/>
        </div>
    )
}

export default Desktop;
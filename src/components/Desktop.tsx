import './Desktop.css'
import Folder from './Folder'
import WindowComponent from './WindowComponent';
import TextEditor from './TextEditor';
// import Draggable from 'react-draggable'


function Desktop() {
    return (
        <div id="desktop-container">
            <Folder folder_name="Projects" init_x={30} init_y={30}/>
            <WindowComponent init_x={200} init_y={90}>
                <TextEditor/>
            </WindowComponent>
        </div>
    )
}

export default Desktop;
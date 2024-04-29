import './Desktop.css'
import Folder from './Folder'
import WindowComponent from './WindowComponent';
import TextEditor from './TextEditor';
// import Draggable from 'react-draggable'


function Desktop() {
    const init_width = .7 * window.innerWidth;
    const init_height = .7 * window.innerHeight;

    return (
        <div id="desktop-container">
            <Folder folder_name="Projects" init_x={30} init_y={30}/>
            <WindowComponent init_x={200} init_y={90} init_width={init_width} init_height={init_height}>
                <TextEditor/>
            </WindowComponent>
        </div>
    )
}

export default Desktop;
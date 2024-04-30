import './Desktop.css'
import Folder from './Folder'
import WindowComponent from './WindowComponent';
import TextEditor from './TextEditor';
// import Draggable from 'react-draggable'


function Desktop() {
    const init_x = .23 * window.innerWidth;
    const init_y = .15 * window.innerHeight;
    const init_height = .7 * window.innerHeight;
    var init_width: number;

    if (window.innerWidth < 1000) {
        init_width = .7 * window.innerWidth;
    } else {
        init_width = .45 * window.innerWidth;
    }
    

    return (
        <div id="desktop-container">
            <Folder folder_name="Projects" init_x={30} init_y={30}/>
            <WindowComponent init_x={init_x} init_y={init_y} init_width={init_width} init_height={init_height}>
                <TextEditor/>
            </WindowComponent>
        </div>
    )
}

export default Desktop;
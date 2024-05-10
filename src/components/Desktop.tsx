import './Desktop.css'
import Folder from './Apps/Folder'
import WindowComponent from './Windows/WindowComponent';
import TextEditor from './Windows/TextEditor';
import { useState } from 'react';

function Desktop() {
    const init_x = .23 * window.innerWidth;
    const init_y = .15 * window.innerHeight;
    const init_height = .7 * window.innerHeight;
    let init_width: number;
    const [folders, setFolders] = useState([{name: "Projects", x: 30, y: 30}]);
    const [windows, setWindows] = useState<any[]>([]);

    const initWindow = (data: any) => {
        if (!windows.find(object => object.id === data.id)) {
            setWindows([...windows, {id: data.id, name: data.name, x: init_x, y: init_y, 
                init_width: init_width, init_height: init_height}]) 
        }
    }

    const closeWindow = (id: string) => {
        setFolders(folders); // REMOVE ONCE WE HAVE A PLACE TO USE THIS, JUST PREVENTING WARNING FOR NOW
        setWindows(windows.filter((window) => window.id !== id));
    }

    if (window.innerWidth < 1000) {
        init_width = .75 * window.innerWidth;
    } else {
        init_width = .45 * window.innerWidth;
    }

    // useEffect(() => {
    //     handleResize();
    //     window.addEventListener('resize', handleResize);
    //     return () => window.removeEventListener('resize', handleResize)
    // }, [])
    
    return (
        <div id="desktop-container">
            {folders.map((folder, index) => (
                <Folder key={index} folder_name={folder.name} init_x={folder.x} init_y={folder.y} open_window={initWindow}/>
            ))}
            {windows.map((window, index) => (
                <WindowComponent key={index} id={window.id} init_x={window.x} init_y={window.y} 
                            init_width={window.init_width} init_height={window.init_height} close_window={closeWindow}>
                    <TextEditor/>
                </WindowComponent>
            ))}
            
        </div>
    )
}

export default Desktop;
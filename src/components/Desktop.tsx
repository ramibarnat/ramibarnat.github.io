import { ElementType, useContext, useEffect, useState } from 'react';
import './Desktop.css'
import WindowComponent from './Windows/WindowComponent';
import Projects from './Apps/Projects';
import App from './Apps/App';
import { TabContext } from './Task Bar/TabContext';
import filled_folder from '../assets/filled_folder.png'

interface WindowObject {
    type: string,
    id: string,
    name: string,
    x: number,
    y: number,
    init_width: number,
    init_height: number,
}

interface FolderObject {
    name: string,
    x: number,
    y: number,
}
interface AppMapping {
    [appType: string]: ElementType;
}

function Desktop() {
    const init_x = .23 * window.innerWidth;
    const init_y = .15 * window.innerHeight;
    const init_height = .7 * window.innerHeight;
    let init_width: number;
    const [desktopFolders, setDesktopFolders] = useState<FolderObject[]>([]);
    const [windows, setWindows] = useState<WindowObject[]>([]);
    const { tabs } = useContext(TabContext);
    const apps: AppMapping = {
        'projects': Projects,
    }

    const closeWindow = (id: string) => {
        setDesktopFolders(desktopFolders); // REMOVE ONCE WE HAVE A PLACE TO USE THIS, JUST PREVENTING WARNING FOR NOW
        setWindows(windows.filter((window) => window.id !== id));
    }

    if (window.innerWidth < 1000) {
        init_width = .75 * window.innerWidth;
    } else {
        init_width = .45 * window.innerWidth;
    }

    useEffect(() => {
        for (let tab of tabs) {
            setWindows((prev) => [...prev, {type: tab.type, id: tab.id, name: tab.name, x: init_x, y: init_y, 
                init_width: init_width, init_height: init_height}]) 
        }
    }, [tabs])
    
    return (
        <div id="desktop-container">
            {desktopFolders.map((folder, index) => (
                <App key={index} type={'folder'} name={folder.name} init_x={folder.x} init_y={folder.y} app_img={filled_folder}/>
            ))}
            <App type={'projects'} name={"Projects"} init_x={30} init_y={30} app_img={filled_folder}/>

            {windows.map((window, index) => {
            const ComponentToRender = apps[window.type]
            return (    
                <WindowComponent key={index} id={window.id} init_x={window.x} init_y={window.y} 
                            init_width={window.init_width} init_height={window.init_height} close_window={closeWindow}>
                    <ComponentToRender />
                </WindowComponent>
            )
            })}
            
        </div>
    )
}

export default Desktop;
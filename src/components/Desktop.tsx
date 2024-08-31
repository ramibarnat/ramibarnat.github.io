import { useContext, useRef, useState } from 'react';
import ProjectsAppIcon from './Apps/ProjectsAppIcon';
import './Desktop.css'
import { TabContext } from './Task Bar/TabContext';
import RocketEmulatorIcon from './Apps/RocketEmulatorIcon';
import SonicAppIcon from './Apps/SonicAppIcon';
import ContextMenu from './Windows/ContextMenu';

function Desktop() {
    const { tabs } = useContext(TabContext);
    const contextMenuRef = useRef<HTMLDivElement | null>(null);

    const [desktopApps, setDesktopApps] = 
        useState({
            1: {component: ProjectsAppIcon, props: {init_x: 40, init_y: 40}},
            2: {component: RocketEmulatorIcon, props: {init_x: 40, init_y: 140}},
            3: {component: SonicAppIcon, props: {init_x: 40, init_y: 280}},
        });
    const [nextId, setNextId] = useState(2);
    const [contextMenuPos, setContextMenuPos] = useState({x: 0, y:0});
    const [contextMenuVisible, setContextMenuVisible] = useState(false);

    const handleClick = (event: any) => {
        if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
            setContextMenuVisible(false);
        }
    }

    const handleRightClick = (event: any) => {
        event.preventDefault();
        if (event.target === event.currentTarget) {
            setContextMenuPos({x: event.clientX, y: event.clientY})
            setContextMenuVisible(true);
            console.log('right clicked');
        }
    }

    // @ts-ignore
    const createNewApp = (component: React.ComponentType<any>, props?: any) => {
        setDesktopApps(prev => {
            return {...prev, [nextId]:{component:component, props: props}}
            setNextId(prev => prev+1)
        })
    }
    return (
        <div onContextMenu={handleRightClick} onClick={handleClick} id="desktop-container">
            {/* render all the desktop app icons */}
            {Object.entries(desktopApps).map(([id, app]) => (
                <app.component key={id} {...app.props} />
            ))}

            {/* render all the desktop windows */}
            {Object.entries(tabs).map(([id,tab]) => (
                <tab.component key={id} id={id} {...tab.props}/>
            ))}

            {/* render the right click context menu */}
            {contextMenuVisible && 
                <div ref={contextMenuRef}>
                    <ContextMenu  x_pos={contextMenuPos.x} y_pos={contextMenuPos.y} addApp={createNewApp}/>
                </div>
            }
        </div>
    )
}

export default Desktop;
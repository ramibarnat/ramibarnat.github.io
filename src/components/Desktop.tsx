import { useContext, useRef, useState } from 'react';
import './Desktop.css'
import { TabContext } from './Task Bar/TabContext';
import ContextMenu from './Windows/ContextMenu';
import { FileSystemContext } from './File System/FileSystemContext';

function Desktop() {
    const { tabs } = useContext(TabContext);
    const { folders } = useContext(FileSystemContext);
    const desktopApps = folders['desktop'].children;
    const contextMenuRef = useRef<HTMLDivElement | null>(null);

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

    const createNewApp = () => {
        // setDesktopApps(prev => {
        //     const newList = {...prev, [nextId]:{component:component, props: props}};
        //     setNextId(prev => prev+1);
        //     return newList;
        // })
        setContextMenuVisible(false);
    }

    return (
        <div onContextMenu={handleRightClick} onClick={handleClick} id="desktop-container">
            {/* render all the desktop app icons */}
            {Object.entries(desktopApps).map(([id, child]) => (
                <child.component key={id} />
            ))}

            {/* render all the desktop windows */}
            {Object.entries(tabs).map(([id, tab]) => (
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
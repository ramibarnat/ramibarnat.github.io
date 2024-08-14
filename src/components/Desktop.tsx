import { useContext, useState } from 'react';
import ProjectsAppIcon from './Apps/ProjectsAppIcon';
import './Desktop.css'
import { TabContext } from './Task Bar/TabContext';
import RocketEmulatorIcon from './Apps/RocketEmulatorIcon';
import WindowComponent from './Windows/WindowComponent';

function Desktop() {
    const { tabs } = useContext(TabContext);
    const [desktopApps, setDesktopApps] = 
        useState({
            1: {component: ProjectsAppIcon, props: {init_x: 50, init_y: 50}},
            2: {component: RocketEmulatorIcon, props: {init_x: 50, init_y: 160}}
        });
    const [nextId, setNextId] = useState(2)

    const createNewApp = (component: React.ComponentType<any>, props?: any) => {
        setDesktopApps(prev => {
            return {...prev, [nextId]:{component:component, props: props}}
            setNextId(prev => prev+1)
        })
    }
    return (
        <div id="desktop-container">
            {Object.entries(desktopApps).map(([id, app]) => (
                <app.component key={id} {...app.props} />
                
            ))}
            {Object.entries(tabs).map(([id, tab]) => (
                <tab.component key={id} id={id} {...tab.props} />
            ))}
        </div>
    )
}

export default Desktop;
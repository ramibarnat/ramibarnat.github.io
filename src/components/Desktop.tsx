import { useContext, useState } from 'react';
import ProjectsAppIcon from './Apps/ProjectsAppIcon';
import './Desktop.css'
import { TabContext } from './Task Bar/TabContext';
import RocketEmulatorIcon from './Apps/RocketEmulatorIcon';
import SonicAppIcon from './Apps/SonicAppIcon';

function Desktop() {
    const { tabs } = useContext(TabContext);
    const [desktopApps, setDesktopApps] = 
        useState({
            1: {component: ProjectsAppIcon, props: {init_x: 40, init_y: 40}},
            2: {component: RocketEmulatorIcon, props: {init_x: 40, init_y: 140}},
            3: {component: SonicAppIcon, props: {init_x: 40, init_y: 260}},
        });
    const [nextId, setNextId] = useState(2)

    // @ts-ignore
    const createNewApp = (component: React.ComponentType<any>, props?: any) => {
        setDesktopApps(prev => {
            return {...prev, [nextId]:{component:component, props: props}}
            setNextId(prev => prev+1)
        })
    }
    return (
        <div id="desktop-container">
            {/* render all the desktop app icons */}
            {Object.entries(desktopApps).map(([id, app]) => (
                <app.component key={id} {...app.props} />
            ))}

            {/* render all the desktop windows */}
            {Object.entries(tabs).map(([id,tab]) => {
                return (
                    <tab.component key={id} id={id} {...tab.props}/>
                )
            })}
        </div>
    )
}

export default Desktop;
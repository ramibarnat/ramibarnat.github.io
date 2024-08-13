import { useContext, useEffect, useState } from 'react';
import ProjectsAppIcon from './Apps/ProjectsAppIcon';
import './Desktop.css'
import { TabContext } from './Task Bar/TabContext';

function Desktop() {
    let init_width: number;
    const { tabs } = useContext(TabContext);

    if (window.innerWidth < 1000) {
        init_width = .75 * window.innerWidth;
    } else {
        init_width = .45 * window.innerWidth;
    }

    // useEffect(() => {
    //     console.log(tabs)
    // }, [tabs])
    
    return (
        <div id="desktop-container">
            <ProjectsAppIcon init_x={50} init_y={50}/>
            {Object.entries(tabs).map(([id, tab]) => {
                return (
                    <tab.component key={id} id={id} {...tab.props} />
                )
            })}
        </div>
    )
}

export default Desktop;
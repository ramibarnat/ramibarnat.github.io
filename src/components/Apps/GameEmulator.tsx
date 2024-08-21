import { useContext, useEffect } from "react";
import WindowInsideBorder from "../Windows/WindowInsideBorder";
import { TabContext } from "../Task Bar/TabContext";

interface GameEmulatorProps {
    src: string,
    id: string,
    init_height: number,
    init_width: number,
}

function GameEmulator({src,id,init_height,init_width}: GameEmulatorProps) {
    const { tabs } = useContext(TabContext);

    return (
        <WindowInsideBorder id={id} init_height={init_height} init_width={init_width}>
                <iframe
                    src={src}
                    style={{ 
                        border: 'none', 
                        padding: '0', 
                        margin: '0',
                        boxSizing: 'border-box', 
                        width: '100%',
                    }} 
                    height={init_height-30}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    tabIndex={-10000}
                    // onClick={handleClick}
                    // allowFullScreen
                ></iframe>
                
                <div onKeyDown={(e) => {
                        if (!tabs[id].focused) {
                            console.log('here');
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }} 
                    style={{
                        width: '100%', 
                        height: '100%', 
                        position: 'absolute', 
                        zIndex: tabs[id].focused ? -1: 10
                    }} 
                    />
        </WindowInsideBorder>
      
    )
}

export default GameEmulator
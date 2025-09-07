import { useContext, useEffect, useRef } from "react";
import WindowInsideBorder from "../windows/WindowInsideBorder";
import { TabContext } from "../task-bar/TabContext";

interface GameEmulatorProps {
    src: string,
    id: string,
    init_height: number,
    init_width: number,
}

function GameEmulator({src,id,init_height,init_width}: GameEmulatorProps) {
    const { tabs } = useContext(TabContext);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (!tabs[id].focused) {
            iframeRef.current?.blur()
        } else {
            iframeRef.current?.focus()
        }
        
    }, [tabs]);
    
    return (
        <WindowInsideBorder id={id} init_height={init_height} init_width={init_width}>
                <iframe
                    src={src}
                    ref={iframeRef}
                    style={{ 
                        border: 'none', 
                        padding: '0', 
                        margin: '0',
                        boxSizing: 'border-box', 
                        width: '100%',
                    }} 
                    height={init_height-30}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    tabIndex={-1}
                    // onClick={handleClick}
                    // allowFullScreen
                ></iframe>
                
                <div  
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
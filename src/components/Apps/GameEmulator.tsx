import WindowInsideBorder from "../Windows/WindowInsideBorder";

interface GameEmulatorProps {
    src: string,
    id: string,
    init_height: number,
    init_width: number,
}

function GameEmulator({src,id,init_height,init_width}: GameEmulatorProps) {
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
                    // allowFullScreen
                ></iframe>
        </WindowInsideBorder>
      
    )
}

export default GameEmulator
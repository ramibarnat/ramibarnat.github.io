import folder_img from '../assets/folder_icon.png'
import { useState, useRef, useEffect } from 'react';
import './Folder.css'
import Draggable from 'react-draggable'

interface FolderProps {
    folder_name: string;
    init_x?: number;
    init_y?: number;
}
function Folder({folder_name="New Folder", init_x=0, init_y=0}: FolderProps) {
    const [isHighlighted, setIsHighlighted] = useState(false);
    const [position, setPosition] = useState({x: init_x, y: init_y});

    // This hook will be used to create a reference to a DOM element
    // that can be used in our handleClickOutside function
    const componentRef = useRef(null);

    function handleClick() {
        setIsHighlighted((prevHighlighted) => {
            if (!prevHighlighted) {
                return true;
            }
            return false;
        });
    }

    const handleOutsideClick = (event: any) => {
        if ( componentRef.current && !((componentRef.current as HTMLElement).contains(event.target)) ) {
            setIsHighlighted(() => false)
        }
    }

    const handleDrag = (event: any, data: any) => {
        event = event; // prevents error, fix this later
        setPosition({
            x: position.x + data.deltaX,
            y: position.y + data.deltaY,
        });
    }

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);

        return () => document.removeEventListener('click', handleOutsideClick);
    }, []);
   
    return (
        <Draggable bounds={"parent"} position={{x:position.x, y:position.y}} onDrag={handleDrag}
            onMouseDown={(event) => event.preventDefault()}>
            <div ref={componentRef} onClick={handleClick} id='folder-container'>
                <img id='folder-image' src={folder_img} />
                <p style={{ 
                            backgroundColor: isHighlighted ? 'rgba(4, 2, 146, 0.979)' : 'transparent',
                            color: isHighlighted ? 'rgba(255, 255, 255, 0.95)' : 'black',
                            borderColor: isHighlighted ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
                }} id='folder-name-text'>{folder_name}</p>
            </div>
        </Draggable>
    )
    
}

export default Folder
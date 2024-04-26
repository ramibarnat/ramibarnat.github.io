import folder_img from '../assets/folder_icon.png'
import { useState, useRef, useEffect, Fragment } from 'react';
import './Folder.css'

interface FolderProps {
    folder_name: string;
}
function Folder({folder_name="New Folder"}: FolderProps) {
    const [isHighlighted, setIsHighlighted] = useState(false);

    // This hook will be used to create a reference to a DOM element
    // that can be used in our handleClickOutside function
    const componentRef = useRef(null);

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, []);

    const handleOutsideClick = (event: any) => {
        if ( componentRef.current && !((componentRef.current as HTMLElement).contains(event.target)) ) {
            setIsHighlighted(() => false)
        }
    }
    return (
        <div ref={componentRef} onClick={handleClick} id='folder-container'>
            <img id='folder-image' src={folder_img} />
            <p style={{ backgroundColor: isHighlighted ? 'rgba(0,0,123,255)' : 'transparent',
                        color: isHighlighted ? 'white' : 'black',
                        borderColor: isHighlighted ? 'white' : 'red',
                        borderWidth: isHighlighted ? '2px' : '2px',
                        borderStyle: isHighlighted ? 'dotted' : 'none',
             }} id='folder-name-text'>{folder_name}</p>
        </div>
    )

    function handleClick() {
        setIsHighlighted((prevHighlighted) => {
            if (!prevHighlighted) {
                return true;
            }
            return false;
        });
    }
}

export default Folder
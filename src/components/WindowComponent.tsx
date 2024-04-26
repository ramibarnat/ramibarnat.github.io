import { ReactNode, useState, useRef} from 'react';
import './WindowComponent.css'
import Draggable from 'react-draggable'
import close from '../assets/x_icon.png'

interface WindowComponentProps {
    children?: ReactNode;
    init_x?: number;
    init_y?: number;
}

function WindowComponent({children, init_x=0, init_y=0}: WindowComponentProps) {
    const [position, setPosition] = useState({x: init_x, y: init_y});
    const [mouseDownClose, setMouseDownClose] = useState(false);
    const [isVisible, setVisible] = useState(true);
    // const [isDragging, setIsDragging] = useState(false);
    // This is used to ensure that the window can only be dragged
    // when the user tries to drag from this specified component
    const dragHandleRef = useRef(null);

    const handleDrag = (event: any, data: any) => {
        event = event; // prevents error, fix this later
        setPosition({
            x: position.x + data.deltaX,
            y: position.y + data.deltaY,
        });
    }

    const closeWindow = () => {
        setVisible(false);
    }

    const closeDown = () => {
        setMouseDownClose(true);
    }

    const handleMouseDown = (event: any) => {
        event.preventDefault();

    }

    const handleDragStart = (event: any, data: any) => {
        if (event.target !== dragHandleRef.current) {
            event.preventDefault();
            return false;
        }
    }

    return (
        <Draggable bounds={"parent"} position={{x:position.x, y:position.y}} 
        onDrag={handleDrag} onMouseDown={handleMouseDown} onStart={handleDragStart}>
            <div style={{display: isVisible ? 'flex' : 'none'}}className='default-outer-container' id='outer-window-container'>
                <div className='default-inner-container' id='window-container'>

                    <div ref={dragHandleRef} id='window-top-bar'>
                        <div id='action-buttons'>
                            <div style={{backgroundColor: mouseDownClose ? 'green' : 'background-color: rgba(194,197,202,1.0)'}} 
                            className='default-outer-container'>
                                <div  onMouseDown={closeDown} onClick={closeWindow} className='default-inner-container' id='close-application'>
                                    <img id='close-icon' src={close} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {children}
                </div>
            </div>
        </Draggable>
    )
}

export default WindowComponent
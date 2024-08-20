import { ReactNode, useState, useRef, useEffect, useContext } from 'react';
import './WindowComponent.css'
import Draggable from 'react-draggable'
import close from '../../assets/x_icon.png'
import { TabContext } from '../Task Bar/TabContext';

interface WindowComponentProps {
    children?: ReactNode;
    init_x?: number;
    init_y?: number;
    init_width?: number,
    init_height?: number,
    id: string,
}

function WindowComponent({children, init_x, init_y, init_width, init_height, id}: WindowComponentProps) {
    const { tabs, removeTab } = useContext(TabContext);
    
    // This ensures that the width and height do not update more than once
    const [initialDimensions] = useState({
        width: init_width !== undefined ? init_width : 
            (window.innerWidth < 1000 ? 0.75 * window.innerWidth : 0.45 * window.innerWidth),
        height: init_height !== undefined ? init_height : 0.7 * window.innerHeight
    });
    
    const [position, setPosition] = useState(
        {
            x: init_x !== undefined ? init_x : Math.floor(Math.random() * 50), 
            y: init_y !== undefined ? init_y : Math.floor(Math.random() * 50)
        });
    const [mouseDownClose, setMouseDownClose] = useState("default");
    // const [isScrolling, setIsScrolling] = useState(false);
    
    // This is used to ensure that the window can only be dragged
    // when the user tries to drag from this specified DOM element
    const dragHandleRef = useRef(null);
    const closeButtonRef = useRef(null);

    const handleDrag = (event: any, data: any) => {
        event = event; // prevents error, fix this later
        setPosition({
            x: position.x + data.deltaX,
            y: position.y + data.deltaY,
        });
    }

    const closeDown = () => {
        setMouseDownClose("clicked");
    }

    const handleMouseDown = (event: any) => {
        // Prevents default behavior when user clicks
        event.preventDefault();
    }

    const handleMouseUp = (event: any) => {
        if (closeButtonRef.current && !((closeButtonRef.current as HTMLElement).contains(event.target))) {
            setMouseDownClose("default");
        } else {
            setMouseDownClose((prev) => {
                if (prev === "clicked") { 
                    // This means the user clicked on the close button and didn't drag mouse away after
                    removeTab(id);
                }
                return prev;
            })
        }
    }

    const handleDragStart = (event: any) => {
        // Ensures that dragging only works when holding on to top bar
        if (event.target !== dragHandleRef.current) {
            event.preventDefault();
            return false;
        }
    }

    useEffect(() => {
        
        document.addEventListener('mouseup', handleMouseUp)
        return () => document.removeEventListener('mouseup', handleMouseUp);
    }, []);

    return (
        <Draggable position={{x:position.x, y:position.y}} bounds={{top: 0}}
        onDrag={handleDrag} onMouseDown={handleMouseDown} onStart={handleDragStart} key={id}>
            {/* In this first div, we set the z-index of the window based on the focused property of the window */}
            <div style={{ width: initialDimensions.width, height: initialDimensions.height, zIndex: tabs[id].focused ? 1: 0}} className='outer-window-container'>
                <div className='default-inner-container' id='window-container'>
                    <div ref={dragHandleRef} id='window-top-bar'>
                        <div id='action-buttons'>
                            <div ref={closeButtonRef}
                            className={mouseDownClose + '-outer-container'}>
                                <div onTouchStart={closeDown} onTouchEnd={handleMouseUp} onMouseDown={closeDown} 
                                className={mouseDownClose + '-inner-container'} id='close-application'>
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
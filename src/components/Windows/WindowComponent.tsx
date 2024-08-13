import { ReactNode, useState, useRef, useEffect, useContext } from 'react';
import './WindowComponent.css'
import Draggable from 'react-draggable'
import close from '../../assets/x_icon.png'
import { TabContext } from '../Task Bar/TabContext';

interface WindowComponentProps {
    children?: ReactNode;
    init_x?: number;
    init_y?: number;
    id: string;
}

function WindowComponent({children, init_x=0, init_y=0, id}: WindowComponentProps) {
    const init_height = .7 * window.innerHeight;
    let init_width: number;
    if (window.innerWidth < 1000) {
        init_width = .75 * window.innerWidth;
    } else {
        init_width = .45 * window.innerWidth;
    }

    const { tabs, removeTab } = useContext(TabContext);
    const [position, setPosition] = useState({x: init_x, y: init_y});
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
                    console.log(tabs);
                    removeTab(id);
                    console.log(tabs);
                }
                return prev;
            })
        }
    }

    const handleDragStart = (event: any) => {
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
        onDrag={handleDrag} onMouseDown={handleMouseDown} onStart={handleDragStart}>
            <div style={{ width: init_width, height: init_height}} className='default-outer-container' id='outer-window-container'>
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
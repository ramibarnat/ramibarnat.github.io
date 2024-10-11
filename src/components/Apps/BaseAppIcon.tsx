import { useState, useRef, useEffect, useContext } from "react";
import "./BaseAppIcon.css";
import Draggable from "react-draggable";
import { TabContext } from "../Task Bar/TabContext";
import generateRandomID from "../GenerateRandomID";
import { FileSystemContext } from "../File System/FileSystemContext";

interface AppProps {
  openApp: (id: string) => void,
  name?: string,
  init_x?: number,
  init_y?: number,
  app_img: any,
  app_id?: string | null,
}

function BaseAppIcon({openApp, name = "New App", init_x = 0, init_y = 0, app_img, app_id=null}: AppProps) {
  const { setItemDraggedID } = useContext(TabContext);
  const { changeAppPos } = useContext(FileSystemContext);

  const [clicks, setClicks] = useState(0); // Checks for double click
  const [timeoutId, setTimeoutId] = useState<any>(-1); // Time in between each click
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [position, setPosition] = useState({ x: init_x, y: init_y });
  const [initPos, setInitPos] = useState({x: init_x, y: init_y}); // position before dragging started
  const [zIndex, setZIndex] = useState<number>(0);

  // This hook will be used to create a reference to a DOM element
  // that can be used in our handleClickOutside function
  const componentRef = useRef(null);

  const handleClick = () => {
    setIsHighlighted(true);
    setClicks(clicks + 1);
    if (timeoutId !== -1) {
      clearTimeout(timeoutId);
    }
    const newTimeout = setTimeout(() => {
      setClicks(0);
    }, 700)
    setTimeoutId(newTimeout);

    if (clicks >= 1) { // Double Click, trigger application opening
      setClicks(0);
      if (app_id) {
        openApp(app_id)
      }
    }
  };

  const handleOutsideClick = (event: any) => {
    if (componentRef.current && !(componentRef.current as HTMLElement).contains(event.target)) {
      setIsHighlighted(false);
      setZIndex(0);
    }
  };

  // @ts-ignore
  const handleDrag = (event: any, data: any) => {
    setPosition({
      x: position.x + data.deltaX,
      y: position.y + data.deltaY,
    });

    // pointer-events are css styles that affect the DOM element's ability
    // to be detected by mouse events. If they're set to none, then they
    // should not be identified as the event.target when the mouseup event
    // is triggered. This will allow us to identify the file explorer
    // underneath it as the event.target instead of the app itself.
    document.querySelectorAll(".app-container").forEach((el: any) => {
      el.style.pointerEvents = "none";
    });
  };

  const handleMouseDown = (event: any) => {
    event.preventDefault();
    setZIndex(2);
    setIsHighlighted(true);
    setItemDraggedID(app_id);
    setInitPos({x: event.clientX, y: event.clientY});
  }

  const handleMouseUp = (event: any) => {
    console.log(`Initial: (${initPos.x}, ${initPos.y})`);
    console.log(`Change: (${event.clientX-initPos.x}, ${event.clientY-initPos.y})`)
    if (app_id) changeAppPos(app_id, event.clientX-initPos.x, event.clientY-initPos.y);
    setInitPos({x: event.clientX, y: event.clientY});
  }

  const imageBlueTint = {
    filter: isHighlighted ? 'sepia(1) saturate(4) hue-rotate(200deg)' : 'none',
  };

  useEffect(() => {
    if (!app_id) {
      app_id = generateRandomID();
    }
    const handleMouseUp = () => {
      setZIndex(0);
      document.querySelectorAll(".app-container").forEach((el: any) => {
        el.style.pointerEvents = "auto";
      });
      // setItemDraggedID(null);
    }

    document.addEventListener('mouseup', handleMouseUp, true);
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp, true);
      document.removeEventListener("click", handleOutsideClick);
    }
  }, []);

  return (
    <Draggable
      bounds={"parent"}
      position={{ x: position.x, y: position.y }} onDrag={handleDrag}
      onMouseDown={handleMouseDown} onStop={handleMouseUp}
      >
      <div
        ref={componentRef} onTouchStart={handleClick} onClick={handleClick}
        className="app-container" style={{zIndex: zIndex}}>
        <img style={imageBlueTint} className="app-image" src={app_img} />
        <p
          style={{
            backgroundColor: isHighlighted ? "rgba(4, 2, 146, 0.979)" : "transparent",
            color: isHighlighted ? "rgba(255, 255, 255, 0.95)" : "black",
            borderColor: isHighlighted ? "rgba(255, 255, 255, 0.85)" : "transparent",
          }}
          className="app-name-text">
           {name}
        </p>
      </div>
    </Draggable>
  );
}

export default BaseAppIcon;
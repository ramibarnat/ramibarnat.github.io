import { useState, useRef, useEffect } from "react";
import "./BaseAppIcon.css";
import Draggable from "react-draggable";

interface AppProps {
  openApp: (id: string) => void,
  name?: string,
  init_x?: number,
  init_y?: number,
  app_img: any,
}

function BaseAppIcon({
  openApp,
  name = "New App",
  init_x = 0,
  init_y = 0,
  app_img,
}: AppProps) {
  const [clicks, setClicks] = useState(0); // Checks for double click
  const [timeoutId, setTimeoutId] = useState<any>(-1); // Time in between each click
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [position, setPosition] = useState({ x: init_x, y: init_y });
  const [id, setId] = useState("");
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
      console.log(id)
      openApp(id)
    }
  };

  const handleOutsideClick = (event: any) => {
    if (
      componentRef.current &&
      !(componentRef.current as HTMLElement).contains(event.target)
    ) {
      setIsHighlighted(false);
    }
  };

  const handleDrag = (event: any, data: any) => {
    event = event; // prevents warning, fix this later
    setPosition({
      x: position.x + data.deltaX,
      y: position.y + data.deltaY,
    });
  };

  useEffect(() => {
    setId(() => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let res = ""
      for (let i=0; i < 10; i++) {
        res += chars[Math.floor(Math.random() * chars.length)];
      }
      return res;
    })
    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <Draggable
      bounds={"parent"}
      position={{ x: position.x, y: position.y }}
      onDrag={handleDrag}
      onMouseDown={(event) => event.preventDefault()}>
      <div
        ref={componentRef}
        onTouchStart={handleClick}
        onClick={handleClick}
        className="app-container">
        <img className="app-image" src={app_img} />
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
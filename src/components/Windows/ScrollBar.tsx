import "./ScrollBar.css";
import { useState, useEffect, useRef, useCallback } from "react";
import pyramid from "../../assets/pyramid.png";
import ResizeObserver from "resize-observer-polyfill";
// import Draggable from "react-draggable";

function ScrollBar(props: any) {
  // This is the scrollable content from the parent container
  const scrollRef = props.content_ref;

  const scrollContainer = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  
  // Determines the height of the thumb
  const [thumbHeight, setThumbHeight] = useState("70px");
  // Determines the distance from the top that the thumb is at
  const [thumbTop, setThumbTop] = useState(0);
  // Determines if scrollbar thumb is being dragged manually by user
  const [isDragging, setIsDragging] = useState(false);
  // Keeps track of the y position of the mouse so we know if it's moving up or down
  const [mousePosition, setMousePosition] = useState<number | null>(null);

  const handleScroll = useCallback(() => {
    if (isDragging) {
      console.log('escapay');
      return;
    }
    let percentage_scrolled = 0;
    if (scrollRef.current) {
      // Calculates the percentage of the total page that we've scrolled so far
      percentage_scrolled = scrollRef.current.scrollTop / (scrollRef.current.scrollHeight - scrollRef.current.clientHeight);
    }

    // Sets the thumb to the correct position based on how far we scrolled
    const outer_height = scrollContainer.current ? (scrollContainer.current).clientHeight: 1;
    const thumb_height = scrollContainer.current ? (scrollContainer.current).children[0].clientHeight: 0;
    const res = outer_height-thumb_height < 3 ? 0 : (outer_height-thumb_height-3) * percentage_scrolled;
    setThumbTop(res);
  }, [isDragging]); 
  // The reason that we don't need to include scrollContainer.current and scrollRef.current
  // in our dependecy array is because they're always retrieving the "current" value of the
  // reference and will never give us stale information

  const handleResize = () => {
    setThumbHeight((previous) => {
      if (scrollRef.current.clientHeight !== 0 && scrollRef.current.scrollHeight !== 0) {
        const new_height = Math.round((scrollRef.current.clientHeight / scrollRef.current.scrollHeight) * 100) + "%"
        return new_height;
      }
      return previous;
    });
  };

  const upButtonClick = () => {
    if (thumbTop > 0 && scrollContainer.current) {
        let outer_height= 1;
        let thumb_height= 1;
        let new_thumb_top: number;

        outer_height = (scrollContainer.current as HTMLElement).clientHeight
        thumb_height = (scrollContainer.current as HTMLElement).children[0].clientHeight;

        if (thumbTop < 10) {
            new_thumb_top = 0;
        } else { 
            new_thumb_top = thumbTop - 10;
        }
        let percentage_scrolled = (new_thumb_top) / (outer_height-thumb_height);
        if (scrollRef.current) {
            scrollRef.current.scrollTop = (scrollRef.current.scrollHeight - scrollRef.current.clientHeight) * percentage_scrolled;
        }
    }
  }

  const downButtonClick = () => {
    if (scrollContainer.current) {
        let outer_height= 1;
        let thumb_height= 1;
        let new_thumb_top: number;

        outer_height = (scrollContainer.current as HTMLElement).clientHeight
        thumb_height = (scrollContainer.current as HTMLElement).children[0].clientHeight;

        if (thumbTop > outer_height-thumb_height-13) {
            new_thumb_top = outer_height-thumb_height-3;
        } else { 
            new_thumb_top = thumbTop + 10;
        }
        console.log(thumbTop);
        let percentage_scrolled = (new_thumb_top + 3) / (outer_height-thumb_height);
        if (scrollRef.current) {
            scrollRef.current.scrollTop = (scrollRef.current.scrollHeight - scrollRef.current.clientHeight) * percentage_scrolled;
        }
    }
  }

  const handleThumbClick = () => {
    setIsDragging(true);
  }

  // const handleDrag = (event: any, data: any) => {
  //   let outer_height= 1;
  //   let thumb_height= 1;
  //   let new_thumb_top: number;

  //   if (scrollContainer.current) {
  //     outer_height = (scrollContainer.current as HTMLElement).clientHeight;
  //     thumb_height = (scrollContainer.current as HTMLElement).children[0].clientHeight;
  //   }

  //   new_thumb_top = data.y;
  //   setThumbTop(new_thumb_top);
  //   let percentage_scrolled = (new_thumb_top + 3) / (outer_height-thumb_height);
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollTop = (scrollRef.current.scrollHeight - scrollRef.current.clientHeight) * percentage_scrolled;
  //   }
  // }

  // The useCallback hook is important because it prevents
  // functions from being re-created if they're being referenced
  // in the useEffect hook or if the component re-renders. (Memoization)
 
  // MAKE SURE to always include any state variables in this
  // dependency array so that the function re-creates itself when
  // those change, avoiding the use of stale state variables
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!mousePosition) {
      setMousePosition(event.clientY);
      return;
    }
    // event.y is not supported by all browsers so we use clientY instead
    const mouseDelta = (event.clientY - mousePosition);
    let outer_height= 1;
    let thumb_height= 1;
    let new_thumb_top: number;

    if (scrollContainer.current) {
      outer_height = (scrollContainer.current as HTMLElement).clientHeight;
      thumb_height = (scrollContainer.current as HTMLElement).children[0].clientHeight;
    }

    if (mouseDelta > 0) { // Mouse moving down
      if (thumbTop > outer_height-thumb_height-mouseDelta-3) {
        new_thumb_top = outer_height-thumb_height-3;
      } else {
        new_thumb_top = thumbTop + mouseDelta;
      }
    } else { // Mouse moving up
      if (thumbTop < -mouseDelta) {
        new_thumb_top = 0;
      } else {
        new_thumb_top = thumbTop + mouseDelta;
      }
    }
    setMousePosition(event.clientY);
    setThumbTop(new_thumb_top);
    console.log("new thumb top", new_thumb_top)
    let percentage_scrolled = (new_thumb_top + 3) / (outer_height-thumb_height);
    console.log((scrollRef.current.scrollHeight - scrollRef.current.clientHeight) * percentage_scrolled)
    if (scrollRef.current) {
      scrollRef.current.scrollTop = (scrollRef.current.scrollHeight - scrollRef.current.clientHeight) * percentage_scrolled;
    }
  }, [mousePosition, thumbTop]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setMousePosition(null);
    console.log('up')
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      
      // This is required in order to tell when the size
      // of the parent container changes so scrollbar size
      // will be updated but I'm not sure how it works anymore
      for (const child of scrollRef.current.children) {
        resizeObserver.observe(child);
      }

      scrollRef.current.addEventListener("scroll", handleScroll);
      if (isDragging) {
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mousemove", handleMouseMove);
      } else {
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("mousemove", handleMouseMove);
      }
      
      return () => {
        if (scrollRef.current) {
            scrollRef.current.removeEventListener("scroll", handleScroll);
        }
        resizeObserver.disconnect();
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, scrollRef, handleMouseMove, handleMouseUp, handleScroll, handleResize]);
  // You should typically include all of the functions that the event handlers will be
  // attaching to within the dependency array so that if they're re-created, the event 
  // listener will be attached to the correct one and not the old function

  return (
    <div id="scroll-bar-margin">
      <div id="scroll-bar-container">
        <div onClick={upButtonClick} onTouchStart={upButtonClick} className="outer-scroll-button">
          <div className="inner-scroll-button" id="scroll-up">
            <img className="pyramid" src={pyramid}></img>
          </div>
        </div>
        <div ref={scrollContainer} id="tread">
          
          {/* Scrollbar Thumb Elements */}
          {/* <Draggable bounds="parent" axis="y" onDrag={handleDrag} onStart={handleThumbClick} onStop={handleMouseUp}> */}
            <div
              style={{ height: thumbHeight, top: thumbTop }}
              ref = {thumbRef}
              onMouseDown={handleThumbClick}
              className="outer-scroll-button"
              id="scroll-bar-thumb-outer">
              <div
                className="inner-scroll-button"
                id="scroll-bar-thumb-inner"></div>
            </div>
          {/* </Draggable> */}

        </div>
        <div onClick={downButtonClick} onTouchStart={downButtonClick} className="outer-scroll-button">
          <div className="inner-scroll-button" id="scroll-down">
            <img
              id="upside-down-pyramid"
              className="pyramid"
              src={pyramid}
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrollBar;

import "./ScrollBar.css";
import { useState, useEffect, useRef } from "react";
import pyramid from "../assets/pyramid.png";
import ResizeObserver from "resize-observer-polyfill";

function ScrollBar(props: any) {
  const scrollRef = props.content_ref;
  const scrollContainer = useRef(null);
  const [thumbHeight, setThumbHeight] = useState("70px");
  const [thumbTop, setThumbTop] = useState(0);

  const handleScroll = () => {
    let percentage_scrolled = 0;
    if (scrollRef.current) {
      percentage_scrolled = scrollRef.current.scrollTop / (scrollRef.current.scrollHeight - scrollRef.current.clientHeight);
    }
    setThumbTop((previous) => {
      if (scrollContainer.current) {
        const outer_height = (scrollContainer.current as HTMLElement).clientHeight
        const thumb_height = (scrollContainer.current as HTMLElement).children[0].clientHeight;
        return outer_height-thumb_height < 3 ? 0 : (outer_height-thumb_height-3) * percentage_scrolled;
      }
      return previous; 
    });
    
  };

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

        if (scrollContainer.current) {
            outer_height = (scrollContainer.current as HTMLElement).clientHeight
            thumb_height = (scrollContainer.current as HTMLElement).children[0].clientHeight;
        }
        if (thumbTop < 10) {
            new_thumb_top = 0;
        } else { 
            new_thumb_top = thumbTop - 10;
        }
        setThumbTop(new_thumb_top);

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

        if (scrollContainer.current) {
            outer_height = (scrollContainer.current as HTMLElement).clientHeight
            thumb_height = (scrollContainer.current as HTMLElement).children[0].clientHeight;
        }
        if (thumbTop > outer_height-thumb_height-13) {
            new_thumb_top = outer_height-thumb_height-3;
        } else { 
            new_thumb_top = thumbTop + 10;
        }
        setThumbTop(new_thumb_top);

        let percentage_scrolled = (new_thumb_top + 3) / (outer_height-thumb_height);
        if (scrollRef.current) {
            scrollRef.current.scrollTop = (scrollRef.current.scrollHeight - scrollRef.current.clientHeight) * percentage_scrolled;
        }
    }
  }
  useEffect(() => {
    // setScrollRef(props.content_ref);
    // handleResize();
    if (scrollRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        handleResize();
      });

      for (const child of scrollRef.current.children) {
        resizeObserver.observe(child);
      }

      scrollRef.current.addEventListener("scroll", handleScroll);
      

      return () => {
        if (scrollRef.current) {
            scrollRef.current.removeEventListener("scroll", handleScroll);
        }
        resizeObserver.disconnect();
      };
    }

    

  }, [scrollRef, scrollContainer]);
  // This creates a dependecy on the props.content_ref.current being loaded in order to load this hook

  return (
    <div id="scroll-bar-margin">
      <div id="scroll-bar-container">
        <div onClick={upButtonClick} className="outer-scroll-button">
          <div className="inner-scroll-button" id="scroll-up">
            <img className="pyramid" src={pyramid}></img>
          </div>
        </div>
        <div ref={scrollContainer} id="tread">
          <div
            style={{ height: thumbHeight, top: thumbTop }}
            className="outer-scroll-button"
            id="scroll-bar-thumb-outer"
          >
            <div
              className="inner-scroll-button"
              id="scroll-bar-thumb-inner"></div>
          </div>
        </div>
        <div onClick={downButtonClick} className="outer-scroll-button">
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

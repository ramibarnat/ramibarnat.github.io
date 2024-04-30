import './ScrollBar.css'
import { useState } from 'react';

function ScrollBar( onScroll: any) {
    const [thumbTop, setThumbTop] = useState(0);
    if (false) {
        console.log(thumbTop);
    }
  
    const handleScroll = (event: any) => {
      const scrollHeight = event.target.current.scrollHeight;
      const clientHeight = event.target.current.clientHeight;
      const scrollTop = event.target.scrollTop;
      const thumbRatio = scrollTop / (scrollHeight - clientHeight);
      setThumbTop(thumbRatio * (clientHeight - event.target.current.querySelector('.thumb').offsetHeight));
      onScroll(scrollTop); 
    };
    return (
        <div id='scroll-bar-margin'>
            <div id='scroll-bar-container' onScroll={handleScroll}>
                <div id='scroll-bar-thumb' style={{top: thumbTop}}></div>
            </div>
        </div>
        
    )
}

export default ScrollBar
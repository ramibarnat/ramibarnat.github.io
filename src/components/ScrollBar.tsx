import './ScrollBar.css'
import { useState, useRef} from 'react';

function ScrollBar( content_ref: any ) {
    const [thumbTop, setThumbTop] = useState(0);
    const scrollRef = content_ref || useRef(null);
  
    const handleScroll = () => {
        console.log('scroll');
        if (scrollRef.current) {
            const scrollBar = scrollRef.current as HTMLElement
            const scrollHeight = scrollBar.scrollHeight;
            const clientHeight = scrollBar.clientHeight;
            const scrollTop = scrollBar.scrollTop;
            const thumbRatio = scrollTop / (scrollHeight - clientHeight);
            setThumbTop(thumbRatio * (clientHeight - (scrollBar.querySelector('#scroll-bar-thumb') as HTMLElement).offsetHeight));
        }
    };

    return (
        <div id='scroll-bar-margin'>
            <div id='scroll-bar-container' onScroll={handleScroll}>
                <div id='scroll-bar-thumb' style={{top: thumbTop}}>

                </div>
            </div>
        </div> 
    )
}

export default ScrollBar
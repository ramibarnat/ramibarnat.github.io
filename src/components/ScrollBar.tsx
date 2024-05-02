import './ScrollBar.css'
import { useState, useRef} from 'react';
import pyramid from '../assets/pyramid.png'

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
                <div className='outer-scroll-button'>
                    <div className='inner-scroll-button' id='scroll-up'>
                        <img className="pyramid" src={pyramid}></img>
                    </div>
                </div>
                <div id='tread' style={{top: thumbTop}}>
                    <div className='outer-scroll-button' id='scroll-bar-thumb-outer'>
                        <div className='inner-scroll-button' id='scroll-bar-thumb-inner'></div>
                    </div>
                </div>
                <div className='outer-scroll-button'>
                    <div className='inner-scroll-button' id = 'scroll-down'>
                        <img id='upside-down-pyramid' className="pyramid" src={pyramid}></img>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default ScrollBar
import './ScrollBar.css'
import { useState, useEffect} from 'react';
import pyramid from '../assets/pyramid.png'
import ResizeObserver from 'resize-observer-polyfill'

function ScrollBar( props: any ) {
    // const [thumbTop, setThumbTop] = useState(0);
    // const [scrollRef, setScrollRef] = useState<any>(null);
    const scrollRef = props.content_ref;
    const [clientHeight, setClientHeight] = useState(0);
    const [scrollHeight, setScrollHeight] = useState(0);
    const [thumbHeight, setThumbHeight] = useState('70px');

    // const handleScroll = () => {
    //     console.log('scrollg');
    //     // if (scrollRef.current) {
    //     //     const scrollBar = scrollRef.current as HTMLElement
    //     //     const scrollHeight = scrollBar.scrollHeight;
    //     //     const clientHeight = scrollBar.clientHeight;
    //     //     const scrollTop = scrollBar.scrollTop;
    //     //     const thumbRatio = scrollTop / (scrollHeight - clientHeight);
    //     //     setThumbTop(thumbRatio * (clientHeight - (scrollBar.querySelector('#scroll-bar-thumb') as HTMLElement).offsetHeight));
    //     // }
    // };

    const handleScroll = () => {
        // console.log((scrollRef.current as HTMLElement).scrollTop)
        // console.log(scrollRef.current.clientHeight);
        // console.log(scrollRef.current.scrollHeight);
        
    };

    const handleResize = () => {

        if (scrollRef.current.scrollHeight !== scrollHeight || 
            scrollRef.current.clientHeight !== clientHeight) {
            setClientHeight(scrollRef.current.clientHeight);
            setScrollHeight(scrollRef.current.scrollHeight);
            setThumbHeight((previous) => {
                if (scrollRef.current.clientHeight !== 0 && scrollRef.current.scrollHeight !== 0) {
                    console.log(Math.round(scrollRef.current.clientHeight / scrollRef.current.scrollHeight * 100) + '%')
                    return Math.round(scrollRef.current.clientHeight / scrollRef.current.scrollHeight * 100) + '%';
                } else {
                    return previous;
                }
            })
        }
    }

    useEffect(() => {
        // setScrollRef(props.content_ref);
        if (scrollRef) {
            const resizeObserver = new ResizeObserver(() => {
                handleResize();
            });
            
            for (const child of scrollRef.current.children){
                resizeObserver.observe(child);
            }

            scrollRef.current.addEventListener('scroll', handleScroll);
            return () => {
                scrollRef.current.removeEventListener('scroll', handleScroll);
                resizeObserver.disconnect();
            }
        }
    }, [scrollRef]); 
    // This creates a dependecy on the props.content_ref.current being loaded in order to load this hook


    return (
        <div id='scroll-bar-margin'>
            <div id='scroll-bar-container'>
                <div className='outer-scroll-button'>
                    <div className='inner-scroll-button' id='scroll-up'>
                        <img className="pyramid" src={pyramid}></img>
                    </div>
                </div>
                <div id='tread'>
                    <div style={{height: thumbHeight}} className='outer-scroll-button' id='scroll-bar-thumb-outer'>
                        <div  className='inner-scroll-button' id='scroll-bar-thumb-inner'></div>
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
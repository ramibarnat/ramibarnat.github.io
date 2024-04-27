import './Bar.css'
import windowsIcon from '../assets/windows_icon.png'
import linkedin from '../assets/linkedin.png'
import github from '../assets/github.gif'
import { useState, useEffect, useRef } from 'react'

function Bar() {
    const [startButtonMouseDown, setStartButtonMouseDown] = useState(false);
    const startButtonRef = useRef(null);

    const handleMouseUp = (event: any) => {
        event=event;
        // if (event.target !== startButtonRef.current) {
        //     setStartButtonMouseDown((previousValue) => {
        //         if (!previousValue) {
        //             return false;
        //         }
        //         return true;
        //     });
        // }
    }

    const handleMouseDownStart = () => {
        // setStartButtonMouseDown(true);
    }

    const handleStartClick = () => {
        setStartButtonMouseDown((previousValue) => (!previousValue));
    }

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp)
        return () => document.removeEventListener('mouseup', handleMouseUp);
    }, []);

    return (
        <div id='bar-container'>
            <hr id='bar-line'></hr>
            <div id='task-menu'>
                <div id='left-side-task-menu'>
                    <div style={{
                        borderTop: startButtonMouseDown ? '2px solid rgba(14, 13, 13, 0.781)' : '1px solid rgba(255, 255, 255, 0.959)',
                        borderLeft: startButtonMouseDown ? '2px solid rgba(14, 13, 13, 0.781)' : '1px solid rgba(255, 255, 255, 0.959)',
                        borderRight: startButtonMouseDown ? '1px solid rgba(255, 255, 255, 0.959)' : '2px solid rgba(14, 13, 13, 0.781)',
                        borderBottom: startButtonMouseDown ? '1px solid rgba(255, 255, 255, 0.959)' : '2px solid rgba(14, 13, 13, 0.781)',
                        marginRight: startButtonMouseDown ? '1px' : '0px',
                        marginTop: startButtonMouseDown ? '1px' : '0px',
                        }} id="start-container" onClick={handleStartClick} ref={startButtonRef}>
                        <div style={{
                            borderTop: startButtonMouseDown ? '1px solid rgba(0, 0, 0, 0.226)' : '1px solid rgba(222,222,222,1.0)',
                            borderLeft: startButtonMouseDown ? '1px solid rgba(0, 0, 0, 0.226)' : '1px solid rgba(222,222,222,1.0)',
                            borderRight: startButtonMouseDown ? '1px solid rgba(222,222,222,1.0)' : '2px solid rgba(0, 0, 0, 0.226)',
                            borderBottom: startButtonMouseDown ? '1px solid rgba(222,222,222,1.0)' : '2px solid rgba(0, 0, 0, 0.226)',
                            }} onMouseDown={handleMouseDownStart} id='start'>
                            <img id="windows-icon" src={windowsIcon}></img>
                            <p id='start-text'>Start</p>
                        </div>
                    </div>
                    <div id='before-skinny' className='vertical-line-skinny' />
                    <div id='before-fat' className='vertical-line-fat' />
                    <a href="https://www.linkedin.com/in/rami-souguir-9732761aa/" target="_blank">
                        <img id="linkedin" src={linkedin}/>
                    </a>
                    <a href="https://github.com/RamiSouguir" target="_blank">
                        <img id="github" src={github}/>
                    </a>
                    <div id='after-skinny' className='vertical-line-skinny' />
                    <div id='after-fat' className='vertical-line-fat' />
                </div>
            </div>
        </div>
    )
}

export default Bar
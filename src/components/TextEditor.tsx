import './TextEditor.css'
import ScrollBar from './ScrollBar'
import { useRef } from 'react'

interface TextEditor {

}

function TextEditor() {
    const scrollableContentRef = useRef(null);

    function handleScroll() {
        console.log('scroll');
    }
    return (
        <div id='text-editor-container'>
            <div id='text-body-container'>
                <div onScroll={handleScroll} id='text-editor-inner' ref={scrollableContentRef}>
                    <div id='text-container'>
                        <h1 className='project-title'>Batle.us</h1>
                        <p className='project-body'>
                            {`Currently developing a multiplayer game usingg. Angular, 
                            Tailwind, Node.js, Express.js, and AWS along with libraries 
                            such as D3.js, WebGL, and socket.io. Utilized Git for source control control conntorl contorl peanut peanuit peanut
                            control. (Link: `}<a href='http://www.batle.us/' target='_blank'>www.batle.us</a>)
                            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                            Here
                            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                            Here
                            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                            EA SPORTS<br/>
                            in game
                        </p>
                    </div>
                </div>
                <ScrollBar content_ref={scrollableContentRef} />
            </div>
        </div>
    )
}

export default TextEditor
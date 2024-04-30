import './TextEditor.css'
import ScrollBar from './ScrollBar'

interface TextEditor {

}

function TextEditor() {


    return (
        <div id='text-editor-container'>
            <div id='text-body-container'>
                <div id='text-editor-inner'>
                    <div id='text-container'>
                        <h1 className='project-title'>Batle.us</h1>
                        <p className='project-body'>
                            {`Currently developing a multiplayer game using Angular, 
                            Tailwind, Node.js, Express.js, and AWS along with libraries 
                            such as D3.js, WebGL, and socket.io. Utilized Git for source control control conntorl contorl peanut peanuit peanut
                            control. (Link: `}<a href='http://www.batle.us/' target='_blank'>www.batle.us</a>)
                        </p>
                    </div>
                {/* <ScrollBar/> */}
                </div>
            </div>
        </div>
    )
}

export default TextEditor
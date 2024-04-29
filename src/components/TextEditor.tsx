import './TextEditor.css'

interface TextEditor {

}

function TextEditor() {


    return (
        <div id='text-editor-container'>
            <div id='text-editor-inner'>
                <h1 className='project-title'>Batle.us</h1>
                <p className='project-body'>
                    {`Currently developing a multiplayer game using Angular, 
Tailwind, Node.js, Express.js, and AWS along with libraries 
such as D3.js, WebGL, and socket.io. Utilized Git for source 
control. (Link: www.batle.us)`}
                </p>
            </div>
        </div>
    )
}

export default TextEditor
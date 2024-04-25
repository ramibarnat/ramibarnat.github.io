import './Bar.css'
import windowsIcon from '../assets/windows_icon.png'
import linkedin from '../assets/linkedin.png'

function Bar() {
    return (
        <div id='bar-container'>
            <hr id='bar-line'></hr>
            <div id='task-menu'>
                <div id='left-side-task-menu'>
                    <div id='start'>
                        <img id="windows-icon" src={windowsIcon}></img>
                        <p id='start-text'>Start</p>
                    </div>
                    <a href="https://www.linkedin.com/in/rami-souguir-9732761aa/" target="_blank">
                        <img id="linkedin" src={linkedin}/>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Bar
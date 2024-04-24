import './Bar.css'
import windowsIcon from '../assets/windows_icon.png'

function Bar() {
    return (
        <div id='bar-container'>
            <hr id='bar-line'></hr>
            <div id='task-menu'>
                <div id='start'>
                    <img id="windows-icon" src={windowsIcon}></img>
                    <p id='start-text'>Start</p>
                </div>
            </div>
        </div>
    )
}

export default Bar
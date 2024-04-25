import './Bar.css'
import windowsIcon from '../assets/windows_icon.png'
import linkedin from '../assets/linkedin.png'
import github from '../assets/github.gif'

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
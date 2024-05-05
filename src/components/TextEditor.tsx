import "./TextEditor.css";
import ScrollBar from "./ScrollBar";
import batle from "../assets/batle_screen.png";
import { useRef } from "react";

function TextEditor() {
  const scrollableContentRef = useRef(null);

  // function handleScroll() {
  //     console.log('scroll');
  // }
  return (
    <div id="text-editor-container">
      <div id="text-body-container">
        <div id="text-editor-inner" ref={scrollableContentRef}>
          <div id="text-container">
            <h1 className="project-title">Batle.us</h1>
            <p style={{ marginBottom: 20 }} className="project-body">
              I am currently developing a multiplayer game usingg. Angular, 
                            Tailwind, Node.js, Express.js, and AWS along with libraries 
                            such as D3.js, three.js, and socket.io. Utilized Git for source 
                            control. (Link: {` `}
              <a href="http://www.batle.us/" target="_blank">
                www.batle.us
              </a>) 
            </p>
            <img className="text-editor-image" src={batle}></img>
            <p className="project-body">
              The website current has one minigame which utilizes 3D rendering
              libraries and geojson data to allow users to guess the country on
              the globe.
            </p>
          </div>
        </div>
        <ScrollBar content_ref={scrollableContentRef} />
      </div>
    </div>
  );
}

export default TextEditor;

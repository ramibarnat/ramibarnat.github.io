import "./TextEditor.css";
import ScrollBar from "./ScrollBar";
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
            <p style={{ marginBottom: 250 }} className="project-body">
              {`Currently developing a multiplayer game usingg. Angular, 
                            Tailwind, Node.js, Express.js, and AWS along with libraries 
                            such as D3.js, WebGL, and socket.io. Utilized Git for source 
                            control control conntorl contorl peanut peanuit peanut
                            control. (Link: `}
              <a href="http://www.batle.us/" target="_blank">
                www.batle.us
              </a>
              ) Here Here EA SPORTS in game yenno
            </p>
            <p style={{ marginBottom: 420 }}>t</p>
            <p>margin</p>
          </div>
        </div>
        <ScrollBar content_ref={scrollableContentRef} />
      </div>
    </div>
  );
}

export default TextEditor;

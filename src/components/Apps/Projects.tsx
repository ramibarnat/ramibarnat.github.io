import "./Projects.css";
import ScrollBar from "../Windows/ScrollBar";
import batle from "../../assets/batle_screen.png";
import sleep_prevent from "../../assets/sleep_prevention.mp4"
import pokedex from "../../assets/pokedex_img.png"
import { useEffect, useRef, useState } from "react";
import WindowComponent from "../Windows/WindowComponent";

function Projects({id}: {id:string}) {
  const scrollableContentRef = useRef(null);
  const pokedexRef = useRef(null);
  const [pokedexHeight, setPokedexHeight] = useState(10);

  function handleResize() {
    if (pokedexRef.current) {
      setPokedexHeight((pokedexRef.current as HTMLElement).clientWidth * 405/600);
    }
  }

  const stopDrag = (event: any) => {
    // This is extremeley important for allowing scrolling on 
    // touch devices. It prevents the dragging from initiating.
    // onTouchStartCapture event is requried in order to bubble
    // from the parent down to the child.
    event.stopPropagation(); 
  }
  
  useEffect(() => {
    handleResize();
  }, [pokedexRef]);

  return (
    <WindowComponent id={id} init_x={Math.floor(Math.random() * 50)} init_y={Math.floor(Math.random() * 50)}>
      <div id="text-editor-container">
        <div id="text-body-container">
          <div onTouchStartCapture={stopDrag} id="text-editor-inner" ref={scrollableContentRef}>
            <div id="text-container">
              <h1 style={{ marginTop: 5 }} className="project-title">Batle.us</h1>
              <p  className="project-body">
                I am currently developing a multiplayer country guessing game Angular, 
                Tailwind, Node.js, Express.js, and AWS along with libraries 
                such as D3.js, three.js, and socket.io. Geospatial data was utilized
                to map countries onto the sphere. (Link: {` `}
                <a href="http://www.batle.us/" target="_blank">
                  www.batle.us
                </a>) 
              </p>
              <img id='batle_image' className="text-editor-image" src={batle}></img>
              <p className="project-body">
                The website currently has one multiplayer minigame which utilizes 3D 
                rendering libraries and geojson data to allow users to guess the 
                country on the globe.
              </p>
              <hr className="text-editor-hr"/>

              <h1 className="project-title">Driver Sleep Prevention Device</h1>
              <p className="project-body">
                Collaborated with a partner to create an aftermarket sleep detection 
                and prevention system using OpenCV and dlib in Python. We competed in 
                multiple invention competitions and worked with a startup accelerator
                to further develop the product.
              </p>
              <video id='sleep-prevent-vid' className="text-editor-video" autoPlay loop muted playsInline={true}>
                <source src={sleep_prevent} type="video/mp4" />
              </video>
              <hr className="text-editor-hr"/>
              
              <h1 className="project-title">PDF Reader</h1>
              <p className="project-body">
                Developed a website to automatically process 
                the contents of a PDF using Optical Character Recognition as opposed to
                the typical data extraction methods that are typically much less reliable.
                <br/> <br/>
                Built with Angular and Django and made use of the py-tesseract and OpenCV 
                libraries for OCR functionality.
              </p>
              <hr className="text-editor-hr"/>
              
              <h1 className="project-title">Pokedex Dashboard</h1>
              <p className="project-body">
                Created a fully interactive pokemon dashboard to filter and lookup pokemon. 
                This was used at my previous company as a skill assessment for new hires.
                The images of each pokemon were web scraped using a python script and the 
                beautiful soup library. {` `}
                <span id='ps-dashboard'>
                  (P.S. If you switch to a Desktop you can interact with the dashboard below)
                </span>
              </p>
              <img src={pokedex} id='pokedex-image' className="text-editor-image" />
              <iframe height={pokedexHeight} ref={pokedexRef} id="pokedex" src="https://app.powerbi.com/view?r=eyJrIjoiZDkxZGZiYjgtM2VhMi00NTcyLWI3YmEtY2FlZGU2Mzk3MjhlIiwidCI6IjIyMTc3MTMwLTY0MmYtNDFkOS05MjExLTc0MjM3YWQ1Njg3ZCIsImMiOjN9"></iframe>

            </div>
          </div>
          <ScrollBar content_ref={scrollableContentRef} />
        </div>
      </div>
    </WindowComponent>
  );
}

export default Projects;

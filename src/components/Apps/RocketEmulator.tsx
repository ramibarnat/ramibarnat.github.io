import { forwardRef, useEffect } from "react";
import "./RocketEmulator.css";
import WindowInsideBorder from "../Windows/WindowInsideBorder";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import * as THREE from 'three'
import planet_surface from '../../assets/3d/planet_surface.png'
import { useRef } from "react";

interface ModelConfig {
  url: string, 
  x_pos?: number, 
  y_pos?: number, 
  z_pos?: number,
  rotation?: [number,number,number],
  scale?: number,
}

const Model = forwardRef<THREE.Group, ModelConfig>(({ url, x_pos = 0, y_pos = 0, z_pos = 0, rotation = [0,0,0], scale=1}, ref) => {
  const { scene } = useGLTF(url) as any;
  
  return (
    <primitive 
      object={scene} 
      scale={scale} 
      position={[x_pos, y_pos, z_pos]} 
      rotation={new THREE.Euler(...rotation)}
      ref={ref} 
    />
  );
});


function TexturedSphere( {texturePath, radius, rotation=[0,0,0]}: {texturePath: string, radius: number, rotation?: [number,number,number]}) {
  // Load the texture
  const texture = useLoader(THREE.TextureLoader, texturePath);

  return (
    <mesh rotation={rotation}>
      <sphereGeometry args={[radius, 100, 100]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}


const RocketEmulatorComponent = () => {
  // *IMPORTANT*
  // We're required to create this seperate component
  // in order to use the useFrame hook since it has
  // to be within the Canvas component

  const radius = 1000;
  const spaceshipRef = useRef<any>();
  const controllerRef = useRef<any>();
  const cameraRef = useRef<any>();

  const models = {
    spaceship: "./scene.gltf",
    planet_surface: planet_surface
  }

  useFrame(() => {
    if (spaceshipRef.current && controllerRef.current) {
      controllerRef.current.target.copy(spaceshipRef.current.position)
    }
  });

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === "Space" && spaceshipRef.current && cameraRef.current) {
        spaceshipRef.current.position.y += .01;
        cameraRef.current.position.y += .01;
      } 
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  },[])

  return (
    <>
      <ambientLight intensity={2}/>
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />

      {/* Spaceship model */}
      <Model
        url={models.spaceship} 
        y_pos={radius+0.08} 
        scale={0.1} 
        rotation={[-Math.PI/2,0,-Math.PI/2]} 
        ref={spaceshipRef}/>

      {/* Planet model */}
      <TexturedSphere 
        texturePath={models.planet_surface} 
        radius={radius} 
        rotation={[Math.PI/2,0,0]}/>

      <PerspectiveCamera makeDefault 
        position={[5, radius+1, 0]} 
        fov={75} 
        zoom={3} 
        ref={cameraRef}/>
      <OrbitControls 
        enablePan={false} 
        ref={controllerRef}
        zoomSpeed={0.25}
        rotateSpeed={0.25}/>
    </>
  )
}


function RocketEmulator({id}: {id:string}) {
  return (
    <WindowInsideBorder id={id}>
      <div id="rocket-emulator-container">
        <Canvas gl={{ antialias: true }}
          tabIndex={1}
          style={{ background: "#9ff0fc" }} // CSS background style
          onCreated={({ gl }) => {
            gl.setClearColor("#9ff0fc"); // Background color for the scene
          }}>
          <RocketEmulatorComponent/>
        </Canvas>
      </div>
    </WindowInsideBorder>
  );
}

export default RocketEmulator;

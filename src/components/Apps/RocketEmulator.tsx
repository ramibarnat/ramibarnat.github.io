import "./RocketEmulator.css";
import WindowComponent from "../Windows/WindowComponent";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from 'three'
import planet_surface from '../../assets/3d/planet_surface.png'

interface ModelConfig {
  url: string, 
  x_pos?: number, 
  y_pos?: number, 
  z_pos?: number
}

function Model({url, x_pos=0, y_pos=0, z_pos=0}: ModelConfig) {
  const { scene } = useGLTF(url) as any;
  return <primitive object={scene} scale={0.5} position={[x_pos, y_pos, z_pos]}/>;
}

function TexturedSphere( {texturePath, radius}: {texturePath: string, radius: number}) {
  // Load the texture
  const texture = useLoader(THREE.TextureLoader, texturePath);

  return (
    <mesh>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function Cube() {
  return (
    <mesh rotation={[0, 0, 0]}>
      <boxGeometry />
      <meshBasicMaterial color="green" />
    </mesh>
  );
}

function RocketEmulator(id: string) {
  const radius = 60
  let spaceshipPos = 
  const models = {
    spaceship: "./scene.gltf",
    planet_surface: planet_surface
  }

  return (
    <WindowComponent id={id} init_x={Math.floor(Math.random() * 50)} init_y={Math.floor(Math.random() * 50)}>
      <div id="rocket-emulator-container">
        <Canvas gl={{ antialias: true }}
          style={{ background: "#9ff0fc" }} // CSS background style
          onCreated={({ gl }) => {
            gl.setClearColor("#9ff0fc"); // Background color for the scene
          }}>
          <ambientLight intensity={2}/>
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Model url={models.spaceship} x_pos={0} y_pos={radius}/>
          <TexturedSphere texturePath={models.planet_surface} radius={radius}/>
          <OrbitControls />
        </Canvas>
      </div>
    </WindowComponent>
  );
}

export default RocketEmulator;

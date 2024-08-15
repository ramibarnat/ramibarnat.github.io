import "./RocketEmulator.css";
import WindowComponent from "../Windows/WindowComponent";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";


function Model(url: {url: string}) {
  console.log(typeof url.url, url.url)
  const { scene } = useGLTF(url.url) as any;
  return <primitive object={scene} scale={0.5} />;
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
  // const { rocket } = useGLTF("../../assets/3d/scene.gltf");
  const models = {
    spaceship: "./scene.gltf"
  }

  return (
    <WindowComponent id={id} init_x={Math.floor(Math.random() * 50)} init_y={Math.floor(Math.random() * 50)}>
      <div id="rocket-emulator-container">
        <Canvas gl={{ antialias: true }}
          style={{ background: "#9ff0fc" }} // CSS background style
          onCreated={({ gl }) => {
            gl.setClearColor("#9ff0fc"); // Background color for the scene
          }}>
          <ambientLight intensity={2} color={"red"}/>
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Model url={models.spaceship}/>
          <OrbitControls />
        </Canvas>
      </div>
    </WindowComponent>
  );
}

export default RocketEmulator;

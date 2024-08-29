import { forwardRef, useCallback, useEffect } from "react";
import "./RocketEmulator.css";
import WindowInsideBorder from "../Windows/WindowInsideBorder";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import * as THREE from 'three'
import planet_surface from '../../assets/3d/planet_surface.png'
import planet_clouds from '../../assets/3d/clouds.png'
import { useRef } from "react";
import { Physics, useBox } from "@react-three/cannon";

interface ModelConfig {
  url: string, 
  x_pos?: number, 
  y_pos?: number, 
  z_pos?: number,
  rotation?: [number,number,number],
  scale?: number,
}

interface SphereConfig {
  texturePath?: string, 
  radius: number, 
  rotation?: [number,number,number], 
  color?: string,
}

// We must use forwardRef so that we can pass a ref into this function
const Model = forwardRef<THREE.Object3D, ModelConfig>(({ url, x_pos = 0, y_pos = 0, z_pos = 0, rotation = [0,0,0], scale=1}, ref) => {
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


function TexturedSphere( {texturePath, radius, rotation=[0,0,0], color="#6eb564"}: SphereConfig) {
  // Load the texture
  let texture: any;
  if (texturePath) {
    texture = useLoader(THREE.TextureLoader, texturePath);
  }

  return (
    <mesh rotation={rotation}>
      <sphereGeometry args={[radius, 128, 128]} />
      {texturePath ? 
          ( <meshStandardMaterial color={color} map={texture} /> ) :
          ( <meshStandardMaterial color={color} /> )
      }
    </mesh>
  );
}


const RocketEmulatorComponent = () => {
  // *IMPORTANT*
  // We're required to create this seperate component
  // in order to use the useFrame hook since it has
  // to be within the Canvas component

  const radius = 1000;
  const rocketStartingPos = radius+100;
  const controllerRef = useRef<any>();
  const cameraRef = useRef<any>();
  
  // const [earthRef, api] = useSphere(() => ({

  // }))

  const [rocketRef, api] = useBox(() => ({
    mass: 5,
    position: [0, rocketStartingPos, 0], 
    rotation: [-Math.PI / 2, 0, -Math.PI / 2],
    args: [1, 1, 1], // Size of the box (x, y, z)
    onCollide: (e) => {
      // Handle collision
      console.log("Collision", e);
    },
  }));
  
  const models = {
    spaceship: "./scene.gltf",
    planet_surface: planet_surface,
    clouds: planet_clouds,
  }

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.code === "Space") { // literally engage thrusters, literally
      const direction = new THREE.Vector3(0,0,-1);

      // Getting the rotational direction from rocket api
      const unsubscribe = api.quaternion.subscribe((quaternion) => {
        // Convert the quaternion to a THREE.Quaternion object
        const quat = new THREE.Quaternion(quaternion[0], quaternion[1], quaternion[2], quaternion[3]);
        
        // Apply the quaternion to the direction vector
        direction.applyQuaternion(quat);
  
        // Apply force in the direction the rocket is facing
        api.applyForce([-direction.x * 20, -direction.y * 20, -direction.z * 20], [0, 0, 0]);
  
        // Unsubscribe after applying the force
        unsubscribe();
      });
      
    } 
  }, [api]);

  useFrame(() => {
    if (controllerRef.current) {
      const unsubscribe = api.position.subscribe((position) => {
        // Focus camera on the spaceship at all times
        controllerRef.current.target.set(position[0], position[1], position[2]);

        // Calculating gravity direction and magnitude
        const directionToPlanet = new THREE.Vector3()
        .subVectors(new THREE.Vector3(0,0,0), new THREE.Vector3(position[0],position[1],position[2]))
        .normalize();
        // const distance = rocketRef.current.position.distanceTo(new THREE.Vector3(0,0,0));
        const force = directionToPlanet.multiplyScalar(0.001);
        api.applyForce([force.x, force.y, force.z], [0, 0, 0]);

        unsubscribe()
      });
    }
  });

  useEffect(() => {
    let unsubscribe: any;
    if (controllerRef.current) { 
      // Subscribe to position updates
      unsubscribe = api.position.subscribe((position) => {
        // Update camera target to follow the rocket
        controllerRef.current.target.set(position[0], position[1], position[2]);
  
        // Calculate gravity direction and apply force towards the planet
        const directionToPlanet = new THREE.Vector3()
          .subVectors(new THREE.Vector3(0, 0, 0), new THREE.Vector3(position[0], position[1], position[2]))
          .normalize();
  
        // Apply a small force in the direction of gravity
        const force = directionToPlanet.multiplyScalar(1);
        api.applyForce([force.x, force.y, force.z], [0, 0, 0]);
      });
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      unsubscribe();
    }
  }, [api, controllerRef, handleKeyDown])

  return (
    <>
      <ambientLight intensity={2}/>
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />

      {/* Spaceship model */}
      <Model
        url={models.spaceship} 
        scale={0.1}
        y_pos={rocketStartingPos} 
        rotation= {[-Math.PI / 2, 0, -Math.PI / 2]}
        ref={rocketRef} />

      {/* Purple Planet */}
      {/* <TexturedSphere 
        texturePath={models.planet_surface} 
        radius={radius} 
        rotation={[Math.PI/2,0,0]}/> */}
      
      <TexturedSphere 
        texturePath={models.clouds}
        radius={radius}
        rotation={[Math.PI/2,0,0]}
        color={"#63d67b"} />

      <PerspectiveCamera makeDefault 
        position={[5, rocketStartingPos, 0]} 
        fov={75} 
        zoom={3} 
        ref={cameraRef} />
      <OrbitControls 
        enablePan={false} 
        ref={controllerRef}
        zoomSpeed={0.25}
        rotateSpeed={0.25} />
      
    </>
  )
}


function RocketEmulator({id}: {id:string}) {
  return (
    <WindowInsideBorder id={id}>
      <div id="rocket-emulator-container">
        <Canvas gl={{ antialias: true }}
          style={{ background: "#9ff0fc" }} // CSS background style
          onCreated={({ gl }) => {
            gl.setClearColor("#9ff0fc"); // Background color for the scene
          }}>
          <Physics gravity={[0, 0, 0]}>
            <RocketEmulatorComponent/>
          </Physics>
        </Canvas>
      </div>
    </WindowInsideBorder>
  );
}

export default RocketEmulator;

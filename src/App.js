import React, { useRef } from "react";
import logo from "./logo.svg";
import "./App.scss";
import { Canvas, useFrame } from "react-three-fiber";


const SpinningMesh = (props) => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
    <mesh castShadow ref={mesh} position={props.position}>
      <boxBufferGeometry attach="geometry" args={props.args} />
      <meshStandardMaterial attach="material" color={props.color} />
    </mesh>
  );
};

function App() {
  return (
    <React.Fragment>
      <Canvas shadowMap colorManagement camera={{ position: [-5, 2, 10], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <directionalLight
        castShadow
          position={[0, 10, 0]}
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-right={10}
          shadow-camera-left={-10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />

        <group>
          <mesh receiveShadow rotation={[-Math.PI/2, 0,0]} position={[0,-3,0]}>
            <planeBufferGeometry attach='geometry' args={[100,100]}/>
            <meshStandardMaterial attach='material' color='yellow'/>
            <shadowMaterial attach='material' opacity={.3}/>
          </mesh>
        </group>
        <SpinningMesh position={[0, 1, 0]} args={[3, 2, 2]} color="red" />
        <SpinningMesh position={[-3, 1, -5]} args={[3, 3, 3]} color="green" />
        <SpinningMesh position={[5, 1, -2]} args={[1, 2, 1]} color="blue" />
      </Canvas>
    </React.Fragment>
  );
}

export default App;

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';
import { Sun } from './Sun';
import { Planet } from './Planet';
import { Effects } from './Effects';
import { PORTFOLIO_DATA } from '../constants';
import { SatelliteData } from '../types';

interface SceneProps {
  selectedObject: { type: 'planet', index: number } | { type: 'satellite', data: SatelliteData } | { type: 'sun' } | null;
  onPlanetClick: (index: number) => void;
  onSunClick: () => void;
  onSatelliteClick: (satellite: SatelliteData) => void;
  showIntro: boolean;
  onUniverseClick: () => void;
}

export function Scene({ selectedObject, onPlanetClick, onSunClick, onSatelliteClick, showIntro, onUniverseClick }: SceneProps) {
  const { camera } = useThree();
  const controlsRef = useRef<any>();
  const [targetPosition, setTargetPosition] = useState(new Vector3(0, 20, 85));
  const [targetLookAt, setTargetLookAt] = useState(new Vector3(0, 0, 0));
  const [isNavigating, setIsNavigating] = useState(true); // Start with intro animation
  const planetPositions = useMemo(() => PORTFOLIO_DATA.map(_ => new Vector3(0, 0, 0)), []);

  useEffect(() => {
    setIsNavigating(true); // Trigger navigation on any focus change

    if (showIntro) {
      setTargetPosition(new Vector3(0, 5, 50));
      setTargetLookAt(new Vector3(0, 0, 0));
      return;
    }

    if (selectedObject?.type === 'planet') {
      const planet = PORTFOLIO_DATA[selectedObject.index];
      const planetPos = planetPositions[selectedObject.index];
      const distance = planet.size * 5;
      const cameraPos = new Vector3(planetPos.x, planetPos.y + planet.size * 1.5, planetPos.z + distance);
      setTargetPosition(cameraPos);
      setTargetLookAt(planetPos);
    } else {
      // Return to sun view
      setTargetPosition(new Vector3(0, 5, 50));
      setTargetLookAt(new Vector3(0, 0, 0));
    }
  }, [selectedObject, showIntro, planetPositions]);

  useFrame(() => {
    if (isNavigating) {
      camera.position.lerp(targetPosition, 0.04);
      if (controlsRef.current) {
        controlsRef.current.target.lerp(targetLookAt, 0.04);
      }
      
      // Stop navigating when close to the target
      if (camera.position.distanceTo(targetPosition) < 0.1) {
        camera.position.copy(targetPosition);
        if (controlsRef.current) {
          controlsRef.current.target.copy(targetLookAt);
        }
        setIsNavigating(false);
      }
    }
    
    if (controlsRef.current) {
      controlsRef.current.update();
    }
  });

  return (
    <>
      <mesh onClick={onUniverseClick} position={[0, 0, -1000]}>
        <planeGeometry args={[2000, 2000]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#FFDDBB" />
      <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <Sun onClick={onSunClick} />
      
      {PORTFOLIO_DATA.map((planetData, index) => (
        <Planet
          key={planetData.id}
          planetData={planetData}
          isFocused={selectedObject?.type === 'planet' && selectedObject.index === index}
          onPlanetClick={() => onPlanetClick(index)}
          onSatelliteClick={onSatelliteClick}
          updatePosition={(pos) => planetPositions[index].copy(pos)}
        />
      ))}
      
      <OrbitControls
        ref={controlsRef}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={150}
        onStart={() => setIsNavigating(false)} // User interaction stops navigation
      />
      <Effects />
    </>
  );
}
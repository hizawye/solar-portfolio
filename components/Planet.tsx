
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3, Group } from 'three';
import { Html } from '@react-three/drei';
import { PlanetData, SatelliteData } from '../types';
import { Satellite } from './Satellite';

interface PlanetProps {
  planetData: PlanetData;
  isFocused: boolean;
  onPlanetClick: () => void;
  onSatelliteClick: (satellite: SatelliteData) => void;
  updatePosition: (position: Vector3) => void;
}

export function Planet({ planetData, isFocused, onPlanetClick, onSatelliteClick, updatePosition }: PlanetProps) {
  const groupRef = useRef<Group>(null!);
  const meshRef = useRef<Mesh>(null!);
  const randomStartAngle = useMemo(() => Math.random() * Math.PI * 2, []);
  
  useFrame(({ clock }) => {
    const angle = randomStartAngle + clock.getElapsedTime() * planetData.rotationSpeed * 5;
    const x = Math.cos(angle) * planetData.orbitRadius;
    const z = Math.sin(angle) * planetData.orbitRadius;
    if (groupRef.current) {
      groupRef.current.position.set(x, 0, z);
      updatePosition(groupRef.current.position);
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onClick={onPlanetClick}
      >
        <sphereGeometry args={[planetData.size, 32, 32]} />
        <meshStandardMaterial
          color={planetData.color}
          emissive={isFocused ? planetData.emissiveColor : '#000000'}
          emissiveIntensity={isFocused ? 1.5 : 0}
          toneMapped={false}
        />
        {!isFocused && (
          <Html position={[0, planetData.size + 0.5, 0]} center>
            <div className="bg-black/50 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap select-none">
              {planetData.name}
            </div>
          </Html>
        )}
      </mesh>
      
      {isFocused && planetData.satellites.map((sat, index) => (
        <Satellite
          key={sat.id}
          satelliteData={sat}
          planetSize={planetData.size}
          index={index}
          total={planetData.satellites.length}
          onClick={() => onSatelliteClick(sat)}
        />
      ))}
    </group>
  );
}
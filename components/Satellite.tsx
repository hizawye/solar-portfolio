
import React, { useRef } from 'react';
import { Html } from '@react-three/drei';
import { a, useSpring } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { SatelliteData } from '../types';

interface SatelliteProps {
  satelliteData: SatelliteData;
  planetSize: number;
  index: number;
  total: number;
  onClick: () => void;
}

export function Satellite({ satelliteData, planetSize, index, total, onClick }: SatelliteProps) {
  const meshRef = useRef<Mesh>(null!);

  const orbitRadius = planetSize + 2.5 + (total > 5 ? Math.floor(index / 5) * 1.5 : 0);
  const angleOffset = (index % 5) * (Math.PI * 2 / Math.min(total, 5));
  
  useFrame(({ clock }) => {
      const angle = clock.getElapsedTime() * 0.3 + angleOffset;
      const x = Math.cos(angle) * orbitRadius;
      const z = Math.sin(angle) * orbitRadius;
      if(meshRef.current) {
          meshRef.current.position.set(x, 0, z);
      }
  });

  const springProps = useSpring({
    scale: 1,
    from: { scale: 0 },
    config: { duration: 500 },
    delay: 500 + index * 100,
  });

  return (
    <a.group
      ref={meshRef}
      onClick={onClick}
      scale={springProps.scale}
    >
      <mesh>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={'#aaaaaa'} emissive={'#333333'} emissiveIntensity={0.2} />
      </mesh>
      <Html position={[0, 0.8, 0]} center distanceFactor={10} onClick={onClick}>
        <div className="bg-black/50 text-white px-2 py-1 rounded-md text-xs whitespace-nowrap select-none">
          {satelliteData.name}
        </div>
      </Html>
    </a.group>
  );
}
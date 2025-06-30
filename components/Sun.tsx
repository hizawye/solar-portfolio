
import React from 'react';
import { Html } from '@react-three/drei';

interface SunProps {
  onClick: () => void;
}

export function Sun({ onClick }: SunProps) {
  return (
    <mesh
      onClick={onClick}
      position={[0, 0, 0]}
    >
      <sphereGeometry args={[4, 32, 32]} />
      <meshStandardMaterial
        color="#FFDDBB"
        emissive="#FF9900"
        emissiveIntensity={2}
        toneMapped={false}
      />
      <Html position={[0, 4.5, 0]} center>
        <div className="bg-black/50 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap select-none">
          Bio
        </div>
      </Html>
    </mesh>
  );
}

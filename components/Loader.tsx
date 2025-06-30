
import React from 'react';
import { Html } from '@react-three/drei';

export function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-white">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-400"></div>
        <p className="mt-4 text-lg">Entering Universe...</p>
      </div>
    </Html>
  );
}

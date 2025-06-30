
import React, { useState, useCallback, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Scene } from './components/Scene';
import { UI } from './components/UI';
import { Loader } from './components/Loader';
import { NavigationGuide } from './components/NavigationGuide';
import { SatelliteData } from './types';
import { PORTFOLIO_DATA } from './constants';

export default function App() {
  const [selectedObject, setSelectedObject] = useState<{ type: 'planet', index: number } | { type: 'satellite', data: SatelliteData } | { type: 'sun' } | null>(null);
  const [isBioOpen, setBioOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 5000); // Cinematic intro duration
    return () => clearTimeout(timer);
  }, []);

  const handlePlanetClick = useCallback((index: number) => {
    setSelectedObject(prev => (prev?.type === 'planet' && prev.index === index ? null : { type: 'planet', index }));
    setBioOpen(false);
  }, []);

  const handleSunClick = useCallback(() => {
    setSelectedObject({ type: 'sun' });
    setBioOpen(true);
  }, []);
  
  const handleSatelliteClick = useCallback((satellite: SatelliteData) => {
    setSelectedObject({ type: 'satellite', data: satellite });
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedObject(null);
    setBioOpen(false);
  }, []);

  const handleUniverseClick = useCallback(() => {
    setSelectedObject(null);
    setBioOpen(false);
  }, []);

  const navigate = (direction: 'next' | 'prev') => {
    const numPlanets = PORTFOLIO_DATA.length;
    let newIndex: number;
    if (selectedObject?.type === 'planet') {
      newIndex = direction === 'next' ? (selectedObject.index + 1) % numPlanets : (selectedObject.index - 1 + numPlanets) % numPlanets;
    } else {
      newIndex = direction === 'next' ? 0 : numPlanets - 1;
    }
    setSelectedObject({ type: 'planet', index: newIndex });
    setBioOpen(false);
  };

  return (
    <div className="w-screen h-screen bg-black text-white font-sans">
      <Suspense fallback={<Loader />}>
        <Canvas camera={{ fov: 45, position: [0, 20, 85] }}>
          <Scene
            selectedObject={selectedObject}
            onPlanetClick={handlePlanetClick}
            onSunClick={handleSunClick}
            onSatelliteClick={handleSatelliteClick}
            showIntro={showIntro}
            onUniverseClick={handleUniverseClick}
          />
        </Canvas>
      </Suspense>
      <UI
        selectedObject={selectedObject}
        isBioOpen={isBioOpen}
        onCloseModal={handleCloseModal}
        onNavigate={navigate}
        onSatelliteSelect={handleSatelliteClick}
        onPlanetClick={handlePlanetClick}
        onSunClick={handleSunClick}
      />
      <NavigationGuide isVisible={showGuide} />
      <button
        onClick={() => setShowGuide(!showGuide)}
        className="absolute bottom-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white z-50"
      >
        {showGuide ? 'Hide Guide' : 'Show Guide'}
      </button>
    </div>
  );
}
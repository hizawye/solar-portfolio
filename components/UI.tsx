
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SatelliteData } from '../types';
import { BIO_DATA, PORTFOLIO_DATA } from '../constants';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';

interface UIProps {
  focusedPlanetIndex: number | null;
  selectedSatellite: SatelliteData | null;
  isBioOpen: boolean;
  onCloseModal: () => void;
  onNavigate: (direction: 'next' | 'prev') => void;
  onSatelliteSelect: (satellite: SatelliteData) => void;
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 15, stiffness: 200 } },
  exit: { opacity: 0, scale: 0.9, y: 50, transition: { duration: 0.2 } },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export function UI({ focusedPlanetIndex, selectedSatellite, isBioOpen, onCloseModal, onNavigate, onSatelliteSelect }: UIProps) {
  const currentPlanet = focusedPlanetIndex !== null ? PORTFOLIO_DATA[focusedPlanetIndex] : null;

  const ModalContent = () => {
    if (isBioOpen) {
      return (
        <>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500 mb-2">{BIO_DATA.name}</h2>
          <h3 className="text-xl text-amber-200 mb-4">{BIO_DATA.title}</h3>
          <p className="text-gray-300 leading-relaxed">{BIO_DATA.summary}</p>
        </>
      );
    }
    if (selectedSatellite) {
      return (
        <>
          <h2 className="text-3xl font-bold text-cyan-300 mb-2">{selectedSatellite.name}</h2>
          {selectedSatellite.imageUrl && <img src={selectedSatellite.imageUrl} alt={selectedSatellite.name} className="w-full h-48 object-cover rounded-lg my-4" />}
          <p className="text-gray-300 leading-relaxed mb-4">{selectedSatellite.description}</p>
          {selectedSatellite.techStack && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedSatellite.techStack.map(tech => (
                <span key={tech} className="bg-gray-700 text-cyan-200 text-xs font-medium px-2.5 py-1 rounded-full">{tech}</span>
              ))}
            </div>
          )}
          {selectedSatellite.liveUrl && (
            <a href={selectedSatellite.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-2 px-4 rounded-lg transition-colors">
              View Live
            </a>
          )}
        </>
      );
    }
    return null;
  };

  return (
    <>
      <div className="absolute top-4 left-4 text-white max-w-xs pointer-events-none">
        <AnimatePresence>
            <motion.h1
                key={currentPlanet ? currentPlanet.id : 'universe'}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="text-xl font-bold tracking-widest uppercase mb-2"
            >
                {currentPlanet ? currentPlanet.name : "Portfolio Universe"}
            </motion.h1>
        </AnimatePresence>
        
        <AnimatePresence>
            {currentPlanet && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.2 } }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-start pl-2 border-l-2 border-white/20 pointer-events-auto"
                >
                    {currentPlanet.satellites.map(satellite => (
                        <motion.button
                            key={satellite.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => onSatelliteSelect(satellite)}
                            className="text-sm text-gray-300 hover:text-white hover:underline transition-colors text-left py-0.5"
                        >
                            {satellite.name}
                        </motion.button>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8">
        <button onClick={() => onNavigate('prev')} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <ArrowLeft size={24} />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8">
        <button onClick={() => onNavigate('next')} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <ArrowRight size={24} />
        </button>
      </div>
      
      <AnimatePresence>
        {(isBioOpen || selectedSatellite) && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onCloseModal}
          >
            <motion.div
              variants={modalVariants}
              className="bg-gray-900/80 border border-gray-700 rounded-2xl p-8 max-w-2xl w-11/12 max-h-[90vh] overflow-y-auto relative shadow-2xl shadow-cyan-500/10"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={onCloseModal} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
              <ModalContent />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
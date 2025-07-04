'use client';

import { motion } from 'framer-motion';

interface ImagePlaceholderProps {
  width?: number;
  height?: number;
  className?: string;
  type?: 'photo' | 'project' | 'video';
}

export const ImagePlaceholder = ({ 
  width = 400, 
  height = 300, 
  className = '',
  type = 'photo'
}: ImagePlaceholderProps) => {
  const gradients = {
    photo: 'from-emerald-400 via-cyan-400 to-blue-500',
    project: 'from-purple-400 via-pink-400 to-red-400',
    video: 'from-orange-400 via-red-400 to-pink-400'
  };

  const patterns = {
    photo: (
      <svg className="w-full h-full opacity-10" viewBox="0 0 100 100">
        <defs>
          <pattern id="photo-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="2" fill="white" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#photo-pattern)" />
      </svg>
    ),
    project: (
      <svg className="w-full h-full opacity-10" viewBox="0 0 100 100">
        <defs>
          <pattern id="project-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="5" height="5" fill="white" />
            <rect x="5" y="5" width="5" height="5" fill="white" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#project-pattern)" />
      </svg>
    ),
    video: (
      <svg className="w-full h-full opacity-20" viewBox="0 0 100 100">
        <polygon points="40,30 70,50 40,70" fill="white" />
      </svg>
    )
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${gradients[type]}`}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      />
      
      <div className="absolute inset-0">
        {patterns[type]}
      </div>
      
      <motion.div 
        className="absolute inset-0 bg-black/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      />
      
      {type === 'video' && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 5v10l8-5z" />
            </svg>
          </div>
        </motion.div>
      )}
    </div>
  );
}; 
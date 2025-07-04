'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Twitter, Mail, Home, Camera, List, LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { TypingAnimation } from './components/TypingAnimation';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'projects-detail', icon: List, label: 'Projects Detail' },
    { id: 'gallery', icon: Camera, label: 'Gallery' },
    { id: 'github', icon: Github, label: 'GitHub', external: 'https://github.com/tamo2918' },
    { id: 'twitter', icon: Twitter, label: 'Twitter', external: 'https://x.com/tamodev' },
    { id: 'mail', icon: Mail, label: 'Mail', external: 'mailto:tamodev8@gmail.com' },
  ];

  interface TabType {
    id: string;
    icon: LucideIcon;
    label: string;
    external?: string;
  }

  const handleTabClick = (tab: TabType) => {
    if (tab.external) {
      window.open(tab.external, '_blank');
    } else {
      setActiveTab(tab.id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'projects-detail' && (
            <motion.div
              key="projects-detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="h-full min-h-[calc(100vh-8rem)] py-8"
            >
              <ProjectsDetailSection />
            </motion.div>
          )}

          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="h-full flex items-center justify-center min-h-[calc(100vh-8rem)]"
            >
              <HomeSection />
            </motion.div>
          )}
          

          
          {activeTab === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="h-full min-h-[calc(100vh-8rem)] py-8 pb-0"
            >
              <GallerySection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/80 backdrop-blur-md rounded-full px-4 md:px-8 py-3 md:py-4 shadow-2xl border border-gray-200/50">
          <div className="flex items-center space-x-2 md:space-x-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id && !tab.external;
              
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => handleTabClick(tab)}
                  className={`relative p-2 md:p-3 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-black text-white shadow-lg'
                      : 'text-gray-600 hover:text-black hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={16} className="md:w-5 md:h-5" />
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-black rounded-full"
                      style={{ zIndex: -1 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const HomeSection = () => {
  return (
    <div className="relative overflow-hidden px-4 py-8 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {/* Left Side - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 shadow-2xl relative overflow-hidden"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/images/profile/profile.jpg"
                alt="Tatsuki Morita Profile"
                fill
                quality={100}
                sizes="(max-width: 768px) 128px, (max-width: 1024px) 192px, 256px"
                priority
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Right Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center md:text-left space-y-6"
          >
            {/* Main Greeting */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.span
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#3b82f6" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Hi
              </motion.span>
              <span className="mx-3">👋</span>
              <motion.span
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#3b82f6" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                I&apos;m Tatsuki
              </motion.span>
            </motion.h1>

            {/* About Me */}
            <motion.h2
              className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ scale: 1.02, color: "#374151" }}
            >
              About Me
            </motion.h2>

            {/* Description */}
            <motion.div
              className="space-y-3 text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <motion.p
                whileHover={{ scale: 1.01, color: "#4b5563" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                I&apos;m a high school app developer who loves AI and is eager to take on the challenge of developing LLMs.
              </motion.p>
            </motion.div>

            {/* Location Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex justify-center md:justify-start"
            >
              <motion.span
                className="inline-flex items-center gap-2 text-sm text-gray-500 px-4 py-2 bg-gray-100 rounded-full"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "#f3f4f6",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span>📍</span>
                from Shiga, Japan
              </motion.span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};



const GallerySection = () => {
  const photos = [
    { id: 1, src: '/images/gallery/photo-1.jpg', alt: 'Gallery Photo 1' },
    { id: 2, src: '/images/gallery/photo-2.jpg', alt: 'Gallery Photo 2' },
    { id: 3, src: '/images/gallery/photo-3.jpg', alt: 'Gallery Photo 3' },
    { id: 4, src: '/images/gallery/photo-4.jpg', alt: 'Gallery Photo 4' },
    { id: 5, src: '/images/gallery/photo-5.jpg', alt: 'Gallery Photo 5' },
    { id: 6, src: '/images/gallery/photo-6.jpg', alt: 'Gallery Photo 6' },
    { id: 7, src: '/images/gallery/photo-7.jpg', alt: 'Gallery Photo 7' }
  ];

  return (
    <div className="p-2 md:p-4 max-w-6xl mx-auto mb-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 mb-0">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="aspect-square rounded-none overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={800}
              height={800}
              quality={100}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index < 4}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ProjectsDetailSection = () => {
  const projects = [
    {
      title: 'Kotoba+',
      description: 'An app that lets you look up words and save them to knowledge cards.',
      year: '2025'
    },
    {
      title: 'Lala+',
      description: 'A learning app where AI generates questions from images.',
      year: '2025'
    },
    {
      title: 'Mojisu',
      description: 'A sleek app that counts characters.',
      year: '2025'
    },
    {
      title: 'BranchDo',
      description: 'An app where AI breaks down tasks into smaller steps.',
      year: '2024'
    },
    {
      title: 'Osero',
      description: 'A simple Othello game.',
      year: '2023'
    },
    
  ];

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="space-y-8 md:space-y-12">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex items-start justify-between border-b border-gray-100 pb-6 md:pb-8 group cursor-pointer hover:bg-gray-50/50 transition-colors duration-300 rounded-lg p-4 md:p-6 -mx-4 md:-mx-6"
          >
            <div className="flex-1 space-y-2">
              <h3 className="text-lg md:text-xl font-medium text-gray-900 group-hover:text-black transition-colors">
                <TypingAnimation 
                  text={project.title}
                  delay={index * 10}
                  speed={0.3}
                />
              </h3>
              <p className="text-sm md:text-base text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed">
                <TypingAnimation 
                  text={project.description}
                  delay={index * 10 + project.title.length * 0.3 + 25}
                  speed={0.3}
                />
              </p>
            </div>
            <div className="text-sm md:text-base text-gray-400 font-mono ml-6 md:ml-8">
              <TypingAnimation 
                text={project.year}
                delay={index * 10 + project.title.length * 0.3 + project.description.length * 0.3 + 50}
                speed={0.5}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;

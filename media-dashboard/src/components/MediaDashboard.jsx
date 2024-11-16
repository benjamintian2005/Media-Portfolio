import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Github, Twitter, Instagram, Music, Play } from 'lucide-react';
import {mediaData} from './data.js'


const MediaDashboard = () => {
  // Sample data structure remains the same as before
  const profile = {
    name: "Benjamin Tian",
    socials: {
      github: "https://github.com/username",
      twitter: "https://twitter.com/username",
      instagram: "https://instagram.com/username"
    }
  };

  

  const ResponsiveCarousel = ({ title, items, section }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const containerRef = useRef(null);
    const [showControls, setShowControls] = useState(true);
    const [itemsPerView, setItemsPerView] = useState(0);

    useEffect(() => {
      const updateItemsPerView = () => {
        if (containerRef.current) {
          const containerWidth = containerRef.current.offsetWidth;
          const itemWidth = 256; // w-64 = 16rem = 256px
          const newItemsPerView = Math.floor(containerWidth / itemWidth);
          setItemsPerView(newItemsPerView);
          setShowControls(items.length > newItemsPerView);
        }
      };

      updateItemsPerView();
      window.addEventListener('resize', updateItemsPerView);
      return () => window.removeEventListener('resize', updateItemsPerView);
    }, [items.length]);

    const scroll = (direction) => {
      const container = containerRef.current;
      if (container) {
        const itemWidth = 256; // w-64 = 16rem = 256px
        const scrollAmount = itemWidth * itemsPerView;
        const newPosition = direction === 'next' 
          ? Math.min(scrollPosition + scrollAmount, (items.length - itemsPerView) * itemWidth)
          : Math.max(0, scrollPosition - scrollAmount);
        
        container.scrollTo({ left: newPosition, behavior: 'smooth' });
        setScrollPosition(newPosition);
      }
    };

    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="relative">
          <div className="flex items-center">
            {showControls && (
              <button 
                onClick={() => scroll('prev')}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 mr-2"
                disabled={scrollPosition === 0}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            
            <div 
              ref={containerRef}
              className="flex overflow-hidden scroll-smooth"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className="w-64 p-2 flex-shrink-0"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <div className="bg-white rounded-lg shadow-lg p-4">
                    <img src={item.image} alt={item.title} className="object-scale-down w-full h-48 object-cover rounded mb-2 " />
                    <h3 className="font-semibold">{item.title}</h3>
                    {item.artist && <p className="text-gray-600">{item.artist}</p>}
                    {item.author && <p className="text-gray-600">{item.author}</p>}
                    {item.year && <p className="text-gray-600">{item.year}</p>}
                    {item.url && (
                      <button className="mt-2 flex items-center text-blue-500 hover:text-blue-700">
                        <Play className="w-4 h-4 mr-1" /> Play
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {showControls && (
              <button 
                onClick={() => scroll('next')}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 ml-2"
                disabled={scrollPosition >= (items.length - itemsPerView) * 256}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-8">
        {/* Profile Section */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">{profile.name}'s Media Collection</h1>
          <div className="flex space-x-4">
            <a href={profile.socials.github} className="text-gray-600 hover:text-gray-900">
              <Github className="w-6 h-6" />
            </a>
            <a href={profile.socials.twitter} className="text-gray-600 hover:text-gray-900">
              <Twitter className="w-6 h-6" />
            </a>
            <a href={profile.socials.instagram} className="text-gray-600 hover:text-gray-900">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Currently Consuming Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Currently Consuming</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold">Watching</h3>
              <p>{mediaData.currentlyConsuming.watching.title}</p>
              <p className="text-gray-600">{mediaData.currentlyConsuming.watching.progress}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold">Playing</h3>
              <p>{mediaData.currentlyConsuming.playing.title}</p>
              <p className="text-gray-600">{mediaData.currentlyConsuming.playing.progress}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold">Reading</h3>
              <p>{mediaData.currentlyConsuming.reading.title}</p>
              <p className="text-gray-600">{mediaData.currentlyConsuming.reading.progress}</p>
            </div>
          </div>
        </div>

        {/* Media Carousels */}
        <ResponsiveCarousel title="Favorite Movies" items={mediaData.movies} section="movies" />
        <ResponsiveCarousel title="Favorite Books" items={mediaData.books} section="books" />
        <ResponsiveCarousel title="Favorite Games" items={mediaData.games} section="games" />

        <ResponsiveCarousel title="Favorite Songs" items={mediaData.songs} section="songs" />
      </div>
    </div>
  );
};

export default MediaDashboard;
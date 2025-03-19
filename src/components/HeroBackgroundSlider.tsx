
import { useEffect, useState } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

// Professional workout images
const sliderImages = [
  "/images/hero-workout-1.jpg",
  "/images/hero-workout-2.jpg",
  "/images/hero-workout-3.jpg"
];

const HeroBackgroundSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-10" /> {/* Overlay for better text contrast */}
      
      {sliderImages.map((image, index) => (
        <div 
          key={image}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image}
            alt={`Fitness workout ${index + 1}`}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}
    </div>
  );
};

export default HeroBackgroundSlider;


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
  "/lovable-uploads/856aea58-7fc8-4e06-aa29-3a1027870748.png",
  "/lovable-uploads/573a9ea8-03f9-4239-b0ae-1a6198d64efb.png",
  "/lovable-uploads/dd0ae3cf-fb65-4810-8646-1435dd21115e.png"
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
      <div className="absolute inset-0 bg-black/40 z-10" /> {/* Reduced opacity for better image visibility */}
      
      {sliderImages.map((image, index) => (
        <div 
          key={image}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1500 ease-in-out hero-slider-transition ${
            index === currentIndex ? 'hero-slider-active' : 'hero-slider-inactive'
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

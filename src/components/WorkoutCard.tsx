
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/custom-badge";
import { Clock, Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WorkoutCardProps {
  title: string;
  description: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  imageUrl?: string;
  videoUrl?: string;
  slug: string;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  title,
  description,
  duration,
  level,
  imageUrl,
  slug
}) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      {imageUrl && (
        <div className="h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge variant={
            level === 'beginner' ? 'outline' : 
            level === 'intermediate' ? 'secondary' : 'default'
          }>
            {level}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-1 mt-1">
          <Clock className="h-3.5 w-3.5" /> {duration}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </CardContent>
      <CardFooter>
        <Link to={`/workout-details/${slug}`} className="w-full">
          <Button className="w-full">
            <Dumbbell className="mr-2 h-4 w-4" />
            Start Workout
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default WorkoutCard;


import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Badge } from "@/components/ui/custom-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { CalendarDays, ChevronLeft, Clock, Dumbbell, Flame, Play } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';

interface Exercise {
  id: string;
  name: string;
  duration: string;
  sets?: number;
  reps?: number;
  videoUrl?: string;
}

interface Workout {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  caloriesBurn: number;
  imageUrl?: string;
  videoUrl?: string;
  exercises: Exercise[];
}

// Demo workout data - in real app, this would come from Supabase
const workouts: Record<string, Workout> = {
  'flat-tummy': {
    id: '1',
    slug: 'flat-tummy',
    title: 'Flat Tummy Workout',
    description: 'A targeted workout to strengthen your core and flatten your tummy.',
    level: 'intermediate',
    duration: '25 min',
    caloriesBurn: 180,
    imageUrl: '/images/workouts/flat-tummy.jpg',
    videoUrl: 'https://www.youtube.com/embed/2pLT-olgUJs',
    exercises: [
      {
        id: '1-1',
        name: 'Crunches',
        duration: '45 sec',
        sets: 3,
        reps: 15,
        videoUrl: 'https://www.youtube.com/embed/4hmQS5eBM2A'
      },
      {
        id: '1-2',
        name: 'Russian Twists',
        duration: '60 sec',
        sets: 3,
        reps: 20,
        videoUrl: 'https://www.youtube.com/embed/wkD8rjkodUI'
      },
      {
        id: '1-3',
        name: 'Mountain Climbers',
        duration: '45 sec',
        sets: 3,
        reps: 20,
        videoUrl: 'https://www.youtube.com/embed/nmwgirgXLYM'
      }
    ]
  },
  'ass-workout': {
    id: '2',
    slug: 'ass-workout',
    title: 'Glutes Strengthening Workout',
    description: 'Build stronger glutes with this targeted workout routine.',
    level: 'intermediate',
    duration: '30 min',
    caloriesBurn: 220,
    imageUrl: '/images/workouts/glutes.jpg',
    videoUrl: 'https://www.youtube.com/embed/i1ZzdBgLtZg',
    exercises: [
      {
        id: '2-1',
        name: 'Squats',
        duration: '60 sec',
        sets: 4,
        reps: 15,
        videoUrl: 'https://www.youtube.com/embed/YaXPRqUwItQ'
      },
      {
        id: '2-2',
        name: 'Hip Thrusts',
        duration: '45 sec',
        sets: 3,
        reps: 12,
        videoUrl: 'https://www.youtube.com/embed/Zp26q4BY5HE'
      },
      {
        id: '2-3',
        name: 'Lunges',
        duration: '60 sec',
        sets: 3,
        reps: 10,
        videoUrl: 'https://www.youtube.com/embed/QOVaHwm-Q6U'
      }
    ]
  },
  'thigh-workout': {
    id: '3',
    slug: 'thigh-workout',
    title: 'Thigh Toning Workout',
    description: 'Tone and strengthen your thighs with this effective routine.',
    level: 'beginner',
    duration: '20 min',
    caloriesBurn: 150,
    imageUrl: '/images/workouts/thigh.jpg',
    videoUrl: 'https://www.youtube.com/embed/RZF1EHSYFHE',
    exercises: [
      {
        id: '3-1',
        name: 'Sumo Squats',
        duration: '45 sec',
        sets: 3,
        reps: 15,
        videoUrl: 'https://www.youtube.com/embed/Z7dygs4nQJw'
      },
      {
        id: '3-2',
        name: 'Side Lunges',
        duration: '60 sec',
        sets: 3,
        reps: 12,
        videoUrl: 'https://www.youtube.com/embed/tpbKyaIkJRU'
      },
      {
        id: '3-3',
        name: 'Fire Hydrants',
        duration: '45 sec',
        sets: 3,
        reps: 20,
        videoUrl: 'https://www.youtube.com/embed/pm51PILr3qM'
      }
    ]
  },
  'full-tummy-routine': {
    id: '4',
    slug: 'full-tummy-routine',
    title: 'Complete Flat Tummy Routine',
    description: 'A comprehensive workout routine designed to target all core muscles.',
    level: 'advanced',
    duration: '40 min',
    caloriesBurn: 300,
    imageUrl: '/images/workouts/full-tummy.jpg',
    videoUrl: 'https://www.youtube.com/embed/AnYl6Nk9GOA',
    exercises: [
      {
        id: '4-1',
        name: 'Plank',
        duration: '60 sec',
        sets: 3,
        videoUrl: 'https://www.youtube.com/embed/ASdvN_XEl_c'
      },
      {
        id: '4-2',
        name: 'Bicycle Crunches',
        duration: '45 sec',
        sets: 3,
        reps: 20,
        videoUrl: 'https://www.youtube.com/embed/Iwyvozckjak'
      },
      {
        id: '4-3',
        name: 'Leg Raises',
        duration: '60 sec',
        sets: 3,
        reps: 15,
        videoUrl: 'https://www.youtube.com/embed/JB2oyawG9KI'
      },
      {
        id: '4-4',
        name: 'Scissor Kicks',
        duration: '45 sec',
        sets: 3,
        videoUrl: 'https://www.youtube.com/embed/WoNCIBVLbgY'
      }
    ]
  }
};

const WorkoutDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [sleepHours, setSleepHours] = useState<number>(7);
  const { toast } = useToast();
  
  useEffect(() => {
    if (slug && workouts[slug]) {
      setWorkout(workouts[slug]);
      // Default to first exercise
      setSelectedExercise(workouts[slug].exercises[0]);
    }
  }, [slug]);

  const handleNotificationPermission = () => {
    if (!("Notification" in window)) {
      toast({
        title: "Notification Error",
        description: "This browser does not support notifications",
        variant: "destructive",
      });
      return;
    }

    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        // Schedule notification for tomorrow
        const now = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(now.getDate() + 1);
        tomorrow.setHours(9, 0, 0, 0); // Set to 9 AM
        
        const timeUntilNotification = tomorrow.getTime() - now.getTime();
        
        toast({
          title: "Reminder Set",
          description: "You'll be reminded about your workout tomorrow at 9 AM",
        });
        
        // For demo purposes, we'll just show a notification in 5 seconds
        // In a real app, you would use a service worker or backend
        setTimeout(() => {
          new Notification("Workout Reminder", {
            body: `Time for your ${workout?.title} workout!`,
            icon: "/favicon.ico"
          });
        }, 5000);
      } else {
        toast({
          title: "Permission Denied",
          description: "Notification permission was denied",
          variant: "destructive",
        });
      }
    });
  };

  if (!workout) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-12">
          <h2>Workout not found</h2>
          <Link to="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="mb-6">
          <Link to="/dashboard" className="flex items-center text-gray-600 mb-4 hover:text-primary">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Dashboard
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{workout.title}</h1>
              <div className="flex items-center gap-4">
                <Badge variant={
                  workout.level === 'beginner' ? 'outline' : 
                  workout.level === 'intermediate' ? 'secondary' : 'default'
                }>
                  {workout.level}
                </Badge>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="h-4 w-4 mr-1" /> {workout.duration}
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Flame className="h-4 w-4 mr-1" /> {workout.caloriesBurn} calories
                </div>
              </div>
            </div>
            
            <Button onClick={handleNotificationPermission}>
              <CalendarDays className="h-4 w-4 mr-2" /> Set Workout Reminder
            </Button>
          </div>
          
          <p className="text-gray-600 mb-6">{workout.description}</p>
        </div>

        {/* Main video */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden mb-8">
          {workout.videoUrl ? (
            <div className="aspect-video w-full">
              <iframe 
                width="100%" 
                height="100%" 
                src={workout.videoUrl} 
                title={workout.title}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          ) : (
            <div className="aspect-video w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <Play className="h-16 w-16 text-gray-400" />
            </div>
          )}
        </div>

        {/* Workout Exercises */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <h2 className="text-xl font-bold mb-4">Exercises</h2>
            <div className="space-y-3">
              {workout.exercises.map((exercise) => (
                <div 
                  key={exercise.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    selectedExercise?.id === exercise.id 
                      ? 'bg-primary/10 border border-primary/30' 
                      : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setSelectedExercise(exercise)}
                >
                  <h3 className="font-medium mb-1">{exercise.name}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{exercise.duration}</span>
                    {exercise.sets && exercise.reps ? (
                      <span>{exercise.sets} sets × {exercise.reps} reps</span>
                    ) : exercise.sets ? (
                      <span>{exercise.sets} sets</span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            {selectedExercise && (
              <div>
                <h2 className="text-xl font-bold mb-4">{selectedExercise.name}</h2>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden mb-4">
                  {selectedExercise.videoUrl ? (
                    <div className="aspect-video w-full">
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src={selectedExercise.videoUrl} 
                        title={selectedExercise.name}
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  ) : (
                    <div className="aspect-video w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <Play className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                  <h3 className="font-medium mb-2">Instructions:</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Perform {selectedExercise.name} for {selectedExercise.duration}.
                    {selectedExercise.sets && selectedExercise.reps ? 
                      ` Complete ${selectedExercise.sets} sets of ${selectedExercise.reps} repetitions each.` : 
                      selectedExercise.sets ? ` Complete ${selectedExercise.sets} sets.` : ''}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sleep Tracking */}
        <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-4">Track Your Progress</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sleep Hours Tracking */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Daily Sleep Hours</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-500">Hours of Sleep</span>
                      <span className="font-medium">{sleepHours} hours</span>
                    </div>
                    <Slider
                      defaultValue={[7]}
                      max={12}
                      min={0}
                      step={0.5}
                      onValueChange={(value) => setSleepHours(value[0])}
                    />
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p className="mb-2">Sleep quality recommendation:</p>
                    {sleepHours < 6 ? (
                      <p className="text-red-500">You're not getting enough sleep. Aim for at least 7-8 hours for optimal recovery.</p>
                    ) : sleepHours > 9 ? (
                      <p className="text-yellow-500">You might be oversleeping. 7-9 hours is typically ideal for adults.</p>
                    ) : (
                      <p className="text-green-500">Great job! You're getting the recommended amount of sleep.</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Calories Tracking */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Calories Burnt Estimation</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">This workout:</span>
                    <span className="font-medium">{workout.caloriesBurn} calories</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Previous workouts today:</span>
                    <span className="font-medium">0 calories</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total today:</span>
                    <span className="font-medium">{workout.caloriesBurn} calories</span>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Daily Goal:</span>
                      <span className="font-bold text-primary">{workout.caloriesBurn}/300 calories</span>
                    </div>
                    <div className="mt-2 progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${Math.min((workout.caloriesBurn / 300) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkoutDetails;

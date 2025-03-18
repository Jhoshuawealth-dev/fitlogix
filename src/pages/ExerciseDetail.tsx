
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/custom-badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle2, ChevronLeft, Dumbbell, PlusCircle } from 'lucide-react';
import { exercises, getUserExercises } from '@/data/exercises';
import { useAuth } from '@/contexts/AuthContext';
import { Exercise, UserExercise, WorkoutSet } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import WorkoutTimer from '@/components/WorkoutTimer';

const ExerciseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [userExercise, setUserExercise] = useState<UserExercise | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [sets, setSets] = useState<WorkoutSet[]>([]);

  useEffect(() => {
    // Find the exercise by ID
    const foundExercise = exercises.find(ex => ex.id === id);
    if (foundExercise) {
      setExercise(foundExercise);
    } else {
      // If exercise not found, redirect to exercises page
      navigate('/exercises');
    }

    // Get user-specific exercise data if user is logged in
    if (user && id) {
      const userExercises = getUserExercises(user.id);
      const today = new Date().toISOString().split('T')[0];
      
      // Find today's exercise record for this exercise
      const foundUserExercise = userExercises.find(
        ex => ex.exerciseId === id && ex.date === today
      );
      
      if (foundUserExercise) {
        setUserExercise(foundUserExercise);
        setIsCompleted(foundUserExercise.completed);
        setSets(foundUserExercise.sets || []);
      } else {
        // Create default sets if no user exercise found
        setSets([
          { id: '1', weight: 0, reps: 10, completed: false },
          { id: '2', weight: 0, reps: 8, completed: false },
          { id: '3', weight: 0, reps: 6, completed: false }
        ]);
      }
    }
  }, [id, user, navigate]);

  const handleSetCompletion = (setId: string) => {
    setSets(prevSets => 
      prevSets.map(set => 
        set.id === setId 
          ? { ...set, completed: !set.completed } 
          : set
      )
    );
  };

  const handleCompleteExercise = () => {
    // Check if all sets are completed
    const allSetsCompleted = sets.every(set => set.completed);
    
    if (!allSetsCompleted) {
      toast({
        variant: "destructive",
        title: "Incomplete Sets",
        description: "Please complete all sets before marking the exercise as complete.",
      });
      return;
    }
    
    // Mark the exercise as completed
    setIsCompleted(true);
    
    toast({
      title: "Exercise Completed!",
      description: "Great job! Your progress has been saved.",
    });

    // In a real app, you would save this to Supabase
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  const addSet = () => {
    const newSet: WorkoutSet = {
      id: `new-${Date.now()}`,
      weight: 0,
      reps: 8,
      completed: false
    };
    
    setSets([...sets, newSet]);
  };

  const handleTimerComplete = () => {
    toast({
      title: "Rest Period Complete",
      description: "Time to start your next set!",
    });
  };

  if (!exercise) {
    return <div className="container mx-auto px-4 py-6 flex justify-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <Button 
        variant="ghost" 
        className="mb-4 pl-0" 
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Exercise Info */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="h-64 bg-gray-100">
              <img 
                src={exercise.image} 
                alt={exercise.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex flex-wrap justify-between items-start mb-3">
                <h1 className="text-2xl font-bold text-gray-800">{exercise.name}</h1>
                <Badge className="capitalize">{exercise.category}</Badge>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {exercise.muscles.map(muscle => (
                  <Badge key={muscle} variant="outline">{muscle}</Badge>
                ))}
              </div>
              
              <p className="text-gray-700 mb-6">{exercise.description}</p>
              
              <h2 className="text-xl font-semibold mb-3">How to perform</h2>
              <ol className="space-y-3 mb-6">
                {exercise.steps.map((step, index) => (
                  <li key={index} className="flex gap-3">
                    <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 bg-fitblue-100 rounded-full text-fitblue-600 font-semibold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        
        {/* Right Column - Workout Tracker */}
        <div className="space-y-4">
          {/* Timer Component */}
          {!isCompleted && (
            <WorkoutTimer 
              timerSettings={{
                defaultDuration: 60,  // 1 minute rest between sets
                autoStart: false,
                soundEnabled: true
              }}
              onTimerComplete={handleTimerComplete}
            />
          )}
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="h-5 w-5 text-fitblue-500" />
                <span>Track Your Sets</span>
              </CardTitle>
              <CardDescription>
                Record your progress for this exercise
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isCompleted ? (
                <div className="bg-green-50 flex items-center justify-center p-4 rounded-md text-green-700 gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-medium">Exercise Completed!</span>
                </div>
              ) : (
                <>
                  {sets.map((set, index) => (
                    <div key={set.id} className="mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">Set {index + 1}</div>
                        <Button
                          variant={set.completed ? "success" : "outline"}
                          size="sm"
                          className="h-8"
                          onClick={() => handleSetCompletion(set.id)}
                        >
                          {set.completed ? (
                            <>
                              <CheckCircle2 className="mr-1 h-4 w-4" />
                              Completed
                            </>
                          ) : (
                            "Mark as Done"
                          )}
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mb-1">
                        <div className="bg-gray-50 p-2 rounded text-center">
                          <div className="text-xs text-gray-500 mb-1">Weight</div>
                          <div className="font-semibold">
                            {set.weight > 0 ? `${set.weight} lbs` : 'Bodyweight'}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-2 rounded text-center">
                          <div className="text-xs text-gray-500 mb-1">Reps</div>
                          <div className="font-semibold">{set.reps}</div>
                        </div>
                      </div>
                      {index < sets.length - 1 && <Separator className="my-3" />}
                    </div>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-2"
                    onClick={addSet}
                  >
                    <PlusCircle className="mr-1 h-4 w-4" />
                    Add Set
                  </Button>
                  
                  <Button 
                    className="w-full mt-4" 
                    size="lg"
                    onClick={handleCompleteExercise}
                  >
                    Complete Exercise
                  </Button>
                  
                  <div className="text-xs text-gray-500 mt-3 flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>You must complete all sets before marking the exercise as complete.</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;

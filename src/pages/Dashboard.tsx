
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/custom-badge";
import { CalendarIcon, ArrowRightIcon, CheckCircle, Clock, Dumbbell, Edit, Plus, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { exercises, getUserWorkouts, getUserExercises } from '@/data/exercises';
import { Exercise, UserExercise, Workout, WorkoutSet } from '@/types';
import WorkoutAdjustment from '@/components/WorkoutAdjustment';
import { useToast } from '@/components/ui/use-toast';
import WorkoutCategoriesSection from '@/components/WorkoutCategoriesSection';

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [todayExercises, setTodayExercises] = useState<(UserExercise & { exerciseData?: Exercise })[]>([]);
  const [showAdjustment, setShowAdjustment] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const userWorkouts = getUserWorkouts(user.id);
      setWorkouts(userWorkouts);
      
      const userExercises = getUserExercises(user.id);
      const today = new Date().toISOString().split('T')[0];
      
      // Get today's exercises and attach exercise data
      const todaysExercises = userExercises
        .filter(ex => ex.date === today)
        .map(ex => {
          const exerciseData = exercises.find(e => e.id === ex.exerciseId);
          return {
            ...ex,
            exerciseData
          };
        });
      
      setTodayExercises(todaysExercises);
    }
  }, [user]);

  // Find today's workout
  const todayWorkout = workouts.find(workout => 
    workout.date === new Date().toISOString().split('T')[0]
  );
  
  // Calculate overall progress
  const totalExercises = todayExercises.length;
  const completedExercises = todayExercises.filter(ex => ex.completed).length;
  const progressPercentage = totalExercises > 0 
    ? Math.round((completedExercises / totalExercises) * 100) 
    : 0;

  const handleUpdateSets = (exerciseId: string, newSets: WorkoutSet[]) => {
    // In a real app, this would update the database
    setTodayExercises(prev => 
      prev.map(ex => 
        ex.id === exerciseId ? { ...ex, sets: newSets } : ex
      )
    );
    
    toast({
      title: "Workout Updated",
      description: "Your workout has been successfully updated.",
    });
    
    setShowAdjustment(null);
  };

  const toggleExerciseCompletion = (exerciseId: string) => {
    setTodayExercises(prev => 
      prev.map(ex => 
        ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex
      )
    );
    
    // Find the current exercise
    const exercise = todayExercises.find(ex => ex.id === exerciseId);
    
    toast({
      title: exercise?.completed ? "Exercise Marked Incomplete" : "Exercise Completed",
      description: `${exercise?.exerciseData?.name} has been ${exercise?.completed ? 'marked as incomplete' : 'completed'}.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user?.email}</h1>
          <p className="text-gray-600 mt-1">Track your fitness journey with FitLogix</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Link to="/exercises">
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Workout
            </Button>
          </Link>
          <Link to="/exercises">
            <Button>
              View All Exercises
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-4">Today's Progress</h2>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Completion Rate</span>
              <span className="text-sm font-semibold">{progressPercentage}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              {completedExercises} of {totalExercises} exercises completed
            </div>
          </div>
          
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="outline" className="flex items-center gap-1 py-1.5">
                <CalendarIcon className="h-3.5 w-3.5" />
                <span>Today</span>
              </Badge>
              {todayWorkout ? (
                <Badge variant={todayWorkout.completed ? "success" : "secondary"} className="py-1.5">
                  {todayWorkout.completed ? "Completed" : "In Progress"}
                </Badge>
              ) : (
                <Badge variant="secondary" className="py-1.5">No Workout Scheduled</Badge>
              )}
            </div>
            {todayWorkout && (
              <h3 className="text-lg font-medium">{todayWorkout.name}</h3>
            )}
          </div>
        </div>
      </div>

      {/* Workout Categories Section */}
      <WorkoutCategoriesSection />

      {/* Today's Exercises */}
      <h2 className="text-2xl font-bold mb-4 mt-12">Today's Workout</h2>
      
      {todayExercises.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {todayExercises.map((exercise) => (
            <div key={exercise.id}>
              {showAdjustment === exercise.id ? (
                <WorkoutAdjustment 
                  sets={exercise.sets || []}
                  onSave={(newSets) => handleUpdateSets(exercise.id, newSets)}
                  exerciseId={exercise.exerciseId}
                />
              ) : (
                <Card className={`exercise-card ${exercise.completed ? 'bg-gray-50' : 'bg-white'}`}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{exercise.exerciseData?.name}</CardTitle>
                      {exercise.completed ? (
                        <Badge variant="success" className="ml-auto flex items-center gap-1">
                          <CheckCircle className="h-3.5 w-3.5" />
                          <span>Completed</span>
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="ml-auto flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>Pending</span>
                        </Badge>
                      )}
                    </div>
                    <CardDescription>
                      {exercise.exerciseData?.muscles.join(', ')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="mt-1">
                      {exercise.sets?.map((set, index) => (
                        <div key={set.id} className="flex items-center justify-between py-1 border-b last:border-0">
                          <span className="font-medium">Set {index + 1}</span>
                          <span className="text-gray-600">{set.weight > 0 ? `${set.weight} lbs` : 'Bodyweight'} × {set.reps} reps</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                      onClick={() => setShowAdjustment(exercise.id)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Adjust
                    </Button>
                    <Button
                      variant={exercise.completed ? "outline" : "default"}
                      size="sm"
                      className="flex-1"
                      onClick={() => toggleExerciseCompletion(exercise.id)}
                    >
                      {exercise.completed ? (
                        <>Mark Incomplete</>
                      ) : (
                        <>Complete<CheckCircle className="ml-1 h-4 w-4" /></>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          ))}
        </div>
      ) : (
        <Card className="mb-8">
          <CardContent className="py-8">
            <div className="flex flex-col items-center justify-center text-center">
              <Dumbbell className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium mb-2">No Exercises Scheduled</h3>
              <p className="text-gray-500 mb-4">You don't have any exercises scheduled for today.</p>
              <Link to="/exercises">
                <Button>Browse Exercises</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Workouts */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Recent Workouts</h2>
        <Link to="/progress">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            View All
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {workouts.slice(0, 6).map((workout) => (
          <Card key={workout.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{workout.name}</CardTitle>
                {workout.completed ? (
                  <Badge variant="success" className="ml-auto">Completed</Badge>
                ) : (
                  <Badge variant="outline" className="ml-auto">Pending</Badge>
                )}
              </div>
              <CardDescription>
                {new Date(workout.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-gray-600">{workout.description}</p>
              <div className="mt-3 flex items-center">
                <div className="flex-1">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${workout.completionPercentage}%` }}
                    ></div>
                  </div>
                </div>
                <span className="ml-2 text-sm font-medium">{workout.completionPercentage}%</span>
              </div>
            </CardContent>
            <CardFooter>
              <Link to={`/workout/${workout.id}`} className="w-full">
                <Button variant="outline" className="w-full">View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

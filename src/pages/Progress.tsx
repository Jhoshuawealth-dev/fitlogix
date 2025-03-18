
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import { getUserExercises, getUserWorkouts } from '@/data/exercises';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Calendar } from '@/components/ui/calendar';

const ProgressPage = () => {
  const { user } = useAuth();
  const [date, setDate] = useState<Date>(new Date());
  const [workoutData, setWorkoutData] = useState<any[]>([]);
  const [exerciseData, setExerciseData] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const userWorkouts = getUserWorkouts(user.id);
      const userExercises = getUserExercises(user.id);
      
      // Transform workout data for charts
      const workoutStats = userWorkouts.map(workout => ({
        name: new Date(workout.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        completion: workout.completionPercentage,
        exercises: workout.exercises.length
      }));
      
      setWorkoutData(workoutStats);
      
      // Transform exercise data for charts
      const exerciseStats = userExercises.map(exercise => {
        const totalVolume = exercise.sets?.reduce((acc, set) => {
          return acc + (set.weight * set.reps);
        }, 0) || 0;
        
        return {
          id: exercise.id,
          exerciseId: exercise.exerciseId,
          date: new Date(exercise.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          volume: totalVolume,
          sets: exercise.sets?.length || 0,
          completed: exercise.completed
        };
      });
      
      setExerciseData(exerciseStats);
    }
  }, [user]);

  // Get days with workouts for the calendar
  const daysWithWorkouts = workoutData.map(workout => 
    new Date(workout.name)
  );

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Progress</h1>
        <p className="text-gray-600 mt-1">Track your fitness improvements over time</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="workouts">Workouts</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Workout Completion Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Workout Completion</CardTitle>
              <CardDescription>
                Your workout completion percentage over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={workoutData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="completion" 
                      stroke="#0EA5E9" 
                      name="Completion %" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Exercise Volume Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Workout Volume</CardTitle>
              <CardDescription>
                Total workout volume (weight × reps) per session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={exerciseData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar 
                      dataKey="volume" 
                      fill="#0EA5E9" 
                      name="Volume (lbs)" 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="workouts">
          <Card>
            <CardHeader>
              <CardTitle>Workout History</CardTitle>
              <CardDescription>
                Details of your recent workouts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {workoutData.map((workout, index) => (
                  <div key={index} className="py-4 flex justify-between">
                    <div>
                      <h3 className="font-medium">{workout.name}</h3>
                      <p className="text-sm text-gray-500">{workout.exercises} exercises</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-fitblue-600">{workout.completion}%</div>
                      <p className="text-sm text-gray-500">completed</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Workout Calendar</CardTitle>
              <CardDescription>
                View your workout days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  className="rounded-md border"
                  modifiers={{
                    workout: daysWithWorkouts
                  }}
                  modifiersClassNames={{
                    workout: "bg-fitblue-100 text-fitblue-700 font-medium"
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProgressPage;

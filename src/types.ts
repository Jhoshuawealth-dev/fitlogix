
// Exercise types
export interface Exercise {
  id: string;
  name: string;
  description: string;
  image: string;
  steps: string[];
  category: string;
  muscles: string[];
}

// UserExercise types for tracking user progress
export interface UserExercise {
  id: string;
  userId: string;
  exerciseId: string;
  completed: boolean;
  date: string;
  sets?: WorkoutSet[];
}

export interface WorkoutSet {
  id: string;
  weight: number;
  reps: number;
  completed: boolean;
}

// Workout types
export interface Workout {
  id: string;
  userId: string;
  name: string;
  description?: string;
  exercises: string[]; // Array of exercise IDs
  date: string;
  completed: boolean;
  completionPercentage: number;
}

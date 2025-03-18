
import { Exercise } from '@/types';

export const exercises: Exercise[] = [
  {
    id: '1',
    name: 'Barbell Bench Press',
    description: 'A compound exercise that builds strength and size in the chest, shoulders, and triceps.',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop',
    steps: [
      'Lie flat on a bench with your feet on the ground',
      'Grip the barbell slightly wider than shoulder-width',
      'Unrack the barbell and lower it to your mid-chest',
      'Press the barbell back up to the starting position',
      'Repeat for the desired number of repetitions'
    ],
    category: 'Chest',
    muscles: ['Chest', 'Shoulders', 'Triceps']
  },
  {
    id: '2',
    name: 'Barbell Squat',
    description: 'The king of leg exercises, targeting the entire lower body and core.',
    image: 'https://images.unsplash.com/photo-1566241142248-11865261e6ce?q=80&w=2070&auto=format&fit=crop',
    steps: [
      'Stand with feet shoulder-width apart under a barbell',
      'Position the barbell on your upper back, not on your neck',
      'Unrack the barbell and step back',
      'Bend at the knees and hips to lower your body',
      'Keep your chest up and back straight throughout the movement',
      'Lower until thighs are parallel to the ground',
      'Push through your heels to return to the starting position'
    ],
    category: 'Legs',
    muscles: ['Quadriceps', 'Hamstrings', 'Glutes', 'Lower Back']
  },
  {
    id: '3',
    name: 'Deadlift',
    description: 'A powerful compound movement that builds total body strength and mass.',
    image: 'https://images.unsplash.com/photo-1598575435251-39b15d2dd86c?q=80&w=2070&auto=format&fit=crop',
    steps: [
      'Stand with feet hip-width apart, with the barbell over mid-foot',
      'Bend at the hips and knees to lower your hands to the bar',
      'Grip the bar slightly wider than shoulder-width',
      'Keep your chest up and back flat',
      'Push through your heels and stand up with the weight',
      'Pull your shoulders back at the top of the movement',
      'Lower the bar by pushing your hips back first, then bending the knees'
    ],
    category: 'Back',
    muscles: ['Lower Back', 'Hamstrings', 'Glutes', 'Traps', 'Forearms']
  },
  {
    id: '4',
    name: 'Pull-ups',
    description: 'One of the best exercises for developing upper body strength and width.',
    image: 'https://images.unsplash.com/photo-1598971639058-b46a572c4a31?q=80&w=2070&auto=format&fit=crop',
    steps: [
      'Hang from a pull-up bar with hands slightly wider than shoulder-width',
      'Keep your core tight and shoulders engaged',
      'Pull your body up until your chin is over the bar',
      'Lower your body back to the starting position with control',
      'Repeat without swinging or kipping'
    ],
    category: 'Back',
    muscles: ['Lats', 'Biceps', 'Shoulders', 'Core']
  },
  {
    id: '5',
    name: 'Overhead Press',
    description: 'A fundamental shoulder exercise that builds strength and stability in the upper body.',
    image: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=2070&auto=format&fit=crop',
    steps: [
      'Stand with feet shoulder-width apart',
      'Hold a barbell at shoulder height with palms facing forward',
      'Brace your core and squeeze your glutes',
      'Press the barbell overhead until arms are fully extended',
      'Lower the barbell back to shoulder level with control',
      'Repeat without using momentum'
    ],
    category: 'Shoulders',
    muscles: ['Shoulders', 'Triceps', 'Upper Back']
  }
];

// Mock user exercise data
export const getUserExercises = (userId: string) => {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  return [
    {
      id: '1',
      userId,
      exerciseId: '1',
      completed: true,
      date: yesterday,
      sets: [
        { id: '1', weight: 135, reps: 12, completed: true },
        { id: '2', weight: 155, reps: 10, completed: true },
        { id: '3', weight: 175, reps: 8, completed: true }
      ]
    },
    {
      id: '2',
      userId,
      exerciseId: '2',
      completed: true,
      date: yesterday,
      sets: [
        { id: '1', weight: 225, reps: 10, completed: true },
        { id: '2', weight: 245, reps: 8, completed: true },
        { id: '3', weight: 265, reps: 6, completed: true }
      ]
    },
    {
      id: '3',
      userId,
      exerciseId: '3',
      completed: false,
      date: today,
      sets: [
        { id: '1', weight: 225, reps: 8, completed: false },
        { id: '2', weight: 245, reps: 6, completed: false },
        { id: '3', weight: 265, reps: 4, completed: false }
      ]
    },
    {
      id: '4',
      userId,
      exerciseId: '4',
      completed: false,
      date: today,
      sets: [
        { id: '1', weight: 0, reps: 10, completed: false },
        { id: '2', weight: 0, reps: 8, completed: false },
        { id: '3', weight: 0, reps: 6, completed: false }
      ]
    },
    {
      id: '5',
      userId,
      exerciseId: '5',
      completed: false,
      date: today,
      sets: [
        { id: '1', weight: 95, reps: 10, completed: false },
        { id: '2', weight: 105, reps: 8, completed: false },
        { id: '3', weight: 115, reps: 6, completed: false }
      ]
    }
  ];
};

// Mock workouts
export const getUserWorkouts = (userId: string) => {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const twoDaysAgo = new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0];
  
  return [
    {
      id: '1',
      userId,
      name: 'Upper Body Power',
      description: 'Focus on chest, shoulders, and triceps',
      exercises: ['1', '5'],
      date: yesterday,
      completed: true,
      completionPercentage: 100
    },
    {
      id: '2',
      userId,
      name: 'Lower Body Power',
      description: 'Heavy squats and deadlifts',
      exercises: ['2', '3'],
      date: twoDaysAgo,
      completed: true,
      completionPercentage: 100
    },
    {
      id: '3',
      userId,
      name: 'Full Body Workout',
      description: 'Complete full body routine',
      exercises: ['1', '2', '3', '4', '5'],
      date: today,
      completed: false,
      completionPercentage: 0
    }
  ];
};

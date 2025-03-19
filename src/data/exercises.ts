
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
  },
  {
    id: '6',
    name: 'Dumbbell Bicep Curls',
    description: 'An isolation exercise targeting the biceps for arm development.',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop',
    steps: [
      'Stand with feet shoulder-width apart, holding dumbbells at your sides',
      'Keep your elbows close to your torso',
      'Curl the weights upward while keeping upper arms stationary',
      'Continue curling until the dumbbells reach shoulder level',
      'Lower back to the starting position with control',
      'Repeat for the desired number of repetitions'
    ],
    category: 'Arms',
    muscles: ['Biceps', 'Forearms']
  },
  {
    id: '7',
    name: 'Tricep Dips',
    description: 'A compound movement that targets the triceps, chest and shoulders.',
    image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=2070&auto=format&fit=crop',
    steps: [
      'Position yourself on parallel bars with arms straight',
      'Lower your body by bending your elbows',
      'Keep your elbows close to your body',
      'Descend until your shoulders are below your elbows',
      'Push yourself back up to the starting position',
      'Repeat for the desired number of repetitions'
    ],
    category: 'Arms',
    muscles: ['Triceps', 'Chest', 'Shoulders']
  },
  {
    id: '8',
    name: 'Plank',
    description: 'A core stabilization exercise that strengthens the entire midsection.',
    image: 'https://images.unsplash.com/photo-1562771379-eafdca7a02f8?q=80&w=2070&auto=format&fit=crop',
    steps: [
      'Start in a push-up position with arms straight',
      'Lower onto your forearms with elbows under shoulders',
      'Keep your body in a straight line from head to heels',
      'Engage your core and squeeze your glutes',
      'Hold the position while breathing normally',
      'Maintain proper form for the desired duration'
    ],
    category: 'Core',
    muscles: ['Abs', 'Obliques', 'Lower Back']
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
    },
    // New exercises
    {
      id: '6',
      userId,
      exerciseId: '6',
      completed: false,
      date: today,
      sets: [
        { id: '1', weight: 25, reps: 12, completed: false },
        { id: '2', weight: 30, reps: 10, completed: false },
        { id: '3', weight: 35, reps: 8, completed: false }
      ]
    },
    {
      id: '7',
      userId,
      exerciseId: '7',
      completed: false,
      date: today,
      sets: [
        { id: '1', weight: 0, reps: 12, completed: false },
        { id: '2', weight: 0, reps: 10, completed: false },
        { id: '3', weight: 0, reps: 8, completed: false }
      ]
    },
    {
      id: '8',
      userId,
      exerciseId: '8',
      completed: false,
      date: today,
      sets: [
        { id: '1', weight: 0, reps: 60, completed: false }, // 60 seconds
        { id: '2', weight: 0, reps: 45, completed: false }, // 45 seconds
        { id: '3', weight: 0, reps: 30, completed: false }  // 30 seconds
      ]
    }
  ];
};

// Mock workouts
export const getUserWorkouts = (userId: string) => {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const twoDaysAgo = new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0];
  const threeDaysAgo = new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0];
  const fourDaysAgo = new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0];
  const fiveDaysAgo = new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0];
  
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
    },
    // New workouts
    {
      id: '4',
      userId,
      name: 'Arm Day',
      description: 'Focus on biceps and triceps',
      exercises: ['6', '7'],
      date: threeDaysAgo,
      completed: true,
      completionPercentage: 100
    },
    {
      id: '5',
      userId,
      name: 'Back & Core',
      description: 'Develop back strength and core stability',
      exercises: ['3', '4', '8'],
      date: fourDaysAgo,
      completed: true,
      completionPercentage: 100
    },
    {
      id: '6',
      userId,
      name: 'Recovery Day',
      description: 'Light workout with stretching and core',
      exercises: ['8'],
      date: fiveDaysAgo,
      completed: true,
      completionPercentage: 100
    }
  ];
};

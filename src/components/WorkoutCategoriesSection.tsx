
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import WorkoutCard from './WorkoutCard';

// Workout category data
const workoutCategories = [
  {
    title: 'Flat Tummy Workout',
    description: 'A targeted workout to strengthen your core and flatten your tummy.',
    duration: '25 min',
    level: 'intermediate' as const,
    imageUrl: '/images/workouts/flat-tummy.jpg',
    slug: 'flat-tummy',
  },
  {
    title: 'Glutes Strengthening Workout',
    description: 'Build stronger glutes with this targeted workout routine.',
    duration: '30 min',
    level: 'intermediate' as const,
    imageUrl: '/images/workouts/glutes.jpg',
    slug: 'ass-workout',
  },
  {
    title: 'Thigh Toning Workout',
    description: 'Tone and strengthen your thighs with this effective routine.',
    duration: '20 min',
    level: 'beginner' as const,
    imageUrl: '/images/workouts/thigh.jpg',
    slug: 'thigh-workout',
  },
  {
    title: 'Complete Flat Tummy Routine',
    description: 'A comprehensive workout routine designed to target all core muscles.',
    duration: '40 min',
    level: 'advanced' as const,
    imageUrl: '/images/workouts/full-tummy.jpg',
    slug: 'full-tummy-routine',
  }
];

const WorkoutCategoriesSection = () => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Workout Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {workoutCategories.map((workout, idx) => (
          <WorkoutCard
            key={idx}
            title={workout.title}
            description={workout.description}
            duration={workout.duration}
            level={workout.level}
            imageUrl={workout.imageUrl}
            slug={workout.slug}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkoutCategoriesSection;

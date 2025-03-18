
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Dumbbell, LineChart, Timer, Trophy, Users } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-4 bg-white border-b">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-fitblue-500" />
            <span className="text-xl font-bold text-fitblue-500">FitLogix</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/login">
              <Button>Log In</Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-fitblue-500 to-fitblue-600 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Track Your Fitness Journey with FitLogix
              </h1>
              <p className="text-lg text-white/80 max-w-lg">
                The all-in-one workout companion that helps you track progress, maintain consistency, and achieve your fitness goals.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/login">
                  <Button size="lg" className="font-medium text-base">
                    Get Started
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="font-medium text-base bg-white/10 text-white border-white/20 hover:bg-white/20">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img 
                src="/placeholder.svg" 
                alt="FitLogix App" 
                className="w-full h-auto rounded-xl shadow-2xl" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to take your fitness to the next level
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-fitblue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <Dumbbell className="h-6 w-6 text-fitblue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Exercise Library</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access a comprehensive library of exercises with detailed instructions and visual guides.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-fitblue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <Timer className="h-6 w-6 text-fitblue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Workout Timer</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Built-in timer to track your workout sessions and rest periods between sets.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-fitblue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-fitblue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Visualize your progress with detailed charts and statistics to stay motivated.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-fitblue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-fitblue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Achievements</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Earn badges and track streaks to stay motivated on your fitness journey.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-fitblue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-fitblue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Plans</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get workout recommendations based on your fitness goals and preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-fitblue-500 dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Fitness Journey?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have improved their fitness with FitLogix.
          </p>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="font-medium text-base">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h2 className="text-2xl font-bold text-white mb-2">FitLogix</h2>
              <p className="text-sm">Your personal fitness companion</p>
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Features</a>
              <a href="#" className="hover:text-white transition-colors">Pricing</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-12 text-center text-sm">
            &copy; {new Date().getFullYear()} FitLogix. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

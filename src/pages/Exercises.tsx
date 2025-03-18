
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ArrowRight } from 'lucide-react';
import { exercises } from '@/data/exercises';
import { Exercise } from '@/types';

const ExercisesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>(exercises);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get unique categories
  const categories = ['all', ...new Set(exercises.map(exercise => exercise.category))];

  useEffect(() => {
    let filtered = exercises;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(exercise => 
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.muscles.some(muscle => 
          muscle.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(exercise => 
        exercise.category === selectedCategory
      );
    }
    
    setFilteredExercises(filtered);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Exercises Library</h1>
          <p className="text-gray-600 mt-1">Browse and discover exercises for your workouts</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search exercises, muscles, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>
      </div>

      {/* Categories Tabs */}
      <Tabs defaultValue="all" onValueChange={setSelectedCategory} className="mb-8">
        <TabsList className="w-full md:w-auto flex overflow-x-auto p-1 mb-4 bg-transparent justify-start">
          {categories.map(category => (
            <TabsTrigger 
              key={category} 
              value={category}
              className="flex-shrink-0 capitalize"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExercises.map(exercise => (
                <Card key={exercise.id} className="exercise-card overflow-hidden h-full flex flex-col">
                  <div className="h-48 overflow-hidden bg-gray-100">
                    <img 
                      src={exercise.image} 
                      alt={exercise.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{exercise.name}</CardTitle>
                    </div>
                    <CardDescription>
                      <Badge variant="outline" className="mt-1 capitalize">
                        {exercise.category}
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 flex-grow">
                    <p className="text-sm text-gray-600 line-clamp-2">{exercise.description}</p>
                    <div className="mt-2">
                      <p className="text-xs font-medium text-gray-500">Muscles worked:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {exercise.muscles.map(muscle => (
                          <Badge key={muscle} variant="secondary" className="text-xs">
                            {muscle}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/exercise/${exercise.id}`} className="w-full">
                      <Button variant="default" className="w-full">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ExercisesPage;

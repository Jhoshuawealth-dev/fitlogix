
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/custom-badge";
import { Check, Plus, Minus, Save, Trash } from 'lucide-react';
import { WorkoutSet } from '@/types';

interface WorkoutAdjustmentProps {
  sets: WorkoutSet[];
  onSave: (sets: WorkoutSet[]) => void;
  exerciseId: string;
}

const WorkoutAdjustment = ({ sets, onSave, exerciseId }: WorkoutAdjustmentProps) => {
  const [workingSets, setWorkingSets] = useState<WorkoutSet[]>(sets);
  const [isEditing, setIsEditing] = useState(false);

  const addSet = () => {
    const newSet: WorkoutSet = {
      id: `set-${Date.now()}`,
      weight: 0,
      reps: 8,
      completed: false
    };
    setWorkingSets([...workingSets, newSet]);
  };

  const removeSet = (id: string) => {
    setWorkingSets(workingSets.filter(set => set.id !== id));
  };

  const updateSet = (id: string, field: 'weight' | 'reps', value: number) => {
    setWorkingSets(workingSets.map(set => 
      set.id === id ? { ...set, [field]: value } : set
    ));
  };

  const toggleSetCompletion = (id: string) => {
    setWorkingSets(workingSets.map(set => 
      set.id === id ? { ...set, completed: !set.completed } : set
    ));
  };

  const handleSave = () => {
    onSave(workingSets);
    setIsEditing(false);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Workout Sets</CardTitle>
          {!isEditing ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsEditing(true)}
            >
              Adjust Workout
            </Button>
          ) : (
            <Badge variant="outline">Editing</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {workingSets.map((set, index) => (
          <div key={set.id} className="flex items-center gap-3 py-2 border-b last:border-0">
            <div className="w-10 text-center font-medium">
              {index + 1}
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-3">
              {isEditing ? (
                <>
                  <div>
                    <Label htmlFor={`weight-${set.id}`} className="text-xs mb-1 block">Weight (lbs)</Label>
                    <Input
                      id={`weight-${set.id}`}
                      type="number"
                      min="0"
                      value={set.weight}
                      onChange={(e) => updateSet(set.id, 'weight', parseInt(e.target.value) || 0)}
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`reps-${set.id}`} className="text-xs mb-1 block">Reps</Label>
                    <Input
                      id={`reps-${set.id}`}
                      type="number"
                      min="1"
                      value={set.reps}
                      onChange={(e) => updateSet(set.id, 'reps', parseInt(e.target.value) || 1)}
                      className="h-8"
                    />
                  </div>
                </>
              ) : (
                <div className="col-span-2 flex items-center">
                  <span className="font-medium">{set.weight > 0 ? `${set.weight} lbs` : 'Bodyweight'}</span>
                  <span className="mx-2">×</span>
                  <span>{set.reps} reps</span>
                </div>
              )}
            </div>
            
            {isEditing ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeSet(set.id)}
                className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
              >
                <Trash className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant={set.completed ? "success" : "outline"}
                size="icon"
                onClick={() => toggleSetCompletion(set.id)}
                className="h-8 w-8"
              >
                <Check className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        
        {isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={addSet}
            className="mt-3 w-full border-dashed"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Set
          </Button>
        )}
      </CardContent>
      
      {isEditing && (
        <CardFooter className="pt-3 flex justify-end gap-2">
          <Button 
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="default"
            size="sm"
            onClick={handleSave}
          >
            <Save className="h-4 w-4 mr-1" />
            Save Changes
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default WorkoutAdjustment;

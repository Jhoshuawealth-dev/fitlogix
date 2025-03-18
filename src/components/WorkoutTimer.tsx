
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Timer, Pause, Play, RotateCcw, Settings, X } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/components/ui/use-toast";

export interface TimerSettings {
  defaultDuration: number;
  autoStart: boolean;
  soundEnabled: boolean;
}

interface WorkoutTimerProps {
  timerSettings?: TimerSettings;
  onTimerComplete?: () => void;
}

const DEFAULT_SETTINGS: TimerSettings = {
  defaultDuration: 60, // 1 minute in seconds
  autoStart: false,
  soundEnabled: true,
};

const WorkoutTimer: React.FC<WorkoutTimerProps> = ({ 
  timerSettings = DEFAULT_SETTINGS,
  onTimerComplete 
}) => {
  const [timeLeft, setTimeLeft] = useState(timerSettings.defaultDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<TimerSettings>(timerSettings);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start the timer
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  // Pause the timer
  const pauseTimer = () => {
    setIsRunning(false);
  };

  // Reset the timer
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(settings.defaultDuration);
  };

  // Handle settings change
  const updateSettings = (newSettings: Partial<TimerSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    
    // If changing default duration, also reset current timer
    if (newSettings.defaultDuration) {
      setTimeLeft(newSettings.defaultDuration);
    }
  };

  // Close settings and apply changes
  const applySettings = () => {
    setIsSettingsOpen(false);
  };

  // Timer effect
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Timer complete
            clearInterval(timerRef.current as NodeJS.Timeout);
            setIsRunning(false);
            
            if (settings.soundEnabled) {
              // Play sound when timer ends
              try {
                const audio = new Audio('/notification.mp3');
                audio.play();
              } catch (error) {
                console.error('Unable to play sound', error);
              }
            }
            
            // Call onTimerComplete callback if provided
            if (onTimerComplete) {
              onTimerComplete();
            }
            
            toast({
              title: "Timer Complete!",
              description: "Your workout time is up.",
            });
            
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, settings.soundEnabled, onTimerComplete, toast]);

  // Auto-start effect (when settings change)
  useEffect(() => {
    if (settings.autoStart) {
      startTimer();
    }
  }, [settings.autoStart, settings.defaultDuration]);

  return (
    <div className="workout-timer">
      <Card className="border border-border/40 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Timer className="mr-2 h-5 w-5 text-primary" />
              <span>Workout Timer</span>
            </div>
            <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side={isMobile ? "bottom" : "right"} className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Timer Settings</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div className="space-y-2">
                    <h4 className="font-medium">Duration</h4>
                    <div className="flex flex-wrap gap-2">
                      {[30, 60, 90, 120, 180, 300].map(seconds => (
                        <Button 
                          key={seconds}
                          variant={settings.defaultDuration === seconds ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateSettings({ defaultDuration: seconds })}
                        >
                          {seconds >= 60 ? `${Math.floor(seconds / 60)}m` : `${seconds}s`}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">Auto-start timer</h4>
                      <p className="text-sm text-muted-foreground">Start counting when exercise begins</p>
                    </div>
                    <Switch 
                      checked={settings.autoStart}
                      onCheckedChange={(checked) => updateSettings({ autoStart: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">Sound notification</h4>
                      <p className="text-sm text-muted-foreground">Play sound when timer completes</p>
                    </div>
                    <Switch 
                      checked={settings.soundEnabled}
                      onCheckedChange={(checked) => updateSettings({ soundEnabled: checked })}
                    />
                  </div>
                  <Button onClick={applySettings} className="w-full">
                    Apply Settings
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold tracking-tighter my-2">
              {formatTime(timeLeft)}
            </div>
            <div className="flex gap-2 mt-3">
              {isRunning ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={pauseTimer}
                  className="flex items-center"
                >
                  <Pause className="mr-1 h-4 w-4" />
                  Pause
                </Button>
              ) : (
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={startTimer}
                  className="flex items-center"
                >
                  <Play className="mr-1 h-4 w-4" />
                  Start
                </Button>
              )}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetTimer}
                className="flex items-center"
              >
                <RotateCcw className="mr-1 h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutTimer;

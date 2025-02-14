import React from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Slider } from "../ui/slider";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Minus,
  Settings,
} from "lucide-react";

interface HostPanelProps {
  onTimerStart?: () => void;
  onTimerPause?: () => void;
  onTimerReset?: () => void;
  onScoreAdjust?: (teamId: string, amount: number) => void;
  isTimerRunning?: boolean;
  timeRemaining?: number;
  teams?: Array<{ id: string; name: string; score: number }>;
}

const HostPanel = ({
  onTimerStart = () => {},
  onTimerPause = () => {},
  onTimerReset = () => {},
  onScoreAdjust = () => {},
  isTimerRunning = false,
  timeRemaining = 30,
  teams = [
    { id: "1", name: "קבוצה 1", score: 1000 },
    { id: "2", name: "קבוצה 2", score: 800 },
  ],
}: HostPanelProps) => {
  return (
    <Card className="w-full h-20 bg-gray-900/95 border-none p-4 fixed bottom-0 left-0 right-0 backdrop-blur-sm">
      <div className="flex items-center justify-between h-full gap-6">
        {/* Timer Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-white" />
            <span className="text-white font-mono text-xl">
              {Math.floor(timeRemaining / 60)}:
              {(timeRemaining % 60).toString().padStart(2, "0")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!isTimerRunning ? (
              <Button
                variant="outline"
                size="icon"
                onClick={onTimerStart}
                className="bg-green-600 hover:bg-green-700"
              >
                <Play className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="outline"
                size="icon"
                onClick={onTimerPause}
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                <Pause className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="outline"
              size="icon"
              onClick={onTimerReset}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Score Adjustment Controls */}
        <div className="flex items-center gap-6 flex-1 justify-center">
          {teams.map((team) => (
            <div key={team.id} className="flex items-center gap-3">
              <span className="text-white min-w-[80px] text-center">
                {team.name}
              </span>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onScoreAdjust(team.id, -100)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onScoreAdjust(team.id, 100)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Game Settings */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label
              htmlFor="auto-advance"
              className="text-white whitespace-nowrap"
            >
              מעבר אוטומטי
            </Label>
            <Switch id="auto-advance" />
          </div>
          <Button
            variant="outline"
            className="bg-gray-700 hover:bg-gray-600 whitespace-nowrap"
          >
            <Settings className="h-4 w-4 ml-2" />
            הגדרות
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default HostPanel;

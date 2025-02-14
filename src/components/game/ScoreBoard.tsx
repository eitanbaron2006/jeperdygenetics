import React from "react";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Trophy, Crown } from "lucide-react";
import { motion } from "framer-motion";

interface Team {
  id: string;
  name: string;
  score: number;
  isActive: boolean;
}

interface ScoreBoardProps {
  teams?: Team[];
  onTeamSelect?: (teamId: string) => void;
}

const ScoreBoard = ({
  teams = [
    { id: "1", name: "קבוצה אלפא", score: 1000, isActive: true },
    { id: "2", name: "קבוצה בטא", score: 800, isActive: false },
    { id: "3", name: "קבוצה גמא", score: 600, isActive: false },
  ],
  onTeamSelect = () => {},
}: ScoreBoardProps) => {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  const leadingTeam = sortedTeams[0];

  return (
    <Card className="w-[300px] h-full bg-slate-900 p-4 flex flex-col gap-4">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Trophy className="w-6 h-6 text-yellow-400" />
        <h2 className="text-2xl font-bold text-white">לוח תוצאות</h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-4">
          {sortedTeams.map((team, index) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onTeamSelect(team.id)}
            >
              <Card
                className={`p-4 cursor-pointer transition-all ${team.isActive ? "bg-blue-800 border-yellow-400" : "bg-slate-800 hover:bg-slate-700"} ${team === leadingTeam ? "border-2 border-yellow-400" : "border border-slate-700"}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {index === 0 && (
                      <Crown className="w-5 h-5 text-yellow-400" />
                    )}
                    <span
                      className={`font-semibold ${team.isActive ? "text-white" : "text-slate-200"}`}
                    >
                      {team.name}
                    </span>
                  </div>
                  <span className="text-xl font-bold text-yellow-400">
                    ${team.score}
                  </span>
                </div>
                {team.isActive && (
                  <div className="mt-2 text-sm text-blue-200">תור נוכחי</div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default ScoreBoard;

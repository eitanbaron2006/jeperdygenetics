import React, { useState } from "react";
import CategoryCard from "./CategoryCard";
import { motion } from "framer-motion";

interface Category {
  name: string;
  questions: number[];
}

interface GameBoardProps {
  categories?: Category[];
  onCardSelect?: (category: string, points: number) => void;
}

const categoryColors = [
  "from-indigo-600 to-indigo-900",
  "from-emerald-600 to-emerald-900",
  "from-amber-600 to-amber-900",
  "from-rose-600 to-rose-900",
  "from-violet-600 to-violet-900",
];

const GameBoard = ({
  categories = [
    { name: "DNA ותהליכים מרכזיים", questions: [200, 400, 600, 800, 1000] },
    { name: "אנזימי הגבלה", questions: [200, 400, 600, 800, 1000] },
    { name: "פלסמידים", questions: [200, 400, 600, 800, 1000] },
    { name: "PCR", questions: [200, 400, 600, 800, 1000] },
    { name: "CRISPR", questions: [200, 400, 600, 800, 1000] },
  ],
  onCardSelect = () => {},
}: GameBoardProps) => {
  const [revealedCards, setRevealedCards] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleCardClick = (category: string, points: number) => {
    const cardKey = `${category}-${points}`;
    if (!revealedCards[cardKey]) {
      setRevealedCards((prev) => ({ ...prev, [cardKey]: true }));
      setSelectedCard(cardKey);
      onCardSelect(category, points);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-[1000px] h-[600px] bg-gradient-to-br from-slate-900/50 to-slate-950/50 p-4 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.3)] border border-slate-800/20 backdrop-blur-sm"
    >
      {/* Categories Header */}
      <div className="grid grid-cols-5 gap-4 mb-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`h-16 flex items-center justify-center bg-gradient-to-br ${categoryColors[categories.indexOf(category)]} rounded-xl shadow-lg border border-white/10 backdrop-blur-sm transform hover:scale-105 transition-transform duration-200`}
          >
            <span className="text-lg font-bold text-white text-center">
              {category.name}
            </span>
          </div>
        ))}
      </div>

      {/* Questions Grid */}
      <div className="grid grid-cols-5 gap-4">
        {categories.map((category, categoryIndex) => (
          <div key={category.name} className="flex flex-col gap-4">
            {category.questions.map((points) => {
              const cardKey = `${category.name}-${points}`;
              return (
                <CategoryCard
                  key={cardKey}
                  category={category.name}
                  points={points}
                  isRevealed={revealedCards[cardKey]}
                  isSelected={selectedCard === cardKey}
                  onClick={() => handleCardClick(category.name, points)}
                  colorClass={categoryColors[categoryIndex]}
                />
              );
            })}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default GameBoard;

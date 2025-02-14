import React from "react";
import { Card } from "../ui/card";
import { motion } from "framer-motion";

interface CategoryCardProps {
  colorClass?: string;
  category?: string;
  points?: number;
  isRevealed?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

const CategoryCard = ({
  category = "מבנה DNA",
  points = 200,
  isRevealed = false,
  isSelected = false,
  onClick = () => {},
  colorClass = "from-blue-600 to-blue-900",
}: CategoryCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ rotateY: 0 }}
      animate={{ rotateY: isRevealed ? 0 : 0 }}
      transition={{ duration: 0.6 }}
      className="perspective-1000"
    >
      <Card
        className={`w-[180px] h-[100px] cursor-pointer bg-gradient-to-br ${colorClass || "from-blue-600 to-blue-900"} border ${isSelected ? "border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.3)]" : "border-white/10"} rounded-xl backdrop-blur-sm transform hover:scale-105 transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]`}
        onClick={onClick}
      >
        <div className="h-full w-full flex items-center justify-center text-center p-4">
          {isRevealed ? (
            <span className="text-2xl font-bold text-white">{category}</span>
          ) : (
            <span className="text-4xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]">
              ${points}
            </span>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default CategoryCard;

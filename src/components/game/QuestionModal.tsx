import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Timer, Check, X } from "lucide-react";
import { motion } from "framer-motion";

interface QuestionModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  question?: string;
  answer?: string;
  category?: string;
  points?: number;
  timeLimit?: number;
  onCorrect?: () => void;
  onIncorrect?: () => void;
}

const QuestionModal = ({
  isOpen = true,
  onClose = () => {},
  question = "הסבר את תהליך השכפול של DNA ואת האנזימים המעורבים בו",
  answer = "תהליך השכפול של DNA מתרחש בשלבים הבאים: 1) פתיחת הסליל הכפול על ידי אנזים הליקאז 2) יצירת גדילים חדשים על ידי DNA פולימראז 3) חיבור קטעי אוקזאקי על ידי DNA ליגאז",
  category = "מבנה DNA",
  points = 200,
  timeLimit = 30,
  onCorrect = () => {},
  onIncorrect = () => {},
}: QuestionModalProps) => {
  const [timeLeft, setTimeLeft] = React.useState(timeLimit);

  React.useEffect(() => {
    if (isOpen && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen, timeLeft]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] bg-slate-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-yellow-400">
            {category} - ${points}
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Timer className="w-6 h-6 text-blue-400" />
              <span className="text-xl font-semibold">{timeLeft}s</span>
            </div>
          </div>

          <div className="text-2xl text-center mb-8">{question}</div>

          <div className="mb-6 text-lg text-gray-300 hidden" id="answer-text">
            <div className="font-bold mb-2">תשובה:</div>
            {answer}
          </div>

          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                const answerElement = document.getElementById("answer-text");
                if (answerElement) answerElement.classList.toggle("hidden");
              }}
            >
              הצג תשובה
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={onCorrect}
            >
              <Check className="mr-2 h-5 w-5" />
              נכון
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={onIncorrect}
            >
              <X className="mr-2 h-5 w-5" />
              לא נכון
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionModal;

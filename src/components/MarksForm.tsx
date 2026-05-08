import { useState } from "react";
import { GraduationCap, Send, Loader2 } from "lucide-react";
import { motion } from "motion/react";

const SUBJECTS_10TH = ["Mathematics", "Science", "Social Science", "English", "Hindi/Regional"];
const SUBJECTS_12TH = ["Physics", "Chemistry", "Mathematics", "Biology", "English", "Accountancy", "Economics", "Business Studies"];

interface MarksFormProps {
  standard: "10th" | "12th";
  onSubmit: (marks: Record<string, number>) => void;
  isLoading: boolean;
}

export function MarksForm({ standard, onSubmit, isLoading }: MarksFormProps) {
  const [marks, setMarks] = useState<Record<string, string>>({});
  const subjects = standard === "10th" ? SUBJECTS_10TH : SUBJECTS_12TH;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericMarks: Record<string, number> = {};
    subjects.forEach((s) => {
      numericMarks[s] = parseInt(marks[s] || "0");
    });
    onSubmit(numericMarks);
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="geometric-card max-w-2xl mx-auto p-10"
    >
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20">
          <GraduationCap className="text-white w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Academic Records</h2>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-widest text-[10px]">Enter subject-wise performance for {standard}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {subjects.map((subject) => (
          <div key={subject} className="space-y-1.5">
            <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">{subject}</label>
            <input
              type="number"
              min="0"
              max="100"
              required
              placeholder="00"
              value={marks[subject] || ""}
              onChange={(e) => setMarks({ ...marks, [subject]: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none font-bold text-slate-900 placeholder:text-slate-300"
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-12 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-900/10 disabled:opacity-70 active:scale-[0.99]"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <Send className="w-4 h-4" />
            Generate Career Roadmap
          </>
        )}
      </button>
    </motion.form>
  );
}

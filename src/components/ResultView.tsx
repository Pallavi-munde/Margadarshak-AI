import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, BookOpen, ExternalLink, GraduationCap, ChevronRight, ArrowDown } from "lucide-react";
import { RecommendationResult } from "../services/gemini";
import { cn } from "../lib/utils";

interface ResultViewProps {
  results: RecommendationResult[];
  marks: Record<string, number>;
  onReset: () => void;
}

export function ResultView({ results, marks, onReset }: ResultViewProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const roadmapRef = useRef<HTMLDivElement>(null);
  const alternativesRef = useRef<HTMLDivElement>(null);

  const currentResult = results[selectedIndex];
  const totalMarks = Object.values(marks).reduce((a, b) => a + b, 0);
  const aggregate = (totalMarks / (Object.keys(marks).length * 100)) * 100;

  const scrollToRoadmap = () => {
    roadmapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToAlternatives = () => {
    alternativesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="grid grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Dynamic Recommendation Hero */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentResult.career}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="col-span-12 lg:col-span-8 geometric-card bg-slate-800 border-none text-white overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 p-2">
            <span className="inline-block bg-brand-500 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-6 shadow-lg shadow-brand-500/20">
              {selectedIndex === 0 ? "TOP MATCH" : `OPTION #${selectedIndex + 1}`}: {currentResult.confidence}%
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              {currentResult.career}
            </h1>
            <p className="text-slate-300 text-lg max-w-xl leading-relaxed mb-8 min-h-[80px]">
              {currentResult.reason}
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={scrollToRoadmap}
                className="bg-brand-500 hover:bg-brand-600 px-6 py-3 rounded-lg font-bold transition-all shadow-xl shadow-brand-500/20 flex items-center gap-2"
              >
                View Full Roadmap <ArrowDown className="w-4 h-4" />
              </button>
              <button 
                onClick={scrollToAlternatives}
                className="bg-white/10 hover:bg-white/20 border border-white/10 px-6 py-3 rounded-lg font-bold transition-all"
              >
                Compare Alternatives
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Aggregate Score Card */}
      <div className="col-span-12 lg:col-span-4 geometric-card flex flex-col justify-center text-center py-10">
        <h3 className="card-title">Aggregate Proficiency</h3>
        <div className="text-6xl font-black text-brand-500 tracking-tighter mb-2">
          {aggregate.toFixed(1)}%
        </div>
        <div className="text-sm font-bold text-slate-500">
          +{(aggregate - 60).toFixed(1)}% above base eligibility
        </div>
        <div className="mt-8 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold uppercase tracking-widest inline-block mx-auto border border-emerald-100">
          Distinction Grade A+
        </div>
      </div>

      {/* Subject Proficiency Grid */}
      <div className="col-span-12 lg:col-span-5 geometric-card">
        <h3 className="card-title">Subject-Wise Proficiency</h3>
        <div className="space-y-5">
          {Object.entries(marks).map(([subject, score]) => (
            <div key={subject} className="group">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">{subject}</span>
                <span className="text-xs font-black text-brand-500">{score}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-brand-500 rounded-full group-hover:bg-brand-600 transition-colors" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap Card */}
      <div ref={roadmapRef} className="col-span-12 lg:col-span-7 geometric-card scroll-mt-24">
        <h3 className="card-title">Success Roadmap: {currentResult.career}</h3>
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentResult.career}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="relative pl-8 space-y-10"
          >
            <div className="absolute left-[7px] top-2 bottom-4 w-[2px] border-l-2 border-dashed border-slate-200" />
            {currentResult.roadmap.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 bg-white border-2 border-brand-500 rounded-full z-10 shadow-sm" />
                <div>
                  <p className="text-sm font-bold text-slate-900 leading-none mb-2">{step}</p>
                  <div className="inline-flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                      Stage {idx + 1}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        <div className="mt-12 pt-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="card-title flex items-center gap-2">
                <BookOpen className="w-3 h-3" /> Entrance Exams
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentResult.exams.map(exam => (
                  <span key={exam} className="text-[11px] font-bold px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-600 uppercase">
                    {exam}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="card-title flex items-center gap-2">
                <GraduationCap className="w-3 h-3" /> Top Colleges
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentResult.colleges.map(college => (
                  <span key={college} className="text-[11px] font-bold px-2 py-1 bg-slate-100 rounded text-slate-700">
                    {college}
                  </span>
                ))}
              </div>
            </div>
        </div>
      </div>

      {/* Alternative Matches Section */}
      <div ref={alternativesRef} className="col-span-12 pt-10 text-center scroll-mt-24">
        <h3 className="card-title mb-8">All Career Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {results.map((res, i) => (
            <button 
              key={i} 
              onClick={() => {
                setSelectedIndex(i);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={cn(
                "geometric-card text-left flex items-center justify-between group transition-all cursor-pointer w-full hover:scale-[1.02]",
                selectedIndex === i ? "border-brand-500 ring-4 ring-brand-500/5" : "hover:border-slate-300"
              )}
            >
              <div>
                <h4 className="font-bold text-lg text-slate-900 truncate">{res.career}</h4>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  {i === 0 ? "Primary Match" : `Alternative #${i}`} • {res.confidence}%
                </p>
              </div>
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0 ml-4",
                selectedIndex === i ? "bg-brand-500 text-white" : "bg-slate-50 text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-500"
              )}>
                <ChevronRight className="w-5 h-5" />
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-20">
          <button
            onClick={onReset}
            className="btn-secondary flex items-center gap-2 mx-auto"
          >
            ← Check Profile for Another Standard
          </button>
        </div>
      </div>
    </div>
  );
}


import { useState } from "react";
import { Search, ChevronRight, BookOpen, Briefcase, Info } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

const CAREER_DATA = [
  { 
    id: 1, 
    title: "Software Engineering", 
    category: "Technology", 
    desc: "Building the digital future through code and algorithms.",
    prospects: "High Demand",
    salary: "₹6L - ₹40L+",
    skills: ["Programming", "Logic", "Problem Solving"]
  },
  { 
    id: 2, 
    title: "Medicine (MBBS)", 
    category: "Healthcare", 
    desc: "Primary healthcare professional saving lives through diagnostics and treatment.",
    prospects: "Essential",
    salary: "₹8L - ₹50L+",
    skills: ["Biology", "Empathy", "Dedication"]
  },
  { 
    id: 3, 
    title: "Chartered Accountancy", 
    category: "Commence", 
    desc: "Expert in auditing, taxation, and financial planning.",
    prospects: "Stable",
    salary: "₹7L - ₹25L+",
    skills: ["Accounts", "Math", "Law"]
  },
  { 
    id: 4, 
    title: "Data Science", 
    category: "Technology", 
    desc: "Extracting insights from complex data to drive business decisions.",
    prospects: "V. High",
    salary: "₹8L - ₹30L+",
    skills: ["Statistics", "Python", "ML"]
  },
  { 
    id: 5, 
    title: "Architecture", 
    category: "Design", 
    desc: "Designing spaces that blend aesthetics with functionality.",
    prospects: "Moderate",
    salary: "₹4L - ₹15L+",
    skills: ["Physics", "Design", "Drawing"]
  },
  { 
    id: 6, 
    title: "Digital Marketing", 
    category: "Business", 
    desc: "Connecting brands with consumers through digital channels.",
    prospects: "Growing",
    salary: "₹4L - ₹20L+",
    skills: ["Creativity", "Writing", "Analytics"]
  }
];

export function CareerLibrary() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(CAREER_DATA.map(c => c.category)))];
  
  const filtered = CAREER_DATA.filter(c => 
    (filter === "All" || c.category === filter) &&
    (c.title.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Career Archive</h2>
        <p className="text-slate-500 font-medium max-w-xl mx-auto">Explore high-impact career paths in India with detailed insights on salary and prospects.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-2 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-2 px-4 w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search careers..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none py-2 text-sm font-medium"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 px-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap",
                filter === cat 
                  ? "bg-slate-900 text-white" 
                  : "bg-slate-50 text-slate-500 hover:bg-slate-100"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((career, idx) => (
          <motion.div
            key={career.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="geometric-card flex flex-col group hover:border-brand-500 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
               <span className="text-[10px] font-black text-brand-500 uppercase tracking-widest py-1 px-2 bg-brand-500/5 rounded">
                {career.category}
               </span>
               <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                 <Briefcase className="w-2.5 h-2.5" /> {career.prospects}
               </div>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">{career.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1">{career.desc}</p>
            
            <div className="space-y-4 pt-4 border-t border-slate-100">
               <div className="flex justify-between items-center">
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg Salary</span>
                 <span className="text-sm font-bold text-slate-700">{career.salary}</span>
               </div>
               <div className="flex flex-wrap gap-2">
                 {career.skills.map(skill => (
                   <span key={skill} className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-500 rounded">
                     {skill}
                   </span>
                 ))}
               </div>
               <button className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-brand-600 hover:bg-brand-50 rounded-lg transition-colors">
                  Full Details <ChevronRight className="w-3 h-3" />
               </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

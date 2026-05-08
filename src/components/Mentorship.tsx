import { useState } from "react";
import { UserCheck, MessageSquare, Star, ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

const MENTORS = [
  {
    name: "Dr. Ananya Iyer",
    title: "Senior AI Researcher",
    field: "Technology",
    exp: "12+ Yrs",
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
  },
  {
    name: "Rohan Malhotra",
    title: "Civil Services Mentor",
    field: "IAS/UPSC",
    exp: "15+ Yrs",
    rating: 5.0,
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
  },
  {
    name: "Priya Das",
    title: "Lead Design Strategist",
    field: "Design & UX",
    exp: "8+ Yrs",
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop"
  },
  {
    name: "Vikram Seth",
    title: "FinTech Consultant (CA)",
    field: "Finance",
    exp: "10+ Yrs",
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
  }
];

export function Mentorship() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
           <h2 className="text-4xl font-black text-slate-900 tracking-tight">Connect with Experts</h2>
           <p className="text-slate-500 font-medium">Get guidance from veterans who have navigated the same paths.</p>
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-200">
           {["All", "Tech", "Finance", "Govt"].map(tab => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={cn(
                 "px-4 py-2 text-xs font-bold rounded-lg transition-all",
                 activeTab === tab ? "bg-brand-600 text-white" : "hover:bg-slate-50 text-slate-500"
               )}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MENTORS.map((mentor, i) => (
          <motion.div
             key={mentor.name}
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: i * 0.1 }}
             className="geometric-card p-0 overflow-hidden group hover:border-brand-500 transition-all flex flex-col"
          >
            <div className="h-48 overflow-hidden grayscale group-hover:grayscale-0 transition-all relative">
               <img src={mentor.img} alt={mentor.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
               <div className="absolute top-4 right-4 px-2 py-1 bg-white/90 backdrop-blur rounded-lg text-[10px] font-black flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 text-brand-600 fill-brand-600" /> {mentor.rating}
               </div>
            </div>
            
            <div className="p-6 space-y-4 flex-1 flex flex-col">
               <div>
                  <h3 className="font-bold text-slate-900 leading-tight mb-1">{mentor.name}</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{mentor.title}</p>
               </div>
               
               <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] font-bold px-2 py-1 bg-slate-50 border border-slate-100 rounded uppercase text-slate-500">{mentor.field}</span>
                  <span className="text-[10px] font-bold px-2 py-1 bg-slate-50 border border-slate-100 rounded uppercase text-slate-500">{mentor.exp}</span>
               </div>
               
               <div className="pt-4 mt-auto border-t border-slate-50">
                  <button className="w-full btn-primary py-3 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-brand-500/20">
                     Request Session <MessageSquare className="w-3.5 h-3.5" />
                  </button>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="geometric-card bg-slate-900 border-none p-10 text-white flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative">
         <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-500/10 blur-[100px]" />
         <div className="space-y-4 relative z-10 max-w-xl text-center md:text-left">
            <h2 className="text-3xl font-black tracking-tight leading-none">Become a Career Mentor</h2>
            <p className="text-slate-400 font-medium">Share your experience and help the next generation of Indian students find their calling. Join our network of 500+ experts.</p>
         </div>
         <button className="relative z-10 min-w-[200px] h-14 bg-white text-slate-900 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-[0.98] shadow-2xl flex items-center justify-center gap-3">
            Register as Expert <ArrowUpRight className="w-4 h-4" />
         </button>
      </div>
    </div>
  );
}

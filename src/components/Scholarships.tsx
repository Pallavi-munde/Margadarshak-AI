import { motion } from "motion/react";
import { Award, GraduationCap, MapPin, ArrowRight } from "lucide-react";

const SCHOLARSHIPS = [
  {
    name: "INSPIRE Scholarship",
    org: "DST, Govt of India",
    amount: "₹80,000 / year",
    eligibility: "Top 1% in 12th Board",
    desc: "Innovation in Science Pursuit for Inspired Research for Basic Sciences.",
  },
  {
    name: "Kishore Vaigyanik Protsahan Yojana",
    org: "IISc Bangalore",
    amount: "₹5,000 - ₹7,000 / month",
    eligibility: "10th/12th Students",
    desc: "Encouraging students to take up research careers in Basic Sciences.",
  },
  {
    name: "PM Research Fellowship",
    org: "Govt of India",
    amount: "₹70,000 - ₹80,000 / month",
    eligibility: "B.Tech/Masters Graduates",
    desc: "Top research scholarship for PhD candidates in IITs/IISc.",
  },
  {
    name: "HDFC Badhte Kadam",
    org: "HDFC Bank",
    amount: "Up to ₹1,00,000",
    eligibility: "Underprivileged Students",
    desc: "Supporting high-potential students from economically weaker sections.",
  },
  {
    name: "Sitaram Jindal Scholarship",
    org: "Jindal Foundation",
    amount: "Variable",
    eligibility: "Meritorious Students",
    desc: "Private scholarship for students pursuing professional courses.",
  }
];

export function Scholarships() {
  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      <div className="text-center space-y-4">
        <div className="inline-block p-4 bg-emerald-50 rounded-full mb-2">
            <Award className="w-10 h-10 text-emerald-600" />
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Scholarships & Grants</h2>
        <p className="text-slate-500 font-medium max-w-xl mx-auto italic leading-relaxed">
          Financial aid opportunities to support your academic journey across India.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {SCHOLARSHIPS.map((sc, i) => (
          <motion.div
            key={sc.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="geometric-card flex flex-col md:flex-row items-center gap-8 group hover:border-emerald-500 transition-all border-r-4 border-r-emerald-500"
          >
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 justify-center md:justify-start">
                 <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-all">{sc.name}</h3>
                 <span className="text-[10px] font-black text-emerald-600 px-2 py-1 bg-emerald-50 rounded uppercase tracking-widest mx-auto md:mx-0 whitespace-nowrap">
                  {sc.amount}
                 </span>
              </div>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{sc.desc}</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                 <div className="flex items-center gap-2">
                    <GraduationCap className="w-3 h-3 text-slate-400" />
                    <span className="text-xs font-bold text-slate-400">Elig: {sc.eligibility}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span className="text-xs font-bold text-slate-400">{sc.org}</span>
                 </div>
              </div>
            </div>
            
            <button className="w-full md:w-auto px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all hover:bg-slate-800 shadow-xl shadow-slate-900/10 active:scale-[0.98]">
              Apply Now <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

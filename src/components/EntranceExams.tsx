import { motion } from "motion/react";
import { BookOpen, Calendar, MapPin, ExternalLink, Info } from "lucide-react";

const EXAMS = [
  {
    name: "JEE Main",
    level: "National",
    field: "Engineering",
    freq: "Twice a year",
    desc: "Gateway to NITs, IIITs and CFTIs.",
    link: "https://jeemain.nta.nic.in/"
  },
  {
    name: "JEE Advanced",
    level: "National",
    field: "Engineering",
    freq: "Once a year",
    desc: "Qualifying exam for IIT admissions.",
    link: "https://jeeadv.ac.in/"
  },
  {
    name: "NEET UG",
    level: "National",
    field: "Medicine",
    freq: "Once a year",
    desc: "Common entrance for MBBS/BDS/AYUSH.",
    link: "https://neet.nta.nic.in/"
  },
  {
    name: "CLAT",
    level: "National",
    field: "Law",
    freq: "Once a year",
    desc: "For admission to 22 National Law Universities.",
    link: "https://consortiumofnlus.ac.in/"
  },
  {
    name: "UCEED",
    level: "National",
    field: "Design",
    freq: "Once a year",
    desc: "For B.Des admission to IIT Bombay, Guwahati, etc.",
    link: "https://www.uceed.iitb.ac.in/"
  },
  {
    name: "UPSC CSE",
    level: "National",
    field: "Civil Services",
    freq: "Once a year",
    desc: "Elite services like IAS, IPS, IFS.",
    link: "https://www.upsc.gov.in/"
  }
];

export function EntranceExams() {
  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 bg-brand-500/10 rounded-2xl flex items-center justify-center text-brand-600 flex-shrink-0">
          <BookOpen className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">National Entrance Exams</h2>
          <p className="text-slate-500 font-medium">Detailed schedule and information for top competitive exams in India.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EXAMS.map((exam, i) => (
          <motion.div
            key={exam.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="geometric-card flex flex-col justify-between group hover:border-brand-500 transition-all border-l-4 border-l-brand-500"
          >
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{exam.name}</h3>
                <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded uppercase tracking-widest">{exam.level}</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 italic mb-6">"{exam.desc}"</p>
              
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Field</p>
                   <p className="text-xs font-bold text-slate-700">{exam.field}</p>
                 </div>
                 <div className="space-y-1 text-right">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Frequency</p>
                   <p className="text-xs font-bold text-slate-700">{exam.freq}</p>
                 </div>
              </div>
            </div>

            <a 
              href={exam.link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-3 bg-slate-50 hover:bg-brand-600 hover:text-white rounded-lg text-xs font-black transition-all group-hover:shadow-lg group-hover:shadow-brand-500/20"
            >
               Official Website <ExternalLink className="w-3 h-3" />
            </a>
          </motion.div>
        ))}
      </div>

      <div className="bg-yellow-50 border border-yellow-100 p-6 rounded-2xl flex gap-4 mt-12">
         <Info className="w-6 h-6 text-yellow-600 flex-shrink-0" />
         <div>
            <h4 className="text-sm font-bold text-yellow-800 uppercase tracking-wide mb-1">Important Notice</h4>
            <p className="text-xs text-yellow-700 font-medium">Exam dates and registration portals change annually. Always verify the latest information from official National Testing Agency (NTA) or exam conducting body websites.</p>
         </div>
      </div>
    </div>
  );
}

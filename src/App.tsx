import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, setDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Compass, Sparkles, Target, BookOpen, Layers } from "lucide-react";
import { auth, db, handleFirestoreError, OperationType } from "./lib/firebase";
import { cn } from "./lib/utils";
import { Auth } from "./components/Auth";
import { MarksForm } from "./components/MarksForm";
import { ResultView } from "./components/ResultView";
import { MarksAnalysis } from "./components/MarksAnalysis";
import { CareerLibrary } from "./components/CareerLibrary";
import { EntranceExams } from "./components/EntranceExams";
import { Scholarships } from "./components/Scholarships";
import { Mentorship } from "./components/Mentorship";
import { getCareerRecommendations, RecommendationResult } from "./services/gemini";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [standard, setStandard] = useState<"10th" | "12th" | null>(null);
  const [results, setResults] = useState<RecommendationResult[] | null>(null);
  const [userMarks, setUserMarks] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    // Simple Local Auth Loader
    const savedUser = localStorage.getItem("student_auth_session");
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser);
        setUser(u);
        const userDocPath = `users/${u.uid}`;
        // Upsert user profile to Firestore
        setDoc(doc(db, "users", u.uid), {
          userId: u.uid,
          displayName: u.displayName,
          email: u.email,
          updatedAt: serverTimestamp()
        }, { merge: true }).catch(error => {
          handleFirestoreError(error, OperationType.WRITE, userDocPath);
        });
      } catch (e) {
        console.error("Auth session parse error", e);
        localStorage.removeItem("student_auth_session");
      }
    }
    setAuthReady(true);
  }, []);

  const handleMarksSubmit = async (marks: Record<string, number>) => {
    if (!user || !standard) return;
    setLoading(true);
    try {
      // 1. Get AI Recommendations
      const aiResults = await getCareerRecommendations(marks, standard);
      setResults(aiResults);
      setUserMarks(marks);

      // 2. Save Academic Record to Firestore
      const total = Object.values(marks).reduce((a, b) => a + b, 0);
      const percentage = (total / (Object.keys(marks).length * 100)) * 100;
      
      const academicPath = "academic_records";
      try {
        await addDoc(collection(db, academicPath), {
          userId: user.uid,
          standard,
          marks,
          percentage,
          updatedAt: serverTimestamp()
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, academicPath);
      }

      // 3. Save Recommendation to Firestore
      const recommendationPath = "recommendations";
      try {
        await addDoc(collection(db, recommendationPath), {
          userId: user.uid,
          standard,
          suggestions: aiResults,
          createdAt: serverTimestamp()
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, recommendationPath);
      }
      
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!authReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Sparkles className="w-8 h-8 text-brand-600 animate-pulse" />
      </div>
    );
  }

  const renderContent = () => {
    if (activeTab === "Marks Analysis") {
      return user ? <MarksAnalysis userId={user.uid} /> : <div className="text-center p-20 font-bold text-slate-400">Please sign in to view analysis.</div>;
    }

    if (activeTab === "Career Library") {
      return <CareerLibrary />;
    }

    if (activeTab === "Entrance Exams") {
      return <EntranceExams />;
    }

    if (activeTab === "Scholarships") {
      return <Scholarships />;
    }

    if (activeTab === "Mentorship") {
      return <Mentorship />;
    }

    if (activeTab !== "Dashboard") {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="geometric-card min-h-[400px] flex flex-col items-center justify-center text-center p-12"
        >
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 text-slate-300">
             <Compass className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{activeTab} Section</h2>
          <p className="text-slate-500 max-w-sm">
            This module is currently being optimized to provide state-wide career data for {activeTab}. Check back soon for updates.
          </p>
          <button 
            onClick={() => setActiveTab("Dashboard")}
            className="mt-8 btn-primary"
          >
            Return to Dashboard
          </button>
        </motion.div>
      );
    }

    return (
      <AnimatePresence mode="wait">
        {!user ? (
          <motion.div 
            key="hero"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center space-y-8 py-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-500/10 rounded-full border border-brand-500/10 text-brand-600 text-[10px] font-black uppercase tracking-widest mb-4">
              <Sparkles className="w-3 h-3" />
              AI Career Intelligence
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-950 leading-[0.9]">
              Pave Your <br />
              <span className="text-brand-600">Future Path.</span>
            </h1>
            <p className="text-slate-500 max-w-xl mx-auto text-lg font-medium leading-relaxed">
              A geometric approach to career mapping. We analyze your academic precision to suggest high-impact careers in India.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-5xl mx-auto">
              {[
                { icon: Target, title: "DATA-DRIVEN", desc: "Precise subject-mark correlation analysis." },
                { icon: BookOpen, title: "EXAM ROADMAPS", desc: "Step-by-step guidance for JEE, NEET, CLAT." },
                { icon: Layers, title: "INSTITUTIONAL", desc: "Direct mapping to top NIRF ranked colleges." },
              ].map((item, i) => (
                <div key={i} className="geometric-card text-left">
                  <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center mb-6">
                    <item.icon className="w-5 h-5 text-brand-600" />
                  </div>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ) : results && userMarks ? (
          <ResultView 
            results={results} 
            marks={userMarks}
            onReset={() => { setResults(null); setStandard(null); setUserMarks(null); }} 
          />
        ) : !standard ? (
          <motion.div 
            key="selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-12"
          >
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Select Grade</h2>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Tailoring intelligence for your stage</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {["10th", "12th"].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setStandard(lvl as "10th" | "12th")}
                  className="geometric-card text-left hover:border-brand-600 hover:ring-8 hover:ring-brand-600/5 transition-all group p-10"
                >
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-600 group-hover:text-white transition-all shadow-sm">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <h2 className="card-title text-brand-600 mb-1">{lvl} Standard</h2>
                  <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Academic Audit</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-2">
                    {lvl === "10th" 
                      ? "Evaluate foundational strengths across core subjects for stream selection."
                      : "Advanced pathfinding for professional degrees and competitive entrance exams."
                    }
                  </p>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="max-w-4xl mx-auto">
              <button 
                onClick={() => setStandard(null)}
                className="mb-8 text-slate-400 hover:text-slate-600 flex items-center gap-2 text-sm font-medium transition-colors"
              >
                &larr; Back to selection
              </button>
              <MarksForm standard={standard} onSubmit={handleMarksSubmit} isLoading={loading} />
          </div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-50 selection:bg-brand-600/10">
      {/* Sidebar - Geometric Balance Layout */}
      {user && (
        <aside className="w-64 bg-slate-900 text-white flex flex-col p-6 sticky top-0 h-screen hidden lg:flex">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-6 h-6 bg-brand-500 rounded-md shadow-lg shadow-brand-500/50" />
            <span className="font-extrabold text-lg tracking-tight uppercase">Margdarshak AI</span>
          </div>
          
          <nav className="flex-1 space-y-1">
            {[
              { label: "Dashboard" },
              { label: "Marks Analysis" },
              { label: "Career Library" },
              { label: "Entrance Exams" },
              { label: "Scholarships" },
              { label: "Mentorship" },
            ].map((item) => (
              <div 
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={cn(
                  "py-3 text-sm transition-all cursor-pointer flex items-center gap-3 font-medium",
                  activeTab === item.label ? "text-brand-500 opacity-100" : "text-white opacity-50 hover:opacity-100"
                )}
              >
                {item.label}
              </div>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/10 opacity-50 text-[10px] uppercase font-bold tracking-widest cursor-pointer hover:opacity-100 transition-opacity">
            Settings
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">Career Guidance</h2>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
              {user ? (activeTab !== "Dashboard" ? activeTab : (standard ? `${standard} Standard Path` : "Awaiting Selection")) : "Welcome Student"}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Auth user={user} />
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          {renderContent()}
        </main>


      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
           <div className="flex justify-center gap-2 text-slate-400">
             <Sparkles className="w-5 h-5" />
             <span className="text-sm font-medium tracking-tight uppercase">AI Future Predictor</span>
           </div>
           <p className="text-slate-500 text-sm">© 2026 Margdarshak. Empowering Indian students to lead their future.</p>
        </div>
      </footer>
    </div>
  </div>
  );
}

function GraduationCap(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    );
  }

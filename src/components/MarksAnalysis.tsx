import { useState, useEffect } from "react";
import { collection, query, where, getDocs, orderBy, Timestamp } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../lib/firebase";
import { motion } from "motion/react";
import { History, TrendingUp, Calendar, Trash2 } from "lucide-react";

interface AcademicRecord {
  id: string;
  standard: string;
  percentage: number;
  updatedAt: Timestamp;
  marks: Record<string, number>;
}

export function MarksAnalysis({ userId }: { userId: string }) {
  const [records, setRecords] = useState<AcademicRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecords() {
      try {
        const q = query(
          collection(db, "academic_records"),
          where("userId", "==", userId),
          orderBy("updatedAt", "desc")
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as AcademicRecord[];
        setRecords(data);
      } catch (error) {
        console.error("Fetch records error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRecords();
  }, [userId]);

  if (loading) return <div className="flex justify-center p-20 animate-pulse text-slate-400">Loading your history...</div>;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Academic History</h2>
          <p className="text-slate-500 font-medium">Track your performance over time across different levels.</p>
        </div>
        <div className="p-3 bg-brand-500/10 rounded-xl text-brand-600">
          <History className="w-6 h-6" />
        </div>
      </div>

      {records.length === 0 ? (
        <div className="geometric-card text-center py-20">
          <TrendingUp className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <p className="text-slate-500 font-medium">No records found. Complete a dashboard analysis to see your history here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {records.map((record) => (
            <motion.div 
              key={record.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="geometric-card flex flex-col md:flex-row items-center justify-between gap-6 hover:border-brand-500 transition-colors"
            >
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center font-bold text-slate-900">
                   {record.standard}
                 </div>
                 <div>
                   <h3 className="font-bold text-slate-900">Analysis Result</h3>
                   <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-wider">
                     <Calendar className="w-3 h-3" />
                     {record.updatedAt.toDate().toLocaleDateString(undefined, { dateStyle: 'medium' })}
                   </div>
                 </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {Object.entries(record.marks).map(([sub, score]) => (
                  <div key={sub} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-500 uppercase">
                    {sub.slice(0, 3)}: {score}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-6">
                 <div className="text-right">
                    <div className="text-2xl font-black text-brand-600">{record.percentage.toFixed(1)}%</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Aggregate</div>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

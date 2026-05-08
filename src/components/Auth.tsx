import { useState } from "react";
import { LogIn, LogOut, User as UserIcon } from "lucide-react";

interface AuthProps {
  user: any;
}

export function Auth({ user }: AuthProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const mockUser = {
      uid: `local_${name.toLowerCase().replace(/\s/g, "_")}_${Math.random().toString(36).substring(7)}`,
      displayName: name,
      email: `${name.toLowerCase().replace(/\s/g, "")}@student.local`
    };

    localStorage.setItem("student_auth_session", JSON.stringify(mockUser));
    window.location.reload();
  };

  const logout = () => {
    localStorage.removeItem("student_auth_session");
    window.location.reload();
  };

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end hidden sm:flex">
          <span className="text-sm font-bold text-slate-900">{user.displayName}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Active Student</span>
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-slate-100 p-0.5 relative group cursor-pointer">
          <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center">
            <UserIcon className="w-4 h-4 text-slate-400" />
          </div>
          <button 
            onClick={logout}
            className="absolute -top-1 -right-1 w-5 h-5 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <LogOut className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="btn-primary flex items-center gap-2"
      >
        <LogIn className="w-4 h-4" />
        Get Started
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-black text-slate-900">Student Sign In</h3>
              <p className="text-sm text-slate-500 font-medium">No account needed. Just your name.</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Full Name</label>
                <input 
                  autoFocus
                  required
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all font-medium"
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 btn-primary py-3"
                >
                  Enter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

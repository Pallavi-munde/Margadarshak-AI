import { signInWithPopup, GoogleAuthProvider, signOut, User } from "firebase/auth";
import { auth } from "../lib/firebase";
import { LogIn, LogOut, User as UserIcon } from "lucide-react";

interface AuthProps {
  user: User | null;
}

export function Auth({ user }: AuthProps) {
  const login = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logout = () => signOut(auth);

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end hidden sm:flex">
          <span className="text-sm font-bold text-slate-900">{user.displayName}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Student ID: #{user.uid.slice(0, 5)}</span>
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-slate-100 p-0.5 relative group cursor-pointer">
          {user.photoURL ? (
            <img src={user.photoURL} alt={user.displayName || ""} className="w-full h-full rounded-full" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-slate-400" />
            </div>
          )}
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
    <button
      onClick={login}
      className="btn-primary flex items-center gap-2"
    >
      <LogIn className="w-4 h-4" />
      Sign In
    </button>
  );
}

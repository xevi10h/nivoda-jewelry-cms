import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, sessionStorage } from '@/lib/auth';

interface AuthContextType {
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (session: Session) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load session from localStorage on mount
    const storedSession = sessionStorage.get();
    setSession(storedSession);
    setIsLoading(false);
  }, []);

  const login = (newSession: Session) => {
    setSession(newSession);
    sessionStorage.set(newSession);
  };

  const logout = () => {
    setSession(null);
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthenticated: !!session,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

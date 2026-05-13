import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { User, UserRole } from "@/types";
import { DEMO_USERS, PASSWORDS } from "@/data/mockUsers";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  toggleSaveProperty: (propertyId: string) => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("estatery_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("estatery_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));

    const demoUser = DEMO_USERS.find(u => u.email === email);
    const expectedPassword = PASSWORDS[email];

    if (demoUser && expectedPassword === password) {
      const registeredUsers: User[] = JSON.parse(localStorage.getItem("estatery_registered_users") || "[]");
      const existingRegistered = registeredUsers.find(u => u.email === email);
      const loggedUser = existingRegistered || demoUser;

      localStorage.setItem("estatery_user", JSON.stringify(loggedUser));
      setUser(loggedUser);
      setIsLoading(false);
      return { success: true };
    }

    const registeredUsers: User[] = JSON.parse(localStorage.getItem("estatery_registered_users") || "[]");
    const regUser = registeredUsers.find(u => u.email === email);
    const regPasswords: Record<string, string> = JSON.parse(localStorage.getItem("estatery_passwords") || "{}");

    if (regUser && regPasswords[email] === password) {
      localStorage.setItem("estatery_user", JSON.stringify(regUser));
      setUser(regUser);
      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return { success: false, error: "Invalid email or password" };
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));

    const allEmails = [
      ...DEMO_USERS.map(u => u.email),
      ...JSON.parse(localStorage.getItem("estatery_registered_users") || "[]").map((u: User) => u.email)
    ];

    if (allEmails.includes(data.email)) {
      setIsLoading(false);
      return { success: false, error: "Email already registered" };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      phone: data.phone,
      verified: false,
      createdAt: new Date().toISOString().split("T")[0],
      savedProperties: []
    };

    const existing: User[] = JSON.parse(localStorage.getItem("estatery_registered_users") || "[]");
    existing.push(newUser);
    localStorage.setItem("estatery_registered_users", JSON.stringify(existing));

    const passwords: Record<string, string> = JSON.parse(localStorage.getItem("estatery_passwords") || "{}");
    passwords[data.email] = data.password;
    localStorage.setItem("estatery_passwords", JSON.stringify(passwords));

    setIsLoading(false);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("estatery_user");
    setUser(null);
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem("estatery_user", JSON.stringify(updated));

    const registered: User[] = JSON.parse(localStorage.getItem("estatery_registered_users") || "[]");
    const idx = registered.findIndex(u => u.id === user.id);
    if (idx >= 0) {
      registered[idx] = updated;
      localStorage.setItem("estatery_registered_users", JSON.stringify(registered));
    }
  }, [user]);

  const toggleSaveProperty = useCallback((propertyId: string) => {
    if (!user) return;
    const saved = user.savedProperties || [];
    const updated = saved.includes(propertyId)
      ? saved.filter(id => id !== propertyId)
      : [...saved, propertyId];
    updateProfile({ savedProperties: updated });
  }, [user, updateProfile]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout, updateProfile, toggleSaveProperty }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

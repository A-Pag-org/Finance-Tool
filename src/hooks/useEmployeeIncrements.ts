import { useState, useEffect } from "react";

const STORAGE_KEY = "fundflow-employee-increments";

export const useEmployeeIncrements = () => {
  const [increments, setIncrements] = useState<Record<string, number>>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  });

  // Save to localStorage whenever increments change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(increments));
  }, [increments]);

  // Listen for changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const newIncrements = JSON.parse(e.newValue);
          setIncrements(newIncrements);
        } catch (error) {
          console.error('Failed to parse increments from storage:', error);
        }
      }
    };

    // Add event listener for cross-tab synchronization
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const setIncrement = (employeeId: string, increment: number) => {
    setIncrements(prev => ({
      ...prev,
      [employeeId]: Math.max(0, Math.min(100, increment)),
    }));
  };

  const getIncrement = (employeeId: string): number => {
    return increments[employeeId] || 0;
  };

  const resetAll = () => {
    setIncrements({});
  };

  const resetEmployee = (employeeId: string) => {
    setIncrements(prev => {
      const updated = { ...prev };
      delete updated[employeeId];
      return updated;
    });
  };

  const hasAnyIncrements = Object.values(increments).some(inc => inc > 0);

  return {
    increments,
    setIncrement,
    getIncrement,
    resetAll,
    resetEmployee,
    hasAnyIncrements,
  };
};

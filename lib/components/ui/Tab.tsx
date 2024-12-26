"use client"

import { createContext, useContext, useState, ReactNode } from "react";

interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider");
  }
  return context;
}

function Tabs({
  children,
  defaultTab,
  onTabChange
}:  {
  children: ReactNode;
  defaultTab: string;
  onTabChange?: (activeTab: string) => void; 
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleSetActiveTab = (id: string) => {
    setActiveTab(id);
    if (onTabChange) {
      onTabChange(id);
    }
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleSetActiveTab }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }: { children: ReactNode }) {
  return <div className="flex border-b border-gray-200">{children}</div>;
}

function Tab({ children, id }: { children: ReactNode; id: string }) {
  const { activeTab, setActiveTab } = useTabs();

  return (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 text-sm font-medium transition-colors
        ${
          activeTab === id
            ? "text-blue-600 border-b-4 border-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
    >
      {children}
    </button>
  );
}

function TabPanels({ children }: { children: ReactNode }) {
  return <div className="">{children}</div>;
}

function TabPanel({ children, id }: { children: ReactNode; id: string }) {
  const { activeTab } = useTabs();

  if (activeTab !== id) return null;

  return <div className="py-4">{children}</div>;
}

export  {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel
};

import React from "react";

interface LoggedInLayoutProps {
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  children: React.ReactNode;
}

const LoggedInLayout: React.FC<LoggedInLayoutProps> = ({
  sidebar,
  header,
  children,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100 w-full">
      <header className="h-16 flex items-center px-4 bg-white shadow z-10 sticky top-0 w-full">
        {header}
      </header>
      <div className="flex flex-1 overflow-hidden w-full">
        <aside className="w-64 bg-white border-r shadow-sm hidden md:block p-4 h-full min-h-[calc(100vh-4rem)]">
          {sidebar}
        </aside>
        <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default LoggedInLayout;

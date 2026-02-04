import type { ReactNode } from "react";
import Navbar from "./Navbar";
import PageContainer from "./PageContainer";

type AppShellProps = {
  children: ReactNode;
};

const AppShell = ({ children }: AppShellProps) => {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <PageContainer>{children}</PageContainer>
      </main>
    </div>
  );
};

export default AppShell;

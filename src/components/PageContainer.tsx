import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
};

const PageContainer = ({ children }: PageContainerProps) => {
  return <div className="page-container">{children}</div>;
};

export default PageContainer;

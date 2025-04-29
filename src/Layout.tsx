import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout-container">
      <div className="layout-inner">
        <img alt="bg" src="/images/bg.jpg" className="layout-bg" />
        {children}
      </div>
    </div>
  );
}

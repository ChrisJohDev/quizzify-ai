import React from "react";
import Menu from "./menu";
import Footer from "./footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-grow flex flex-col">
      <Menu />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
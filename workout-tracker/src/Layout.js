// Layout.js
import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="mt-24">
        {" "}
        {/* Add some margin to account for the fixed header */}
        {children}
      </main>
    </div>
  );
};

export default Layout;

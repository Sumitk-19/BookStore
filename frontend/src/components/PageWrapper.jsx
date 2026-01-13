import React from "react";

function PageWrapper({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-10">
      <div className="max-w-7xl mx-auto px-6">
        {children}
      </div>
    </div>
  );
}

export default PageWrapper;

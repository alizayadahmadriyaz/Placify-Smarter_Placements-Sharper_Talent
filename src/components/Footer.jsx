import React from "react";
import { Brain } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white py-8 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <span className="text-xl font-bold">Placify</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400">© 2025 Placify. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

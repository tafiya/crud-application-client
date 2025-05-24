import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">My Website</h1>
        <nav className="space-x-4">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

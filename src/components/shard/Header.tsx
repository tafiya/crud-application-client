import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Portfolio Crud Application</h1>

      </div>
    </header>
  );
};

export default Header;

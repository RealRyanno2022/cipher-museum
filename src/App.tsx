import React from 'react';

const App: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center">
        <h1 className="text-4xl font-bold">Encryption Algorithms Display</h1>
        <p className="mt-2 text-lg">Explore various cryptographic algorithms</p>
      </header>
      
      <main className="mt-4">
        {/* Components for encryption algorithms will go here */}
      </main>

      <footer className="text-center mt-8">
        <p className="text-sm">&copy; 2024 Encryption App</p>
      </footer>
    </div>
  );
};

export default App;

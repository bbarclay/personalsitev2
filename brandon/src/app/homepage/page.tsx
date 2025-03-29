import React from 'react';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Brandon's Site</h1>
      <p className="text-lg mb-4">
        This is the homepage of the website. Here you can find various sections including Math and AI.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-3">Math Section</h2>
          <p>Explore mathematical concepts, formulas, and interactive demonstrations.</p>
          <a href="/math" className="text-blue-600 hover:underline mt-2 inline-block">
            Explore Math →
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-3">AI Section</h2>
          <p>Learn about artificial intelligence, machine learning, and modern AI applications.</p>
          <a href="/ai" className="text-blue-600 hover:underline mt-2 inline-block">
            Discover AI →
          </a>
        </div>
      </div>
    </div>
  );
} 
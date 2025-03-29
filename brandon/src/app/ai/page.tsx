import React from 'react';

export default function AIPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Artificial Intelligence</h1>
      <p className="text-lg mb-8">
        Welcome to the AI section. Here you'll find information about artificial intelligence and its applications.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Machine Learning</h2>
          <p className="mb-4">
            Machine Learning is a subset of AI that focuses on developing systems that can learn from and make decisions based on data.
          </p>
          <div className="space-y-2">
            <p>• Supervised Learning</p>
            <p>• Unsupervised Learning</p>
            <p>• Reinforcement Learning</p>
            <p>• Deep Learning</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Natural Language Processing</h2>
          <p className="mb-4">
            NLP enables computers to understand, interpret, and generate human language in a valuable way.
          </p>
          <div className="space-y-2">
            <p>• Text Classification</p>
            <p>• Sentiment Analysis</p>
            <p>• Translation</p>
            <p>• Question Answering</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">AI Applications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="border p-4 rounded">
            <h3 className="text-xl font-medium mb-2">Healthcare</h3>
            <p>Disease diagnosis, drug discovery, personalized treatment</p>
          </div>
          <div className="border p-4 rounded">
            <h3 className="text-xl font-medium mb-2">Finance</h3>
            <p>Fraud detection, algorithmic trading, risk assessment</p>
          </div>
          <div className="border p-4 rounded">
            <h3 className="text-xl font-medium mb-2">Automotive</h3>
            <p>Self-driving cars, predictive maintenance, safety systems</p>
          </div>
          <div className="border p-4 rounded">
            <h3 className="text-xl font-medium mb-2">Education</h3>
            <p>Personalized learning, automated grading, content creation</p>
          </div>
          <div className="border p-4 rounded">
            <h3 className="text-xl font-medium mb-2">Entertainment</h3>
            <p>Content recommendation, game AI, creative assistants</p>
          </div>
          <div className="border p-4 rounded">
            <h3 className="text-xl font-medium mb-2">Agriculture</h3>
            <p>Crop monitoring, yield prediction, automated farming</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <a href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </a>
      </div>
    </div>
  );
} 
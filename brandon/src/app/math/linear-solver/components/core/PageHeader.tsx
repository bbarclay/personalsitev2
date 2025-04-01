import React from 'react';

interface PageHeaderProps {
  showResources: boolean;
  toggleResources: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ showResources, toggleResources }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Interactive Linear System Solver
      </h2>
      
      <button
        onClick={toggleResources}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm flex items-center"
      >
        {showResources ? 'Hide Resources' : 'View Resources'}
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
      </button>
    </div>
  );
};

export default PageHeader; 
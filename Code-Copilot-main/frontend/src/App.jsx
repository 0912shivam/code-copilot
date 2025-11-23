import { useState, useEffect } from 'react';
import CodeGenerator from './components/CodeGenerator';
import HistoryList from './components/HistoryList';
import { FaCode, FaHistory, FaGithub } from 'react-icons/fa';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('generate');
  const [refreshHistory, setRefreshHistory] = useState(0);

  const handleGenerationSuccess = () => {
    // Refresh history when new code is generated
    setRefreshHistory(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50 to-neutral-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10 animate-fade-in">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-elegant-lg p-8 border border-neutral-200">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-3 rounded-xl mr-4 shadow-elegant">
                <FaCode className="text-4xl text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-700 via-primary-600 to-accent-600 bg-clip-text text-transparent">
                Code Generation Copilot
              </h1>
            </div>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Transform natural language into code using AI. Generate, view, and manage your code snippets with enterprise-grade precision.
            </p>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => setActiveTab('generate')}
            className={`flex items-center space-x-2 px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-elegant ${
              activeTab === 'generate'
                ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-elegant-lg scale-105'
                : 'bg-white text-neutral-700 hover:bg-neutral-50 hover:shadow-elegant-lg border border-neutral-200'
            }`}
          >
            <FaCode className="text-lg" />
            <span>Generate Code</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center space-x-2 px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-elegant ${
              activeTab === 'history'
                ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-elegant-lg scale-105'
                : 'bg-white text-neutral-700 hover:bg-neutral-50 hover:shadow-elegant-lg border border-neutral-200'
            }`}
          >
            <FaHistory className="text-lg" />
            <span>History</span>
          </button>
        </div>

        {/* Main Content */}
        <main>
          {activeTab === 'generate' && (
            <CodeGenerator onSuccess={handleGenerationSuccess} />
          )}
          {activeTab === 'history' && (
            <HistoryList refreshTrigger={refreshHistory} />
          )}
        </main>

        {/* Footer */}
        <footer className="text-center mt-16 mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-elegant p-6 border border-neutral-200">
            <div className="flex items-center justify-center space-x-2 mb-2 text-neutral-700">
              <FaGithub className="text-xl text-primary-600" />
              <span className="font-medium">Built with React, Express.js, and PostgreSQL</span>
            </div>
            <p className="text-sm text-neutral-600">Powered by OpenAI API | AutomationEdge Assignment</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;

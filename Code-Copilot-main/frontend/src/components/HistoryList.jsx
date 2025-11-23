import { useState, useEffect } from 'react';
import { getHistory } from '../services/api';
import CodeDisplay from './CodeDisplay';
import Pagination from './Pagination';
import { FaSpinner, FaInbox } from 'react-icons/fa';

const HistoryList = ({ refreshTrigger }) => {
  const [history, setHistory] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const fetchHistory = async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getHistory(page, 10);
      setHistory(response.data.generations || []);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err.error || 'Failed to load history');
      console.error('History fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory(1);
  }, [refreshTrigger]);

  const handlePageChange = (page) => {
    fetchHistory(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white/60 backdrop-blur-sm rounded-2xl shadow-elegant-lg border border-neutral-200">
        <FaSpinner className="text-5xl animate-spin mb-4 text-primary-600" />
        <p className="text-xl text-neutral-700 font-medium">Loading history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-6 rounded-2xl shadow-elegant-lg">
        <p className="font-semibold text-lg">Error Loading History</p>
        <p className="text-sm mt-1">{error}</p>
        <button
          onClick={() => fetchHistory(pagination.currentPage)}
          className="mt-4 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-300 shadow-elegant font-medium"
        >
          Retry
        </button>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-elegant-xl p-12 text-center border border-neutral-200">
        <FaInbox className="text-6xl text-neutral-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-neutral-800 mb-2">No History Yet</h3>
        <p className="text-neutral-600">
          Generate your first code snippet to see it here!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-elegant-lg p-6 border border-neutral-200">
        <h2 className="text-2xl font-bold text-neutral-800 flex items-center">
          <span className="text-primary-600 mr-3">■</span>
          Generation History
        </h2>
        <p className="text-neutral-600 mt-2 ml-8">
          Showing {history.length} of {pagination.totalItems} generations
        </p>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-elegant-lg overflow-hidden transition-all duration-300 hover:shadow-elegant-xl border border-neutral-200"
          >
            {/* Summary View */}
            <div
              className="p-6 cursor-pointer hover:bg-neutral-50/50 transition-colors duration-200"
              onClick={() => toggleExpand(item.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="px-3 py-1 bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700 rounded-lg text-sm font-semibold shadow-sm">
                      {item.language}
                    </span>
                    <span className="text-sm text-neutral-500 font-medium">
                      {new Date(item.createdAt).toLocaleDateString()} at{' '}
                      {new Date(item.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-neutral-800 font-medium mb-2 leading-relaxed">{item.prompt}</p>
                  <p className="text-sm text-neutral-500">
                    {item.code.split('\n').length} lines of code
                  </p>
                </div>
                <button className="text-neutral-400 hover:text-primary-600 ml-4 transition-colors duration-200">
                  {expandedId === item.id ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Expanded View */}
            {expandedId === item.id && (
              <div className="border-t border-neutral-200 animate-fade-in bg-neutral-50/30">
                <div className="p-6">
                  <CodeDisplay
                    code={item.code}
                    language={item.language}
                    prompt={item.prompt}
                    timestamp={item.createdAt}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
          hasNextPage={pagination.hasNextPage}
          hasPreviousPage={pagination.hasPreviousPage}
        />
      )}
    </div>
  );
};

export default HistoryList;

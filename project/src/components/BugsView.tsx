import React from 'react';
import { ArrowLeft, Bug, FileCode } from 'lucide-react';

type Bug = {
  id: string;
  title: string;
  severity: 'high' | 'medium' | 'low';
  status: 'open' | 'in-progress' | 'resolved';
  file: string;
  lineNumber: number;
  description: string;
  codeSnippet: string;
};

const mockBugs: Bug[] = [
  {
    id: 'BUG-001',
    title: 'Memory leak in useEffect cleanup',
    severity: 'high',
    status: 'open',
    file: 'src/components/Dashboard.tsx',
    lineNumber: 45,
    description: 'WebSocket connection not properly closed in useEffect cleanup function, causing memory leaks in long-running sessions.',
    codeSnippet: `useEffect(() => {
  const ws = new WebSocket(SOCKET_URL);
  ws.onmessage = (event) => {
    setOrders(JSON.parse(event.data));
  };
  // Missing cleanup
}, []);`
  },
  {
    id: 'BUG-002',
    title: 'Race condition in state update',
    severity: 'medium',
    status: 'in-progress',
    file: 'src/utils/orderUtils.ts',
    lineNumber: 123,
    description: 'Potential race condition when updating order status due to async state updates not being properly handled.',
    codeSnippet: `async function updateOrderStatus(orderId, status) {
  const response = await api.updateStatus(orderId, status);
  setOrders(orders.map(order => 
    order.id === orderId 
      ? { ...order, status: response.status }
      : order
  ));
}`
  }
];

type BugsViewProps = {
  onBack: () => void;
};

export default function BugsView({ onBack }: BugsViewProps) {
  const getSeverityColor = (severity: Bug['severity']) => {
    switch (severity) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusBadgeColor = (status: Bug['status']) => {
    switch (status) {
      case 'open':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'in-progress':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'resolved':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Analytics</span>
        </button>
        <div className="flex items-center space-x-2">
          <Bug size={24} className="text-red-400" />
          <h2 className="text-2xl font-semibold">Project Bugs</h2>
        </div>
      </div>

      <div className="space-y-6">
        {mockBugs.map((bug) => (
          <div key={bug.id} className="bg-[#1a1f2e] rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-gray-400">{bug.id}</span>
                  <h3 className="text-xl font-medium">{bug.title}</h3>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`flex items-center space-x-1 ${getSeverityColor(bug.severity)}`}>
                    <Bug size={16} />
                    <span className="capitalize">{bug.severity} Severity</span>
                  </span>
                  <span className={`px-2 py-1 rounded-full text-sm border ${getStatusBadgeColor(bug.status)}`}>
                    {bug.status}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-300 mb-4">{bug.description}</p>

            <div className="bg-[#0A0C10] rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2 text-gray-400 mb-2">
                <FileCode size={16} />
                <span>{bug.file}</span>
                <span>Line {bug.lineNumber}</span>
              </div>
              <pre className="text-sm overflow-x-auto">
                <code className="text-gray-300">{bug.codeSnippet}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
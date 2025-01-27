import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bug, Wrench, Zap, GraduationCap, ChevronRight, FileCode, Folder, Users, Calendar, GitBranch, GitCommit, Code, FileText, Package, Database } from 'lucide-react';
import Assessment from './Assessment';

// ... (keep all existing type definitions and mock data)

export default function ProjectDetails() {
  const { projectId } = useParams();
  const [activeTab, setActiveTab] = useState<'summary' | 'code' | 'analytics' | 'assessment'>('summary');
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  // ... (keep all existing functions and components)

  return (
    <div className="min-h-screen bg-[#0A0C10] text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <GraduationCap size={32} className="text-white" />
              <div className="text-2xl font-bold">SkillScout</div>
            </div>
            <select className="bg-[#1a1f2e] text-white px-4 py-2 rounded-lg border border-gray-700">
              <option>CapstoneProject</option>
            </select>
          </div>
        </div>
      </nav>

      {/* Tabs */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button 
              className={`px-4 py-4 font-medium transition-colors ${
                activeTab === 'summary' 
                  ? 'text-blue-400 border-b-2 border-blue-400' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('summary')}
            >
              Project Summary
            </button>
            <button 
              className={`px-4 py-4 font-medium transition-colors ${
                activeTab === 'code' 
                  ? 'text-blue-400 border-b-2 border-blue-400' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('code')}
            >
              Code Reference
            </button>
            <button 
              className={`px-4 py-4 font-medium transition-colors ${
                activeTab === 'analytics' 
                  ? 'text-blue-400 border-b-2 border-blue-400' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('analytics')}
            >
              Analytics (Beta)
            </button>
            <button 
              className={`px-4 py-4 font-medium transition-colors ${
                activeTab === 'assessment' 
                  ? 'text-blue-400 border-b-2 border-blue-400' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('assessment')}
            >
              Assessment
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'summary' ? (
          <ProjectSummaryContent />
        ) : activeTab === 'code' ? (
          <CodeReferenceContent />
        ) : activeTab === 'analytics' ? (
          <AnalyticsContent />
        ) : (
          <Assessment />
        )}
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Briefcase, GraduationCap, Github } from 'lucide-react';
import Dashboard from './components/Dashboard';
import AuthCallback from './components/AuthCallback';
import ProjectDetails from './components/ProjectDetails';

function LoginPage() {
  const handleGithubLogin = () => {
    // Simply redirect to callback which will then redirect to dashboard
    window.location.href = '/callback';
  };

  return (
    <div className="min-h-screen bg-[#1a1f2e] text-white p-8">
      <div className="max-w-md mx-auto space-y-8">
        <div className="flex items-center space-x-3">
          <GraduationCap size={40} className="text-white" />
          <h1 className="text-3xl font-bold">SkillScout</h1>
        </div>
        
        <div className="space-y-4 mt-12">
          <h2 className="text-4xl font-light leading-tight">
            We help you focus on building great skills without the need to worry about job search
          </h2>
          
          <h3 className="text-2xl mt-6 mb-8">Sign In</h3>
          
          <button 
            onClick={handleGithubLogin}
            className="w-full bg-[#2d3446] hover:bg-[#363d52] text-white p-3 rounded-lg flex items-center justify-center space-x-3 transition"
          >
            <Github size={20} />
            <span>GITHUB</span>
          </button>
          
          <p className="text-sm text-gray-400 text-center mt-6">
            Don't have an account? <a href="#" className="text-white hover:underline">Sign Up</a>
          </p>
          
          <p className="text-xs text-gray-500 text-center mt-4">
            By signing in, you agree to the <a href="#" className="text-blue-400 hover:underline">Terms of Use</a> and{' '}
            <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}

function LandingPage({ onRoleSelect }: { onRoleSelect: (role: 'candidate' | 'employer') => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
      <div className="max-w-4xl mx-auto pt-20 px-4">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-3 mb-12">
            <GraduationCap size={48} className="text-white" />
            <h1 className="text-5xl font-bold">SkillScout</h1>
          </div>
          
          <p className="text-2xl text-gray-300 mb-12">Skill based hiring platform</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
            <button
              onClick={() => onRoleSelect('candidate')}
              className="px-8 py-4 bg-white text-blue-900 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2"
            >
              <GraduationCap size={24} />
              <span>Use as Candidate</span>
            </button>
            
            <button
              onClick={() => onRoleSelect('employer')}
              className="px-8 py-4 bg-transparent border-2 border-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors duration-200 flex items-center space-x-2"
            >
              <Briefcase size={24} />
              <span>Use as Employer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'candidate' | 'employer'>('landing');

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            currentView === 'landing' ? (
              <LandingPage onRoleSelect={setCurrentView} />
            ) : currentView === 'candidate' ? (
              <LoginPage />
            ) : (
              <div>Employer page coming soon...</div>
            )
          } 
        />
        <Route path="/callback" element={<AuthCallback />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project/:projectId" element={<ProjectDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import React from 'react';
import { GraduationCap, Github, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ConnectGithub() {
  const navigate = useNavigate();

  const handleConnectGithub = () => {
    // Mock GitHub connection
    localStorage.setItem('github_connected', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#1a1f2e] text-white">
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <GraduationCap size={32} className="text-white" />
              <div className="text-2xl font-bold ml-2">SkillScout</div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <Github size={64} className="mx-auto text-gray-400" />
          <h1 className="text-3xl font-bold">Connect Your GitHub Account</h1>
          <p className="text-gray-400 text-lg">
            Link your GitHub account to showcase your projects and skills to potential employers.
          </p>

          <div className="bg-[#0A0C10] rounded-lg p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">What you'll get:</h2>
            <ul className="space-y-4 text-left">
              <li className="flex items-start space-x-3">
                <ArrowRight className="mt-1 text-blue-400 flex-shrink-0" />
                <span>Automatic project analysis and skill detection</span>
              </li>
              <li className="flex items-start space-x-3">
                <ArrowRight className="mt-1 text-blue-400 flex-shrink-0" />
                <span>Code quality metrics and insights</span>
              </li>
              <li className="flex items-start space-x-3">
                <ArrowRight className="mt-1 text-blue-400 flex-shrink-0" />
                <span>Showcase your best projects to employers</span>
              </li>
              <li className="flex items-start space-x-3">
                <ArrowRight className="mt-1 text-blue-400 flex-shrink-0" />
                <span>Personalized skill recommendations</span>
              </li>
            </ul>
          </div>

          <button
            onClick={handleConnectGithub}
            className="mt-8 px-8 py-4 bg-[#2EA043] hover:bg-[#2C974B] text-white rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-3 mx-auto"
          >
            <Github size={24} />
            <span>Connect GitHub Account</span>
          </button>

          <p className="text-sm text-gray-500 mt-6">
            We'll never post anything without your permission.
            By connecting your GitHub account, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
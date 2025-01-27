import React, { useState } from 'react';
import { Plus, ChevronDown, Send, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Project = {
  id: string;
  repo_full_name: string;
  description: string | null;
  skills: string[];
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  
  // Mock data for demonstration
  const projects: Project[] = [
    {
      id: '1',
      repo_full_name: 'user/project-1',
      description: 'A sample project',
      skills: ['JavaScript', 'React']
    }
  ];

  const mockRepos = [
    {
      full_name: 'user/repo-1',
      description: 'Sample repository 1',
      language: 'TypeScript'
    },
    {
      full_name: 'user/repo-2',
      description: 'Sample repository 2',
      language: 'JavaScript'
    }
  ];

  const addProject = (repo: any) => {
    setShowDropdown(false);
  };

  const deleteProject = (projectId: string) => {
    // Mock delete functionality
  };

  const submitFeedback = () => {
    setFeedback('');
    setShowFeedback(false);
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-[#0A0C10] text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold">SkillScout</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="flex items-center space-x-2 bg-gray-800 rounded-full px-4 py-2">
                  <img
                    src="https://github.com/identicons/user.png"
                    alt="Profile"
                    className="w-6 h-6 rounded-full"
                  />
                  <span>User</span>
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Manage Projects</h1>
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={20} />
              <span>Add Project</span>
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-96 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-10">
                <div className="max-h-96 overflow-y-auto">
                  {mockRepos.map((repo) => (
                    <button
                      key={repo.full_name}
                      onClick={() => addProject(repo)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors border-b border-gray-700"
                    >
                      <div className="font-medium">{repo.full_name}</div>
                      {repo.description && (
                        <div className="text-sm text-gray-400 mt-1">{repo.description}</div>
                      )}
                      {repo.language && (
                        <div className="text-xs text-blue-400 mt-1">{repo.language}</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          {projects.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-8 text-center text-gray-400">
              No projects connected
            </div>
          ) : (
            projects.map((project) => (
              <div 
                key={project.id} 
                className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition-colors"
                onClick={() => handleProjectClick(project.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-medium">{project.repo_full_name}</h3>
                    {project.description && (
                      <p className="text-gray-400 mt-2">{project.description}</p>
                    )}
                    {project.skills && project.skills.length > 0 && (
                      <div className="flex gap-2 mt-3">
                        {project.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-blue-900/50 text-blue-400 rounded text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteProject(project.id);
                    }}
                    className="text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Feedback Button and Modal */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => setShowFeedback(true)}
          className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Send size={16} />
          <span>Send Feedback</span>
        </button>
      </div>

      {showFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Send Feedback</h2>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full h-32 bg-gray-700 rounded-lg p-3 text-white resize-none"
              placeholder="Tell us what you think..."
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowFeedback(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitFeedback}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import { useState, useEffect } from "react";
import { BsPeopleFill, BsPersonDashFill, BsPencilFill, BsToggleOn, BsToggleOff } from "react-icons/bs";
import { workerConfig } from "./userConfig.js";

const UsersPage = () => {
  const [workers, setWorkers] = useState(workerConfig.initialWorkers);
  const [newWorker, setNewWorker] = useState({
    ...workerConfig.defaultWorker,
    status: 'Active' // Set default status
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorker, setEditingWorker] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleAddWorker = () => {
    if (newWorker.name && newWorker.role) {
      setWorkers([...workers, { ...newWorker, id: workers.length + 1 }]);
      setNewWorker({
        ...workerConfig.defaultWorker,
        status: 'Active'
      });
      setIsModalOpen(false);
    }
  };

  const handleEditWorker = (worker) => {
    setEditingWorker(worker);
    setNewWorker(worker);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleUpdateWorker = () => {
    if (newWorker.name && newWorker.role) {
      setWorkers(
        workers.map((w) => (w.id === editingWorker.id ? newWorker : w))
      );
      setNewWorker({
        ...workerConfig.defaultWorker,
        status: 'Active'
      });
      setIsModalOpen(false);
      setIsEditMode(false);
      setEditingWorker(null);
    }
  };

  const handleToggleStatus = (workerId) => {
    setWorkers(workers.map(worker => {
      if (worker.id === workerId) {
        return {
          ...worker,
          status: worker.status === 'Active' ? 'Inactive' : 'Active'
        };
      }
      return worker;
    }));
  };

  const handleRemoveWorker = (id) => {
    setWorkers(workers.filter((worker) => worker.id !== id));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingWorker(null);
    setNewWorker({
      ...workerConfig.defaultWorker,
      status: 'Active'
    });
  };

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <div className="flex flex-col">
        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            {workerConfig.stats.map((stat, index) => (
              <div key={index} className="bg-[#1e293b] rounded-lg p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400">{stat.title}</p>
                    <p className="text-2xl md:text-4xl font-bold text-white mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div className="text-purple-400">
                    <BsPeopleFill size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Workers Management Section */}
          <div className="bg-[#1e293b] rounded-lg overflow-hidden">
            <div className="p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-xl font-bold text-white">
                Workers Management
              </h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full md:w-auto px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
              >
                Add New Worker
              </button>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-[#2d3a4f]">
                      <tr>
                        <th className="p-4 text-left text-gray-400">Name</th>
                        <th className="p-4 text-left text-gray-400 hidden md:table-cell">Role</th>
                        <th className="p-4 text-left text-gray-400 hidden md:table-cell">Status</th>
                        <th className="p-4 text-left text-gray-400 hidden md:table-cell">Join Date</th>
                        <th className="p-4 text-left text-gray-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workers.map((worker) => (
                        <tr key={worker.id} className="border-t border-[#2d3a4f]">
                          <td className="p-4 text-white">
                            <div className="flex flex-col md:flex-row">
                              <span>{worker.name}</span>
                              <div className="md:hidden mt-2">
                                <div className="text-sm text-gray-400">{worker.role}</div>
                                <div className="text-sm text-gray-400">{worker.joinDate}</div>
                                <div className="text-sm">
                                  <span className={`px-3 py-1 rounded-full text-xs ${
                                    worker.status === 'Active' 
                                      ? 'bg-green-500/20 text-green-400' 
                                      : 'bg-red-500/20 text-red-400'
                                  }`}>
                                    {worker.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-white hidden md:table-cell">{worker.role}</td>
                          <td className="p-4 hidden md:table-cell">
                            <button
                              onClick={() => handleToggleStatus(worker.id)}
                              className="flex items-center gap-2"
                            >
                              <span className={`px-3 py-1 rounded-full text-xs ${
                                worker.status === 'Active' 
                                  ? 'bg-green-500/20 text-green-400' 
                                  : 'bg-red-500/20 text-red-400'
                              }`}>
                                {worker.status}
                              </span>
                              {worker.status === 'Active' ? (
                                <BsToggleOn className="w-6 h-6 text-green-400" />
                              ) : (
                                <BsToggleOff className="w-6 h-6 text-red-400" />
                              )}
                            </button>
                          </td>
                          <td className="p-4 text-white hidden md:table-cell">{worker.joinDate}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditWorker(worker)}
                                className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                              >
                                <BsPencilFill className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleRemoveWorker(worker.id)}
                                className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                              >
                                <BsPersonDashFill className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Worker Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1e293b] p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4">
              {isEditMode ? "Edit Worker" : "Add New Worker"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Enter worker name"
                  value={newWorker.name}
                  onChange={(e) =>
                    setNewWorker({ ...newWorker, name: e.target.value })
                  }
                  className="w-full p-2 bg-[#2d3a4f] rounded-lg text-white border border-[#4a5568]"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Role</label>
                <select
                  value={newWorker.role}
                  onChange={(e) =>
                    setNewWorker({ ...newWorker, role: e.target.value })
                  }
                  className="w-full p-2 bg-[#2d3a4f] rounded-lg text-white border border-[#4a5568]"
                >
                  <option value="">Select role</option>
                  <option value="Social Media Manager">
                    Social Media Manager
                  </option>
                  <option value="Content Creator">Content Creator</option>
                  <option value="Graphic Designer">Graphic Designer</option>
                  <option value="Video Editor">Video Editor</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Join Date</label>
                <input
                  type="date"
                  value={newWorker.joinDate}
                  onChange={(e) =>
                    setNewWorker({ ...newWorker, joinDate: e.target.value })
                  }
                  className="w-full p-2 bg-[#2d3a4f] rounded-lg text-white border border-[#4a5568]"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Status</label>
                <select
                  value={newWorker.status}
                  onChange={(e) =>
                    setNewWorker({ ...newWorker, status: e.target.value })
                  }
                  className="w-full p-2 bg-[#2d3a4f] rounded-lg text-white border border-[#4a5568]"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={isEditMode ? handleUpdateWorker : handleAddWorker}
                  className="flex-1 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                >
                  {isEditMode ? "Update Worker" : "Add Worker"}
                </button>
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 bg-[#2d3a4f] hover:bg-[#374151] text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
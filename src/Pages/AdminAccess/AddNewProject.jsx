/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { uiConfig } from "./projectManagementConfig";

const AddNewProject = ({ onClose, onSave }) => {
  const [projectForm, setProjectForm] = useState({
    name: "",
    status: uiConfig.statuses.active,
    totalBudget: "",
    totalSpent: 0,
    startDate: "",
    endDate: "",
    workers: [],
  });

  const [workerForm, setWorkerForm] = useState({
    name: "",
    phone: "",
    email: "",
    role: "",
    totalAmount: "",
    paidAmount: "",
    lastPaymentDate: "",
  });

  const [error, setError] = useState("");
  const [showWorkerForm, setShowWorkerForm] = useState(false);

  const roles = [
    "Developer",
    "UI Designer",
    "Project Manager",
    "QA Engineer",
    "DevOps Engineer",
  ];

  // ... (keeping all the calculation and handler functions the same)
  const calculateTotalSpent = () => {
    return projectForm.workers.reduce(
      (total, worker) => total + Number(worker.paidAmount),
      0
    );
  };

  const calculateRemainingBudget = () => {
    return Number(projectForm.totalBudget) - calculateTotalSpent();
  };

  const handleAddWorker = (e) => {
    if (
      !workerForm.name ||
      !workerForm.phone ||
      !workerForm.email ||
      !workerForm.role ||
      !workerForm.totalAmount ||
      !workerForm.paidAmount ||
      !workerForm.lastPaymentDate
    ) {
      setError("Please fill all worker details");
      return;
    }

    const remainingAmount =
      Number(workerForm.totalAmount) - Number(workerForm.paidAmount);

    const newWorker = {
      ...workerForm,
      id: Math.random().toString(36).substr(2, 9),
      remainingAmount,
      totalAmount: Number(workerForm.totalAmount),
      paidAmount: Number(workerForm.paidAmount),
    };

    setProjectForm((prev) => ({
      ...prev,
      workers: [...prev.workers, newWorker],
      totalSpent: calculateTotalSpent() + Number(workerForm.paidAmount),
    }));

    setWorkerForm({
      name: "",
      phone: "",
      email: "",
      role: "",
      totalAmount: "",
      paidAmount: "",
      lastPaymentDate: "",
    });
    setShowWorkerForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (new Date(projectForm.startDate) > new Date(projectForm.endDate)) {
        setError("Start date cannot be later than end date");
        return;
      }

      if (calculateTotalSpent() > Number(projectForm.totalBudget)) {
        setError("Total spent amount exceeds project budget");
        return;
      }

      const newProject = {
        ...projectForm,
        id: Math.random().toString(36).substr(2, 9),
        remainingBudget: calculateRemainingBudget(),
        totalSpent: calculateTotalSpent(),
        workers: projectForm.workers.map(worker => ({
          ...worker,
          totalAmount: Number(worker.totalAmount),
          paidAmount: Number(worker.paidAmount),
          remainingAmount: Number(worker.totalAmount) - Number(worker.paidAmount)
        }))
      };

      newProject.totalBudget = Number(newProject.totalBudget);

      await onSave(newProject);
      onClose();
    } catch (err) {
      setError("Failed to create project");
      console.error("Project creation error:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 md:p-4 z-50 overflow-y-auto">
      <div className="bg-slate-800 rounded-lg p-3 md:p-6 w-full max-w-4xl my-2 md:my-4 h-[calc(100vh-2rem)] md:h-auto overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 z-10 flex justify-between items-center mb-4 pb-2 border-b border-slate-700">
          <h3 className="text-lg md:text-xl font-bold text-white">
            Project Details
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500 bg-opacity-20 text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* Project Details Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div className="space-y-2">
              <label className="block text-slate-300 text-sm md:text-base">
                Project Name
              </label>
              <input
                type="text"
                value={projectForm.name}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, name: e.target.value })
                }
                className="w-full bg-slate-700 rounded-lg p-2.5 text-white border border-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none text-sm md:text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-slate-300 text-sm md:text-base">
                Total Budget
              </label>
              <input
                type="number"
                value={projectForm.totalBudget}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    totalBudget: e.target.value,
                  })
                }
                className="w-full bg-slate-700 rounded-lg p-2.5 text-white border border-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none text-sm md:text-base"
                required
                min="0"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-slate-300 text-sm md:text-base">
                Start Date
              </label>
              <input
                type="date"
                value={projectForm.startDate}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, startDate: e.target.value })
                }
                className="w-full bg-slate-700 rounded-lg p-2.5 text-white border border-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none text-sm md:text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-slate-300 text-sm md:text-base">
                End Date
              </label>
              <input
                type="date"
                value={projectForm.endDate}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, endDate: e.target.value })
                }
                className="w-full bg-slate-700 rounded-lg p-2.5 text-white border border-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none text-sm md:text-base"
                required
              />
            </div>
          </div>

          {/* Workers Section */}
          <div className="border-t border-slate-700 pt-4 md:pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
              <h4 className="text-lg font-semibold text-white">Workers</h4>
              <button
                type="button"
                onClick={() => setShowWorkerForm(true)}
                className="w-full sm:w-auto px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-sm md:text-base"
              >
                Add Worker
              </button>
            </div>

            {/* Worker Form */}
            {showWorkerForm && (
              <div className="mb-6 p-3 md:p-4 border border-slate-700 rounded-lg">
                <h5 className="text-md font-semibold text-white mb-4">
                  New Worker Details
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div className="space-y-2">
                    <label className="block text-slate-300 text-sm">Name</label>
                    <input
                      type="text"
                      value={workerForm.name}
                      onChange={(e) =>
                        setWorkerForm({ ...workerForm, name: e.target.value })
                      }
                      className="w-full bg-slate-700 rounded-lg p-2.5 text-white border border-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none text-sm"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-slate-300 text-sm">Phone</label>
                    <input
                      type="tel"
                      value={workerForm.phone}
                      onChange={(e) =>
                        setWorkerForm({ ...workerForm, phone: e.target.value })
                      }
                      className="w-full bg-slate-700 rounded-lg p-2.5 text-white border border-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none text-sm"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-slate-300 text-sm">Email</label>
                    <input
                      type="email"
                      value={workerForm.email}
                      onChange={(e) =>
                        setWorkerForm({ ...workerForm, email: e.target.value })
                      }
                      className="w-full bg-slate-700 rounded-lg p-2.5 text-white border border-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none text-sm"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-slate-300 text-sm">Role</label>
                    <select
                      value={workerForm.role}
                      onChange={(e) =>
                        setWorkerForm({ ...workerForm, role: e.target.value })
                      }
                      className="w-full bg-slate-700 rounded-lg p-2.5 text-white border border-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none text-sm"
                      required
                    >
                      <option value="">Select Role</option>
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-slate-300 text-sm">
                      Total Amount
                    </label>
                    <input
                      type="number"
                      value={workerForm.totalAmount}
                      onChange={(e) =>
                        setWorkerForm({
                          ...workerForm,
                          totalAmount: e.target.value,
                        })
                      }
                      className="w-full bg-slate-700 rounded-lg p-2.5 text-white border border-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none text-sm"
                      required
                      min="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-slate-300 text-sm">
                      Paid Amount
                    </label>
                    <input
                      type="number"
                      value={workerForm.paidAmount}
                      onChange={(e) =>
                        setWorkerForm({
                          ...workerForm,
                          paidAmount: e.target.value,
                        })
                      }
                      className="w-full bg-slate-700 rounded-lg p-2.5 text-white border border-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none text-sm"
                      required
                      min="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-slate-300 text-sm">
                      Last Payment Date
                    </label>
                    <input
                      type="date"
                      value={workerForm.lastPaymentDate}
                      onChange={(e) =>
                        setWorkerForm({
                          ...workerForm,
                          lastPaymentDate: e.target.value,
                        })
                      }
                      className="w-full bg-slate-700 rounded-lg p-2.5 text-white border border-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none text-sm"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2 flex flex-col sm:flex-row justify-end gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => setShowWorkerForm(false)}
                      className="w-full sm:w-auto px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAddWorker}
                      className="w-full sm:w-auto px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-sm"
                    >Save Worker
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Workers List */}
            <div className="space-y-3 md:space-y-4">
              {projectForm.workers.map((worker) => (
                <div key={worker.id} className="bg-slate-700 p-3 md:p-4 rounded-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    <div className="space-y-1">
                      <p className="text-slate-400 text-xs md:text-sm">Name</p>
                      <p className="text-white text-sm md:text-base">{worker.name}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-400 text-xs md:text-sm">Role</p>
                      <p className="text-white text-sm md:text-base">{worker.role}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-400 text-xs md:text-sm">Contact</p>
                      <p className="text-white text-sm md:text-base">{worker.phone}</p>
                      <p className="text-slate-400 text-xs md:text-sm break-all">{worker.email}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-400 text-xs md:text-sm">Payment Details</p>
                      <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
                        <p className="text-white text-sm md:text-base">
                          Total: ₹{worker.totalAmount.toLocaleString()}
                        </p>
                        <p className="text-green-400 text-sm md:text-base">
                          Paid: ₹{worker.paidAmount.toLocaleString()}
                        </p>
                        <p className="text-orange-400 text-sm md:text-base">
                          Remaining: ₹{worker.remainingAmount.toLocaleString()}
                        </p>
                        <p className="text-slate-400 text-xs md:text-sm">
                          Last Paid: {new Date(worker.lastPaymentDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Section */}
          <div className="border-t border-slate-700 pt-4 md:pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6">
              <div className="bg-slate-700 p-3 md:p-4 rounded-lg">
                <p className="text-slate-400 text-xs md:text-sm">Total Budget</p>
                <p className="text-white text-base md:text-lg">
                  ₹{Number(projectForm.totalBudget || 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-slate-700 p-3 md:p-4 rounded-lg">
                <p className="text-slate-400 text-xs md:text-sm">Total Spent</p>
                <p className="text-green-400 text-base md:text-lg">
                  ₹{calculateTotalSpent().toLocaleString()}
                </p>
              </div>
              <div className="bg-slate-700 p-3 md:p-4 rounded-lg">
                <p className="text-slate-400 text-xs md:text-sm">Remaining Budget</p>
                <p className="text-orange-400 text-base md:text-lg">
                  ₹{calculateRemainingBudget().toLocaleString()}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="sticky bottom-0 bg-slate-800 pt-2 pb-2 -mx-3 px-3 md:-mx-6 md:px-6 border-t border-slate-700">
              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm md:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-sm md:text-base"
                >
                  Create Project
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewProject;
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { uiConfig } from "./projectManagementConfig";

const ProjectManagementForm = ({ onClose, onSave }) => {
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

    // Calculate remaining amount
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

                // Make sure all number fields are properly converted
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
      <div className="bg-slate-800 rounded-lg p-4 md:p-6 w-full max-w-4xl my-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg md:text-xl font-bold text-white">
            Project Details
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 mb-1 text-sm md:text-base">
                Project Name
              </label>
              <input
                type="text"
                value={projectForm.name}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, name: e.target.value })
                }
                className="w-full bg-slate-700 rounded-lg p-2 text-white border border-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 text-sm md:text-base">
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
                className="w-full bg-slate-700 rounded-lg p-2 text-white border border-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 text-sm md:text-base">
                Start Date
              </label>
              <input
                type="date"
                value={projectForm.startDate}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, startDate: e.target.value })
                }
                className="w-full bg-slate-700 rounded-lg p-2 text-white border border-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 text-sm md:text-base">
                End Date
              </label>
              <input
                type="date"
                value={projectForm.endDate}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, endDate: e.target.value })
                }
                className="w-full bg-slate-700 rounded-lg p-2 text-white border border-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none"
                required
              />
            </div>
          </div>

          <div className="border-t border-slate-700 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold text-white">Workers</h4>
              <button
                type="button"
                onClick={() => setShowWorkerForm(true)}
                className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
              >
                Add Worker
              </button>
            </div>

            {showWorkerForm && (
              <div className="mb-6 p-4 border border-slate-700 rounded-lg">
                <h5 className="text-md font-semibold text-white mb-4">
                  New Worker Details
                </h5>
                <form
                  onSubmit={handleAddWorker}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div>
                    <label className="block text-slate-300 mb-1 text-sm">
                      Name
                    </label>
                    <input
                      type="text"
                      value={workerForm.name}
                      onChange={(e) =>
                        setWorkerForm({ ...workerForm, name: e.target.value })
                      }
                      className="w-full bg-slate-700 rounded-lg p-2 text-white border border-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 text-sm">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={workerForm.phone}
                      onChange={(e) =>
                        setWorkerForm({ ...workerForm, phone: e.target.value })
                      }
                      className="w-full bg-slate-700 rounded-lg p-2 text-white border border-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 text-sm">
                      Email
                    </label>
                    <input
                      type="email"
                      value={workerForm.email}
                      onChange={(e) =>
                        setWorkerForm({ ...workerForm, email: e.target.value })
                      }
                      className="w-full bg-slate-700 rounded-lg p-2 text-white border border-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 text-sm">
                      Role
                    </label>
                    <select
                      value={workerForm.role}
                      onChange={(e) =>
                        setWorkerForm({ ...workerForm, role: e.target.value })
                      }
                      className="w-full bg-slate-700 rounded-lg p-2 text-white border border-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none"
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

                  <div>
                    <label className="block text-slate-300 mb-1 text-sm">
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
                      className="w-full bg-slate-700 rounded-lg p-2 text-white border border-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none"
                      required
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 text-sm">
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
                      className="w-full bg-slate-700 rounded-lg p-2 text-white border border-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none"
                      required
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 text-sm">
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
                      className="w-full bg-slate-700 rounded-lg p-2 text-white border border-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none"
                      required
                    />
                  </div>

                  <div className="md:col-span-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowWorkerForm(false)}
                      className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button" // Changed from submit to button
                      onClick={handleAddWorker}
                      className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
                    >
                      Save Worker
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="space-y-4">
              {projectForm.workers.map((worker) => (
                <div key={worker.id} className="bg-slate-700 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <p className="text-slate-400 text-sm">Name</p>
                      <p className="text-white">{worker.name}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Role</p>
                      <p className="text-white">{worker.role}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Contact</p>
                      <p className="text-white">{worker.phone}</p>
                      <p className="text-slate-400 text-sm">{worker.email}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Payment Details</p>
                      <p className="text-white">Total: ₹{worker.totalAmount}</p>
                      <p className="text-green-400">
                        Paid: ₹{worker.paidAmount}
                      </p>
                      <p className="text-orange-400">
                        Remaining: ₹{worker.remainingAmount}
                      </p>
                      <p className="text-slate-400 text-sm">
                        Last Paid: {worker.lastPaymentDate}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-700 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-700 p-4 rounded-lg">
                <p className="text-slate-400 text-sm">Total Budget</p>
                <p className="text-white text-lg">
                  ₹{projectForm.totalBudget || 0}
                </p>
              </div>
              <div className="bg-slate-700 p-4 rounded-lg">
                <p className="text-slate-400 text-sm">Total Spent</p>
                <p className="text-green-400 text-lg">
                  ₹{calculateTotalSpent()}
                </p>
              </div>
              <div className="bg-slate-700 p-4 rounded-lg">
                <p className="text-slate-400 text-sm">Remaining Budget</p>
                <p className="text-orange-400 text-lg">
                  ₹{calculateRemainingBudget()}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
              >
                Create Project
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectManagementForm;

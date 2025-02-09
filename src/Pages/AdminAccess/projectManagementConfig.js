// adminAccessConfig.js

export const uiConfig = {
  title: "Project Management",
  buttonTitles: {
    addProject: "Add New Project",
    addWorker: "Add Worker"
  },
  statuses: {
    active: "Active",
    pending: "Pending",
    completed: "Completed"
  }
};

export const projectApi = {
  getAllProjects: async () => {
    // Simulated API call - replace with actual API endpoint
    return [
      {
        id: 1,
        name: "Website Redesign",
        status: "Active",
        totalBudget: 50000,
        paidAmount: 20000,
        startDate: "2024-01-01",
        endDate: "2024-06-30",
        workers: [
          {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            phone: "123-456-7890",
            role: "Lead Developer",
            totalAmount: 15000,
            paidAmount: 10000,
            lastPayment: "2024-01-15"
          },
          {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "123-456-7891",
            role: "UI Designer",
            totalAmount: 12000,
            paidAmount: 6000,
            lastPayment: "2024-01-20"
          }
        ]
      },
      {
        id: 2,
        name: "Mobile App Development",
        status: "Pending",
        totalBudget: 75000,
        paidAmount: 25000,
        startDate: "2024-02-01",
        endDate: "2024-08-31",
        workers: []
      },
      {
        id: 3,
        name: "E-commerce Platform",
        status: "Active",
        totalBudget: 100000,
        paidAmount: 15000,
        startDate: "2024-03-01",
        endDate: "2024-12-31",
        workers: [
          {
            id: 3,
            name: "Mike Johnson",
            email: "mike@example.com",
            phone: "123-456-7892",
            role: "Backend Developer",
            totalAmount: 20000,
            paidAmount: 15000,
            lastPayment: "2024-02-28"
          }
        ]
      }
    ];
  },

  getProjectById: async (id) => {
    // Simulated API call - replace with actual API endpoint
    const projects = await projectApi.getAllProjects();
    return projects.find(p => p.id === id);
  },

  addWorker: async (workerData) => {
    // Simulated API call - replace with actual API endpoint
    return {
      id: Math.random().toString(36).substr(2, 9),
      ...workerData
    };
  },

  updateWorker: async (workerId, workerData) => {
    // Simulated API call - replace with actual API endpoint
    return {
      id: workerId,
      ...workerData
    };
  }
};
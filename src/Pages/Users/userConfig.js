// workerConfig.js
export const workerConfig = {
  defaultWorker: {
    name: "",
    role: "",
    status: "Active",
    joinDate: "",
    projectsCompleted: 0,
    earnings: "$0"
  },
  
  initialWorkers: [
    {
      id: 1,
      name: "Abhishek Kumar",
      role: "Social Media Manager",
      status: "Active",
      joinDate: "2024-02-01",
      projectsCompleted: 12,
      earnings: "$5,000"
    },
    {
      id: 2,
      name: "Manish Bhaiya",
      role: "Content Creator",
      status: "Active",
      joinDate: "2024-01-15",
      projectsCompleted: 8,
      earnings: "$3,500"
    }
  ],

  stats: [
    {
      title: "Total Workers",
      value: "2"
    },
    {
      title: "Active Workers",
      value: "2"
    }
  ]
};
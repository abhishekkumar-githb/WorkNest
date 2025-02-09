// src/config/homeConfig.js
const USD_TO_INR_RATE = 83.5;

export const formatCurrency = (amount, currency = 'USD') => {
  if (currency === 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount * USD_TO_INR_RATE);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const fetchProjectData = async () => {
  return {
    project: {
      name: 'Smart City Infrastructure',
      status: 'In Progress',
      timeline: { 
        start: '2024-01-15', 
        end: '2024-12-31',
        totalDays: 351,
        daysRemaining: 245
      },
      totalBudget: 5750000,
      budgetSpent: 2350000,
      budgetRemaining: 3400000,
      progressPercentage: 65,
      profitProjection: 1200000
    },
    contractor: {
      name: 'Urban Solutions Inc.',
      position: 'Lead Engineering Contractor',
      companyType: 'Infrastructure Development',
      phone: '+91 6206761669',
      email: 'example@gmail.com',
      address: '1234 Innovation Ave, Tech City, ST 54321',
      totalEarnings: 2350000,
      expectedProfit: 1200000,
      timeline: { 
        start: '2024-01-15', 
        end: '2024-12-31' 
      },
      performanceRating: 4.7,
      keyContacts: [
        { 
          name: 'Abhishek Kumar', 
          role: 'Project Manager', 
          email: 'example@gmail.com' 
        },
      ]
    },
    workPackages: [
      {
        id: 1,
        name: 'Road Network Expansion',
        description: 'Develop and upgrade city road infrastructure',
        status: 'In Progress',
        progress: 65,
        budget: 1500000,
        startDate: '2024-02-01',
        endDate: '2024-10-30',
        team: ['Michael Johnson', 'Sarah Lee']
      },
      {
        id: 2,
        name: 'Smart Traffic Management',
        description: 'Implement AI-driven traffic control systems',
        status: 'Pending',
        progress: 30,
        budget: 1200000,
        startDate: '2024-06-15',
        endDate: '2024-11-30',
        team: ['David Chen', 'Emily Wong']
      },
      {
        id: 3,
        name: 'Sustainable Energy Grid',
        description: 'Deploy renewable energy infrastructure',
        status: 'Not Started',
        progress: 10,
        budget: 2050000,
        startDate: '2024-09-01',
        endDate: '2025-06-30',
        team: ['Alex Rodriguez', 'Maria Garcia']
      }
    ],
    projectMetrics: {
      overallProgress: 35,
      risksIdentified: 3,
      criticalRisks: 1,
      milestonesMet: 2,
      totalMilestones: 5
    }
  };
};
import { Portfolio } from '../types';

export const portfolioData: Portfolio = {
  personalInfo: {
    name: 'Devansh Pruthi',
    title: 'Software Engineer',
    location: 'Mohali, India',
    email: 'pruthidevansh@gmail.com',
    phone: '+91 798 680 8084',
    summary: 'I am an experienced web developer with a bachelor\'s degree in computer science and over 2+ years of practical experience in the IT industry. My expertise lies in developing dynamic, high-performance web applications using modern JavaScript frameworks (Angular and ReactJS) and backend technologies. I specialize in building scalable and maintainable full-stack applications, leveraging React for front-end development and .NET Core for back-end solutions. My strong problem-solving skills and commitment to continuous improvement enable me to deliver impactful and innovative results.',
  },

  skills: [
    // Programming Languages
    { name: 'C#', level: 90, category: 'backend', icon: 'Code' },
    { name: 'JavaScript', level: 95, category: 'frontend', icon: 'Code' },
    { name: 'TypeScript', level: 90, category: 'frontend', icon: 'Code' },
    { name: 'HTML', level: 95, category: 'frontend', icon: 'Code' },
    { name: 'CSS', level: 90, category: 'frontend', icon: 'Palette' },

    // Frontend Frameworks
    { name: 'React.js', level: 95, category: 'frontend', icon: 'Atom' },
    { name: 'React Native', level: 88, category: 'frontend', icon: 'Smartphone' },
    { name: 'Angular', level: 85, category: 'frontend', icon: 'Triangle' },
    { name: 'jQuery', level: 80, category: 'frontend', icon: 'Code' },

    // Backend Technologies
    { name: '.NET Core', level: 90, category: 'backend', icon: 'Server' },
    { name: 'ASP.NET', level: 85, category: 'backend', icon: 'Server' },
    { name: 'RESTful APIs', level: 90, category: 'backend', icon: 'Globe' },
    { name: 'Entity Framework', level: 85, category: 'backend', icon: 'Database' },
    { name: 'LINQ', level: 85, category: 'backend', icon: 'Search' },

    // Databases
    { name: 'SQL Server', level: 85, category: 'database', icon: 'Database' },
    { name: 'MySQL', level: 80, category: 'database', icon: 'Database' },

    // Cloud & Tools
    { name: 'AWS', level: 75, category: 'tools', icon: 'Cloud' },
    { name: 'Azure', level: 80, category: 'tools', icon: 'Cloud' },
    { name: 'Git', level: 85, category: 'tools', icon: 'GitBranch' },

    // // Soft Skills
    // { name: 'Problem Solving', level: 95, category: 'soft', icon: 'Lightbulb' },
    // { name: 'Team Collaboration', level: 90, category: 'soft', icon: 'Users' },
    // { name: 'Communication', level: 90, category: 'soft', icon: 'MessageCircle' },
    // { name: 'Agile/Scrum', level: 85, category: 'soft', icon: 'Zap' },
  ],

  experience: [
    {
      id: 'ginilytics-2023',
      company: 'GiniLytics IT Solutions',
      position: 'Software Engineer',
      location: 'Mohali, Punjab',
      startDate: 'Jan 2023',
      endDate: 'Present',
      description: 'Developing and maintaining scalable web applications using React.js and .NET Core, focusing on performance optimization and user experience enhancement.',
      responsibilities: [
        'Develop, verify, and manage change requests for specific project components using React.js and .NET Core',
        'Analyze and resolve issues in project requirements and designs, ensuring seamless functionality',
        'Perform thorough testing to identify and address software issues, improving application reliability',
        'Contribute to the development of scalable, responsive web applications by implementing modern front-end and back-end technologies',
        'Conduct frequent client meetings for change requests and system improvements',
        'Manage smooth system data migration and integration processes'
      ],
      technologies: ['React.js', '.NET Core', 'C#', 'JavaScript', 'TypeScript', 'SQL Server', 'Azure', 'Entity Framework']
    }
  ],

  projects: [
    {
      id: 'metrichub',
      name: 'MetricHub - Mobile Analytics Platform',
      description: 'Cross-platform mobile application for business metrics tracking with real-time analytics and offline synchronization.',
      longDescription: 'MetricHub is a comprehensive mobile analytics platform built with React Native, enabling businesses to track key performance metrics in real-time. The app features offline data synchronization, custom dashboards with real-time data visualization, and seamless integration with backend services. Published on both App Store and Google Play Store, it serves as a powerful tool for business intelligence on mobile devices.',
      technologies: ['React Native', '.NET Core', 'SQL Server', 'TypeScript', 'Redux', 'Async Storage'],
      features: [
        'Cross-platform mobile development with React Native',
        'Real-time data synchronization and offline capabilities',
        'Custom dashboard with interactive data visualization',
        'App Store and Google Play Store deployment',
        'Push notifications for critical metrics',
        'Secure authentication and data encryption',
        'Performance optimization for mobile devices'
      ],
      responsibilities: [
        'Led development of cross-platform mobile application using React Native',
        'Implemented offline data synchronization with conflict resolution',
        'Built custom dashboard with real-time data visualization',
        'Managed App Store and Google Play Store deployment process',
        'Integrated push notifications and secure authentication',
        'Optimized performance for mobile devices and various screen sizes',
        'Ensured code quality through testing and code reviews'
      ],
      category: 'mobile',
      status: 'completed'
    },
    {
      id: 'b2b-erp',
      name: 'B2B ERP with Delivery Tracking',
      description: 'Enhanced legacy ERP system with integrated modules for Sales, Purchasing, Inventory, Reports, and Setup with client-specific requirements.',
      longDescription: 'This project focused on enhancing a legacy system by integrating modules for Sales, Purchasing, Inventory, Reports, and Setup, while addressing client-specific requirements and ensuring smooth data migration. The system provides comprehensive business management capabilities with real-time tracking and reporting features.',
      technologies: ['React.js', '.NET Core', 'SQL Server', 'Entity Framework', 'JavaScript', 'C#'],
      features: [
        'Customer field updates and email automation',
        'Invoice creation with tax handling and partial payments',
        'Vendor data integration with payment management',
        'Multiple tax application and sales order regeneration',
        'Legacy report development with advanced filtering',
        'Item categories, routes, and tax configuration',
        'Comprehensive data migration system'
      ],
      responsibilities: [
        'Updated customer fields, added email automation, managed invoice creation, tax handling, and partial payments',
        'Integrated vendor data, enabled partial payments, and allowed payment edits',
        'Applied multiple taxes and re-generated sales orders based on tax changes',
        'Developed legacy reports with additional filters for sales and tax data',
        'Configured item categories, routes, and tax setups',
        'Managed smooth system data migration',
        'Adjusted report printing and conducted frequent client meetings for change requests'
      ],
      category: 'web',
      status: 'completed'
    },
    {
      id: 'booktem',
      name: 'Booktem - Appointment Scheduling Solution',
      description: 'Comprehensive appointment scheduling platform with calendar integration and recurring appointment management.',
      longDescription: 'Booktem is a comprehensive appointment scheduling solution designed to streamline business operations. The platform enables businesses to schedule and manage recurring appointments, integrating seamlessly with a calendar view. Developed using Clean Architecture principles, the system ensures code reusability, optimization, and scalability. Deployed on Azure, it incorporates third-party scheduler integration to effectively handle recurring appointments.',
      technologies: ['Angular', 'TypeScript', '.NET Core', 'LINQ', 'Entity Framework', 'SQL Server', 'Azure', 'HTML', 'CSS'],
      features: [
        'Recurring appointment scheduling and management',
        'Calendar view integration',
        'Third-party scheduler integration',
        'Clean Architecture implementation',
        'Azure cloud deployment',
        'Scalable and optimized performance',
        'User-friendly responsive interface'
      ],
      responsibilities: [
        'Designed and implemented backend systems using .NET Core, LINQ, Entity Framework, and SQL to manage recurring appointments',
        'Developed the user interface with Angular, TypeScript, HTML, and CSS to ensure a responsive and user-friendly experience',
        'Conducted unit and integration testing to ensure system reliability and adherence to Clean Architecture principles',
        'Managed the deployment of the application to Azure, optimizing infrastructure for performance and scalability'
      ],
      category: 'web',
      status: 'completed'
    },
    // {
    //   id: 'florist-erp',
    //   name: 'Florist and Flower Wholesaler ERP Application',
    //   description: 'Comprehensive ERP solution for florists and flower wholesalers with POS functionality and inventory management.',
    //   longDescription: 'This ERP solution provides comprehensive back-office and POS functionalities tailored for florists and flower wholesalers. Key features include Quick Floral Pricing, Shopify and WordPress Florist Websites, Inventory Control, Event and Wedding Management, and Purchase Order Management. The admin interface enables efficient order tracking and payment management. Developed using ASP.NET and VB.NET, with a Microsoft SQL Server database, the system is continuously enhanced to meet evolving client requirements.',
    //   technologies: ['ASP.NET', 'VB.NET', 'SQL Server', 'JavaScript', 'HTML', 'CSS'],
    //   features: [
    //     'Quick Floral Pricing system',
    //     'Shopify and WordPress integration',
    //     'Comprehensive inventory control',
    //     'Event and wedding management',
    //     'Purchase order management',
    //     'POS system integration',
    //     'Vending machine support',
    //     'Admin dashboard for tracking and management'
    //   ],
    //   responsibilities: [
    //     'Maintained and enhanced an ERP system designed for florists and flower wholesalers',
    //     'Contributed to the development of modules for POS systems, vending machines, and inventory management for florists, wholesalers, and retailers',
    //     'Managed admin functionalities for payment tracking, order management, and employee management'
    //   ],
    //   category: 'web',
    //   status: 'completed'
    // }
  ],

  education: [
    {
      id: 'bca-kurukshetra',
      degree: 'Bachelor\'s in Computer Application',
      institution: 'Kurukshetra University',
      location: 'Kurukshetra, India',
      startDate: '2019',
      endDate: '2022',
      achievements: [
        'Strong foundation in computer science fundamentals',
        'Specialized in software development and programming',
        'Completed various projects in web development and database management'
      ]
    }
  ],

  socialLinks: [
    {
      name: 'Email',
      url: 'mailto:pruthidevansh@gmail.com',
      icon: 'Mail'
    },
    {
      name: 'Phone',
      url: 'tel:+917986808084',
      icon: 'Phone'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/devansh-pruthi-79868-08084-software-engineer/',
      icon: 'Linkedin'
    },
    // {
    //   name: 'GitHub',
    //   url: 'https://github.com/devansh-pruthi',
    //   icon: 'Github'
    // }
  ]
};

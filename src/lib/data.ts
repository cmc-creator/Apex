import { AppData } from './types';

export const mockData: AppData = {
  clients: [
    {
      id: 'client-1',
      name: 'Sarah Mitchell',
      company: 'TechCorp Solutions',
      email: 'sarah.mitchell@techcorp.com',
      phone: '+1 (415) 555-0192',
      address: '100 Tech Blvd, San Francisco, CA 94105',
      tags: ['enterprise', 'saas', 'priority'],
      status: 'won',
      notes: 'Long-term client. Interested in expanding the platform. Prefers Slack for communication.',
      createdAt: '2024-01-15',
      lastContact: '2025-01-10',
      totalRevenue: 48500,
      communicationHistory: [
        {
          id: 'comm-1-1',
          type: 'email',
          subject: 'Project kickoff confirmation',
          content: 'Confirmed the project start date and deliverables. Client is excited to get started.',
          date: '2024-01-20',
        },
        {
          id: 'comm-1-2',
          type: 'meeting',
          subject: 'Q1 Review Meeting',
          content: 'Reviewed Q1 progress. Client is happy with the results. Discussed potential expansion.',
          date: '2024-04-05',
        },
        {
          id: 'comm-1-3',
          type: 'call',
          subject: 'New feature discussion',
          content: 'Sarah called to discuss adding a reporting module. Estimated 80 additional hours.',
          date: '2024-07-14',
        },
        {
          id: 'comm-1-4',
          type: 'email',
          subject: 'Invoice #INV-001 follow-up',
          content: 'Sent follow-up on outstanding invoice. Sarah confirmed payment will process this week.',
          date: '2025-01-10',
        },
      ],
    },
    {
      id: 'client-2',
      name: 'Marcus Reid',
      company: 'StartupXYZ',
      email: 'marcus@startupxyz.io',
      phone: '+1 (628) 555-0341',
      address: '500 Innovation Way, Austin, TX 78701',
      tags: ['startup', 'mvp', 'urgent'],
      status: 'negotiating',
      notes: 'Fast-moving startup. Budget is flexible if we deliver quickly. Marcus is the technical co-founder.',
      createdAt: '2024-11-01',
      lastContact: '2025-01-08',
      totalRevenue: 0,
      communicationHistory: [
        {
          id: 'comm-2-1',
          type: 'call',
          subject: 'Discovery call',
          content: 'Initial call to understand their MVP needs. They want a mobile-first web app.',
          date: '2024-11-05',
        },
        {
          id: 'comm-2-2',
          type: 'email',
          subject: 'Proposal sent',
          content: 'Sent proposal for MVP development. $28,000 for full-stack web app with 3 month timeline.',
          date: '2024-11-20',
        },
        {
          id: 'comm-2-3',
          type: 'meeting',
          subject: 'Proposal review',
          content: 'Marcus wants to negotiate the timeline. They need delivery in 2 months. Discussed trade-offs.',
          date: '2025-01-08',
        },
      ],
    },
    {
      id: 'client-3',
      name: 'Jennifer Cole',
      company: 'RetailMax Inc.',
      email: 'j.cole@retailmax.com',
      phone: '+1 (312) 555-0887',
      address: '200 Commerce St, Chicago, IL 60601',
      tags: ['retail', 'ecommerce', 'design'],
      status: 'proposal',
      notes: 'Needs a full e-commerce redesign. Currently using Shopify but wants custom solution.',
      createdAt: '2024-12-10',
      lastContact: '2025-01-05',
      totalRevenue: 0,
      communicationHistory: [
        {
          id: 'comm-3-1',
          type: 'email',
          subject: 'Introduction and brief',
          content: 'Jennifer reached out via LinkedIn. Sent initial brief and requested a meeting.',
          date: '2024-12-12',
        },
        {
          id: 'comm-3-2',
          type: 'meeting',
          subject: 'Requirements gathering',
          content: 'Detailed meeting about their e-commerce needs. 5 page types, custom cart, admin panel.',
          date: '2024-12-20',
        },
        {
          id: 'comm-3-3',
          type: 'email',
          subject: 'Proposal submitted',
          content: 'Sent comprehensive proposal for $35,000. Waiting for response.',
          date: '2025-01-05',
        },
      ],
    },
    {
      id: 'client-4',
      name: 'David Park',
      company: 'HealthTech Solutions',
      email: 'dpark@healthtech.com',
      phone: '+1 (206) 555-0234',
      address: '800 Medical Pkwy, Seattle, WA 98101',
      tags: ['healthcare', 'compliance', 'dashboard'],
      status: 'won',
      notes: 'HIPAA compliance is critical. David is detail-oriented and requires thorough documentation.',
      createdAt: '2024-03-01',
      lastContact: '2025-01-12',
      totalRevenue: 32000,
      communicationHistory: [
        {
          id: 'comm-4-1',
          type: 'call',
          subject: 'Compliance requirements call',
          content: 'Long call about HIPAA requirements and their existing infrastructure.',
          date: '2024-03-10',
        },
        {
          id: 'comm-4-2',
          type: 'email',
          subject: 'Contract signed',
          content: 'David signed the contract. Starting the analytics dashboard project next Monday.',
          date: '2024-03-25',
        },
        {
          id: 'comm-4-3',
          type: 'meeting',
          subject: 'Mid-project review',
          content: 'Review of dashboard prototype. Client approved the design direction with minor adjustments.',
          date: '2024-07-01',
        },
        {
          id: 'comm-4-4',
          type: 'note',
          subject: 'Follow-up on new project',
          content: 'David mentioned they may need a mobile app version. Will reach out after current project.',
          date: '2025-01-12',
        },
      ],
    },
    {
      id: 'client-5',
      name: 'Olivia Banks',
      company: 'MediaGroup Creative',
      email: 'olivia@mediagroup.co',
      phone: '+1 (212) 555-0619',
      address: '45 Creative Ave, New York, NY 10001',
      tags: ['media', 'content', 'branding'],
      status: 'lead',
      notes: 'Met at a networking event. Very interested in a brand refresh and website overhaul.',
      createdAt: '2025-01-03',
      lastContact: '2025-01-03',
      totalRevenue: 0,
      communicationHistory: [
        {
          id: 'comm-5-1',
          type: 'note',
          subject: 'Networking event contact',
          content: 'Met Olivia at NYC Tech Week. She runs a creative agency and needs web help. Sent LinkedIn request.',
          date: '2025-01-03',
        },
      ],
    },
    {
      id: 'client-6',
      name: 'Carlos Vega',
      company: 'FinanceFlow',
      email: 'carlos.vega@financeflow.io',
      phone: '+1 (305) 555-0447',
      address: '1200 Brickell Ave, Miami, FL 33131',
      tags: ['fintech', 'dashboard', 'api'],
      status: 'lost',
      notes: 'Went with a larger agency due to budget. Might revisit in Q3 2025.',
      createdAt: '2024-08-15',
      lastContact: '2024-11-30',
      totalRevenue: 0,
      communicationHistory: [
        {
          id: 'comm-6-1',
          type: 'email',
          subject: 'Proposal for trading dashboard',
          content: 'Sent proposal for real-time trading analytics dashboard. $42,000.',
          date: '2024-09-01',
        },
        {
          id: 'comm-6-2',
          type: 'call',
          subject: 'Negotiation call',
          content: 'Carlos liked our approach but the budget is a concern. Offered a reduced scope.',
          date: '2024-10-15',
        },
        {
          id: 'comm-6-3',
          type: 'email',
          subject: 'Decision - went with another agency',
          content: 'Carlos informed us they chose a larger agency. Thanked us for our time.',
          date: '2024-11-30',
        },
      ],
    },
    {
      id: 'client-7',
      name: 'Emma Thompson',
      company: 'EduLearn Platform',
      email: 'emma.t@edulearn.org',
      phone: '+1 (617) 555-0783',
      address: '300 Education Dr, Boston, MA 02101',
      tags: ['edtech', 'lms', 'nonprofit'],
      status: 'proposal',
      notes: 'Non-profit organization. Limited budget but high-impact project. LMS needs accessibility features.',
      createdAt: '2024-12-20',
      lastContact: '2025-01-07',
      totalRevenue: 0,
      communicationHistory: [
        {
          id: 'comm-7-1',
          type: 'meeting',
          subject: 'Initial consultation',
          content: 'Emma presented their LMS requirements. They serve 10,000+ students. Accessibility is key.',
          date: '2024-12-22',
        },
        {
          id: 'comm-7-2',
          type: 'email',
          subject: 'Proposal for LMS development',
          content: 'Sent proposal for custom LMS with accessibility features. $22,000. Awaiting board approval.',
          date: '2025-01-07',
        },
      ],
    },
  ],
  projects: [
    {
      id: 'project-1',
      clientId: 'client-1',
      name: 'TechCorp SaaS Platform v2',
      description: 'Full redesign and rebuild of the TechCorp customer-facing SaaS platform with improved UX, new reporting module, and API integrations.',
      status: 'active',
      startDate: '2024-09-01',
      endDate: '2025-03-31',
      budget: 48500,
      hoursLogged: 312,
      hourlyRate: 125,
      tags: ['saas', 'react', 'node'],
      notes: 'Phase 2 started in January. Reporting module is the current focus.',
      tasks: [
        {
          id: 'task-1-1',
          title: 'Design reporting module UI',
          description: 'Create Figma designs for all 8 report types',
          status: 'done',
          dueDate: '2025-01-10',
          timeLogged: 16,
        },
        {
          id: 'task-1-2',
          title: 'Implement data visualization components',
          description: 'Build chart components using Recharts for revenue, users, and engagement metrics',
          status: 'in_progress',
          dueDate: '2025-01-25',
          timeLogged: 24,
        },
        {
          id: 'task-1-3',
          title: 'API integration for real-time data',
          description: 'Connect reporting module to backend APIs with WebSocket support',
          status: 'todo',
          dueDate: '2025-02-10',
          timeLogged: 0,
        },
        {
          id: 'task-1-4',
          title: 'User testing and QA',
          description: 'Conduct user testing sessions and fix reported bugs',
          status: 'todo',
          dueDate: '2025-03-01',
          timeLogged: 0,
        },
      ],
      milestones: [
        { id: 'ms-1-1', title: 'Design approved', dueDate: '2024-10-15', completed: true },
        { id: 'ms-1-2', title: 'Phase 1 launch (core platform)', dueDate: '2024-12-01', completed: true },
        { id: 'ms-1-3', title: 'Reporting module beta', dueDate: '2025-02-15', completed: false },
        { id: 'ms-1-4', title: 'Final delivery', dueDate: '2025-03-31', completed: false },
      ],
    },
    {
      id: 'project-2',
      clientId: 'client-4',
      name: 'HealthTech Analytics Dashboard',
      description: 'HIPAA-compliant analytics dashboard for patient data visualization and reporting across multiple hospital systems.',
      status: 'completed',
      startDate: '2024-04-01',
      endDate: '2024-10-31',
      budget: 32000,
      hoursLogged: 256,
      hourlyRate: 125,
      tags: ['healthcare', 'hipaa', 'dashboard'],
      notes: 'Project delivered on time. Client requested minor adjustments post-launch which were completed.',
      tasks: [
        {
          id: 'task-2-1',
          title: 'HIPAA compliance audit',
          description: 'Review architecture for HIPAA compliance requirements',
          status: 'done',
          dueDate: '2024-04-15',
          timeLogged: 20,
        },
        {
          id: 'task-2-2',
          title: 'Database schema design',
          description: 'Design encrypted data schema for patient records',
          status: 'done',
          dueDate: '2024-05-01',
          timeLogged: 32,
        },
        {
          id: 'task-2-3',
          title: 'Dashboard UI implementation',
          description: 'Build all dashboard views with filtering and export',
          status: 'done',
          dueDate: '2024-08-01',
          timeLogged: 160,
        },
        {
          id: 'task-2-4',
          title: 'Testing and deployment',
          description: 'Full QA cycle and production deployment',
          status: 'done',
          dueDate: '2024-10-15',
          timeLogged: 44,
        },
      ],
      milestones: [
        { id: 'ms-2-1', title: 'Architecture approved', dueDate: '2024-04-30', completed: true },
        { id: 'ms-2-2', title: 'MVP demo', dueDate: '2024-07-01', completed: true },
        { id: 'ms-2-3', title: 'Final delivery', dueDate: '2024-10-31', completed: true },
      ],
    },
    {
      id: 'project-3',
      clientId: 'client-1',
      name: 'TechCorp Mobile App',
      description: 'Companion mobile app for TechCorp platform - iOS and Android using React Native.',
      status: 'on_hold',
      startDate: '2025-02-01',
      endDate: '2025-07-31',
      budget: 22000,
      hoursLogged: 0,
      hourlyRate: 125,
      tags: ['mobile', 'react-native', 'ios', 'android'],
      notes: 'On hold until SaaS platform v2 is complete. Starting February 2025.',
      tasks: [
        {
          id: 'task-3-1',
          title: 'Requirements documentation',
          description: 'Document all mobile app requirements and user flows',
          status: 'todo',
          dueDate: '2025-02-15',
          timeLogged: 0,
        },
        {
          id: 'task-3-2',
          title: 'UI/UX design for mobile',
          description: 'Create mobile-specific designs in Figma',
          status: 'todo',
          dueDate: '2025-03-01',
          timeLogged: 0,
        },
      ],
      milestones: [
        { id: 'ms-3-1', title: 'Kickoff', dueDate: '2025-02-01', completed: false },
        { id: 'ms-3-2', title: 'Beta release', dueDate: '2025-06-01', completed: false },
        { id: 'ms-3-3', title: 'App store launch', dueDate: '2025-07-31', completed: false },
      ],
    },
    {
      id: 'project-4',
      clientId: 'client-3',
      name: 'RetailMax E-commerce Platform',
      description: 'Custom e-commerce solution to replace Shopify. Full product catalog, cart, checkout, and admin panel.',
      status: 'active',
      startDate: '2025-01-15',
      endDate: '2025-06-30',
      budget: 35000,
      hoursLogged: 48,
      hourlyRate: 125,
      tags: ['ecommerce', 'next.js', 'stripe'],
      notes: 'Just started. Jennifer wants weekly progress updates via email.',
      tasks: [
        {
          id: 'task-4-1',
          title: 'Project setup and architecture',
          description: 'Set up Next.js project with database and payment integration',
          status: 'done',
          dueDate: '2025-01-22',
          timeLogged: 16,
        },
        {
          id: 'task-4-2',
          title: 'Product catalog pages',
          description: 'Build product listing, filtering, and detail pages',
          status: 'in_progress',
          dueDate: '2025-02-15',
          timeLogged: 32,
        },
        {
          id: 'task-4-3',
          title: 'Shopping cart and checkout',
          description: 'Cart functionality with Stripe payment integration',
          status: 'todo',
          dueDate: '2025-03-15',
          timeLogged: 0,
        },
        {
          id: 'task-4-4',
          title: 'Admin panel',
          description: 'Order management, inventory, and reporting admin panel',
          status: 'todo',
          dueDate: '2025-05-01',
          timeLogged: 0,
        },
      ],
      milestones: [
        { id: 'ms-4-1', title: 'Design system complete', dueDate: '2025-02-01', completed: true },
        { id: 'ms-4-2', title: 'Catalog + cart ready', dueDate: '2025-03-31', completed: false },
        { id: 'ms-4-3', title: 'Beta launch', dueDate: '2025-05-31', completed: false },
        { id: 'ms-4-4', title: 'Production launch', dueDate: '2025-06-30', completed: false },
      ],
    },
    {
      id: 'project-5',
      clientId: 'client-4',
      name: 'HealthTech Patient Portal',
      description: 'Self-service patient portal with appointment scheduling, medical records access, and messaging.',
      status: 'active',
      startDate: '2025-01-01',
      endDate: '2025-08-31',
      budget: 28000,
      hoursLogged: 64,
      hourlyRate: 125,
      tags: ['healthcare', 'portal', 'hipaa'],
      notes: 'Extension of the analytics dashboard project. Using same infrastructure.',
      tasks: [
        {
          id: 'task-5-1',
          title: 'Patient authentication system',
          description: 'Secure login with 2FA and session management',
          status: 'done',
          dueDate: '2025-01-20',
          timeLogged: 24,
        },
        {
          id: 'task-5-2',
          title: 'Medical records viewer',
          description: 'Encrypted records display with PDF export',
          status: 'in_progress',
          dueDate: '2025-02-28',
          timeLogged: 40,
        },
        {
          id: 'task-5-3',
          title: 'Appointment scheduling',
          description: 'Calendar integration for booking appointments',
          status: 'todo',
          dueDate: '2025-04-15',
          timeLogged: 0,
        },
        {
          id: 'task-5-4',
          title: 'Secure messaging system',
          description: 'End-to-end encrypted patient-doctor messaging',
          status: 'todo',
          dueDate: '2025-06-30',
          timeLogged: 0,
        },
      ],
      milestones: [
        { id: 'ms-5-1', title: 'Auth and records MVP', dueDate: '2025-03-01', completed: false },
        { id: 'ms-5-2', title: 'Scheduling live', dueDate: '2025-05-01', completed: false },
        { id: 'ms-5-3', title: 'Full launch', dueDate: '2025-08-31', completed: false },
      ],
    },
  ],
  invoices: [
    {
      id: 'invoice-1',
      invoiceNumber: 'INV-001',
      clientId: 'client-1',
      projectId: 'project-1',
      status: 'paid',
      issueDate: '2024-11-01',
      dueDate: '2024-11-30',
      paidDate: '2024-11-25',
      items: [
        { id: 'item-1-1', description: 'SaaS Platform Phase 1 - Design & Architecture', quantity: 80, rate: 125, amount: 10000 },
        { id: 'item-1-2', description: 'SaaS Platform Phase 1 - Frontend Development', quantity: 120, rate: 125, amount: 15000 },
      ],
      subtotal: 25000,
      taxRate: 8,
      taxAmount: 2000,
      discountRate: 0,
      discountAmount: 0,
      total: 27000,
      notes: 'Thank you for your business! Payment terms: Net 30.',
    },
    {
      id: 'invoice-2',
      invoiceNumber: 'INV-002',
      clientId: 'client-4',
      projectId: 'project-2',
      status: 'paid',
      issueDate: '2024-10-31',
      dueDate: '2024-11-30',
      paidDate: '2024-11-15',
      items: [
        { id: 'item-2-1', description: 'Analytics Dashboard - Final Delivery', quantity: 128, rate: 125, amount: 16000 },
        { id: 'item-2-2', description: 'HIPAA Compliance Documentation', quantity: 16, rate: 125, amount: 2000 },
        { id: 'item-2-3', description: 'Post-launch Support (2 weeks)', quantity: 16, rate: 125, amount: 2000 },
      ],
      subtotal: 20000,
      taxRate: 8,
      taxAmount: 1600,
      discountRate: 5,
      discountAmount: 1000,
      total: 20600,
      notes: 'Final invoice for HealthTech Analytics Dashboard project.',
    },
    {
      id: 'invoice-3',
      invoiceNumber: 'INV-003',
      clientId: 'client-1',
      projectId: 'project-1',
      status: 'sent',
      issueDate: '2025-01-01',
      dueDate: '2025-01-31',
      items: [
        { id: 'item-3-1', description: 'SaaS Platform Phase 2 - Reporting Module Design', quantity: 40, rate: 125, amount: 5000 },
        { id: 'item-3-2', description: 'SaaS Platform Phase 2 - Development (Dec 2024)', quantity: 96, rate: 125, amount: 12000 },
      ],
      subtotal: 17000,
      taxRate: 8,
      taxAmount: 1360,
      discountRate: 0,
      discountAmount: 0,
      total: 18360,
      notes: 'Monthly billing for December 2024 work. Thank you!',
    },
    {
      id: 'invoice-4',
      invoiceNumber: 'INV-004',
      clientId: 'client-4',
      projectId: 'project-5',
      status: 'overdue',
      issueDate: '2024-12-15',
      dueDate: '2025-01-14',
      items: [
        { id: 'item-4-1', description: 'Patient Portal - Authentication System', quantity: 24, rate: 125, amount: 3000 },
        { id: 'item-4-2', description: 'Patient Portal - Architecture & Setup', quantity: 16, rate: 125, amount: 2000 },
      ],
      subtotal: 5000,
      taxRate: 8,
      taxAmount: 400,
      discountRate: 0,
      discountAmount: 0,
      total: 5400,
      notes: 'Invoice for Patient Portal project kickoff work.',
    },
  ],
  contracts: [
    {
      id: 'contract-1',
      clientId: 'client-1',
      projectId: 'project-1',
      title: 'SaaS Platform Development Agreement',
      status: 'signed',
      content: `SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into as of September 1, 2024, between John Doe ("Freelancer") and TechCorp Solutions ("Client").

1. SERVICES
Freelancer agrees to provide software development services for the TechCorp SaaS Platform v2 project, including design, frontend development, backend integration, and reporting module development.

2. COMPENSATION
Client agrees to pay Freelancer at a rate of $125 per hour. Total project budget is $48,500.

3. TIMELINE
Project start date: September 1, 2024. Expected completion: March 31, 2025.

4. INTELLECTUAL PROPERTY
Upon receipt of full payment, all work product created under this agreement becomes the exclusive property of the Client.

5. CONFIDENTIALITY
Freelancer agrees to maintain strict confidentiality of all Client information and trade secrets.

6. TERMINATION
Either party may terminate this agreement with 30 days written notice.`,
      createdAt: '2024-08-20',
      signedAt: '2024-08-28',
      value: 48500,
    },
    {
      id: 'contract-2',
      clientId: 'client-4',
      projectId: 'project-5',
      title: 'Patient Portal Development - HIPAA Business Associate Agreement',
      status: 'signed',
      content: `HIPAA BUSINESS ASSOCIATE AGREEMENT

This Business Associate Agreement ("BAA") supplements the Service Agreement between John Doe ("Business Associate") and HealthTech Solutions ("Covered Entity").

1. DEFINITIONS
Terms used in this BAA shall have the same meaning as those in the HIPAA Privacy Rule, Security Rule, and Breach Notification Rule.

2. PERMITTED USES AND DISCLOSURES
Business Associate may use and disclose Protected Health Information only as necessary to perform services under the Service Agreement.

3. SAFEGUARDS
Business Associate shall implement appropriate administrative, physical, and technical safeguards to protect PHI.

4. BREACH NOTIFICATION
Business Associate shall notify Covered Entity within 60 days of discovery of a breach of unsecured PHI.

5. TERM AND TERMINATION
This BAA is effective January 1, 2025 and terminates upon completion of all services or upon termination of the underlying Service Agreement.`,
      createdAt: '2024-12-20',
      signedAt: '2024-12-28',
      value: 28000,
    },
    {
      id: 'contract-3',
      clientId: 'client-3',
      projectId: 'project-4',
      title: 'RetailMax E-commerce Platform Development',
      status: 'signed',
      content: `SERVICE AGREEMENT

This Service Agreement is entered into as of January 10, 2025, between John Doe ("Developer") and RetailMax Inc. ("Client").

1. PROJECT SCOPE
Developer agrees to design and build a custom e-commerce platform including: product catalog, shopping cart, Stripe payment integration, and admin panel.

2. DELIVERABLES
- Custom e-commerce website (Next.js)
- Product catalog with filtering and search
- Shopping cart with Stripe checkout
- Order management admin panel
- Documentation and handoff

3. PAYMENT TERMS
Total project value: $35,000. Payment schedule: 30% upfront, 30% at midpoint, 40% upon delivery.

4. REVISIONS
Up to 3 rounds of revisions per deliverable are included.

5. TIMELINE
Estimated completion: June 30, 2025.`,
      createdAt: '2025-01-08',
      signedAt: '2025-01-12',
      value: 35000,
    },
  ],
  meetings: [
    {
      id: 'meeting-1',
      clientId: 'client-1',
      title: 'TechCorp Phase 2 Review',
      description: 'Monthly review of Phase 2 progress, reporting module demo, and planning for February sprint.',
      date: '2025-01-20T14:00:00',
      duration: 60,
      type: 'video',
      link: 'https://meet.google.com/abc-defg-hij',
    },
    {
      id: 'meeting-2',
      clientId: 'client-2',
      title: 'StartupXYZ Contract Negotiation',
      description: 'Final negotiation on MVP timeline and pricing. Goal is to reach agreement on a 2-month delivery.',
      date: '2025-01-22T10:00:00',
      duration: 45,
      type: 'video',
      link: 'https://zoom.us/j/123456789',
    },
    {
      id: 'meeting-3',
      clientId: 'client-3',
      title: 'RetailMax Weekly Sync',
      description: 'Weekly progress update call with Jennifer. Demo of product catalog pages.',
      date: '2025-01-24T11:00:00',
      duration: 30,
      type: 'phone',
    },
    {
      id: 'meeting-4',
      clientId: 'client-5',
      title: 'MediaGroup Discovery Call',
      description: 'First formal meeting with Olivia to understand brand refresh scope and get a formal brief.',
      date: '2025-01-28T15:30:00',
      duration: 60,
      type: 'video',
      link: 'https://meet.google.com/xyz-abcd-efg',
    },
  ],
  expenses: [
    {
      id: 'expense-1',
      description: 'Adobe Creative Cloud Annual Subscription',
      amount: 599.88,
      category: 'software',
      date: '2025-01-01',
    },
    {
      id: 'expense-2',
      description: 'GitHub Copilot Pro - Monthly',
      amount: 19,
      category: 'software',
      date: '2025-01-05',
    },
    {
      id: 'expense-3',
      description: 'Client lunch - TechCorp team',
      amount: 187.5,
      category: 'travel',
      date: '2024-12-15',
    },
    {
      id: 'expense-4',
      description: 'External monitor - Dell 27" 4K',
      amount: 449.99,
      category: 'hardware',
      date: '2024-12-01',
    },
    {
      id: 'expense-5',
      description: 'Google Ads - Portfolio promotion',
      amount: 250,
      category: 'marketing',
      date: '2025-01-10',
    },
  ],
};

export type SkillCategory = 'Programming' | 'Engineering' | 'Creative' | 'Professional';

export type SkillProficiency = 'Exploring' | 'Practicing' | 'Proficient' | 'Advanced';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: SkillProficiency;
  note?: string;
}

export type CertificationCategory =
  | 'Embedded & Hardware'
  | 'Software & AI'
  | 'Creative & Leadership';

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  category: CertificationCategory;
  completedDate: string; // e.g. "2026-09" or "Sep 2026"
  credentialId?: string;
  credentialUrl?: string;
  summary: string;
  skillsGained: string[];
}

export interface ArchitectureStage {
  step: string;
  title: string;
  module: string;
  detail: string;
}

export interface ProjectItem {
  id: string;
  indexLabel: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  imageSrc: string;
  imageAlt: string;
  stack: string[];
  architectureStages: ArchitectureStage[];
  outcome: string;
}

export interface MilestoneItem {
  id: string;
  indexLabel: string;
  title: string;
  context: string;
  timeframe: string;
  description: string;
}

export interface PillarItem {
  id: string;
  title: string;
  headline: string;
  description: string;
  focusAreas: string[];
}

export interface ContactProfile {
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  location: string;
}

export interface PortfolioData {
  skills: SkillItem[];
  certifications: CertificationItem[];
  contact: ContactProfile;
}

export const HERO_PORTRAIT_SRC = '/assets/aistudio/IMG_20261124_215445_fac31431.jpg';

export const DEFAULT_PILLARS: PillarItem[] = [
  {
    id: 'technology',
    title: 'Technology',
    headline: 'Bridging silicon sensors with responsive software.',
    description:
      'Studying Electronics and Communication Engineering gives me a ground-up view of how hardware interrupts, signal conditioning, and software architectures converge into reliable everyday tools.',
    focusAreas: ['Microcontrollers & Telemetry', 'Embedded C / C++', 'Python Automation'],
  },
  {
    id: 'innovation',
    title: 'Innovation',
    headline: 'Prototyping practical answers to real safety bottlenecks.',
    description:
      'From smart helmets that trigger emergency alerts on impact to computer-vision perimeter monitors, I prefer testing ideas physically on the workbench rather than leaving them on slides.',
    focusAreas: ['Smart India Hackathon', 'Sensor Fusion', 'Edge Vision'],
  },
  {
    id: 'leadership',
    title: 'Leadership',
    headline: 'Coordinating multidisciplinary teams under hackathon clocks.',
    description:
      'Building a complete prototype requires aligning circuit design, firmware debugging, and clear narrative pitching. I enjoy stepping up to structure workflows and keep momentum steady.',
    focusAreas: ['Sprint Coordination', 'Technical Pitching', 'Peer Collaboration'],
  },
  {
    id: 'creativity',
    title: 'Creativity',
    headline: 'Communicating engineering ideas with visual clarity.',
    description:
      'Video editing and visual storytelling sharpen how I present prototypes. A well-paced demonstration turns complex hardware behavior into an intuitive story anyone can grasp.',
    focusAreas: ['Video Editing', 'Visual Storytelling', 'Prototype Demos'],
  },
];

export const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: 'project-helm',
    indexLabel: '01',
    title: 'Project Helm',
    subtitle: 'Smart Helmet Accident Detection & SOS System',
    description:
      'A smart helmet prototype designed to detect accidents using sensor-based motion analysis and trigger an SOS alert system, helping improve emergency response.',
    longDescription:
      'Designed around an ESP32 microcontroller paired with an MPU6050 6-axis accelerometer and gyroscope to continuously sample linear impact spikes and sustained tilt anomalies. Once an accident threshold is verified, the firmware dispatches a low-latency Bluetooth signal to trigger an automated emergency SOS alert.',
    imageSrc: '/src/assets/images/project_helm_prototype_1795538537375.jpg',
    imageAlt: 'Project Helm smart motorcycle helmet prototype with embedded ESP32 sensor module',
    stack: ['ESP32', 'MPU6050', 'Embedded Systems', 'Bluetooth', 'Motion Sensors'],
    outcome: 'Validated impact-threshold detection and automated Bluetooth SOS trigger workflow.',
    architectureStages: [
      {
        step: '01',
        title: 'Motion & Impact Sensing',
        module: 'MPU6050 6-Axis IMU',
        detail:
          'Continuously captures 3-axis acceleration and angular velocity along the helmet shell via I2C bus.',
      },
      {
        step: '02',
        title: 'Threshold Filtering',
        module: 'ESP32 Firmware Logic',
        detail:
          'Separates routine road vibrations from sharp G-force impact spikes combined with abnormal post-impact tilt.',
      },
      {
        step: '03',
        title: 'Wireless Relay',
        module: 'Bluetooth Low Energy',
        detail:
          'Transmits an immediate alert packet to the paired companion mobile unit with a brief false-alarm cancel window.',
      },
      {
        step: '04',
        title: 'Emergency Dispatch',
        module: 'Automated SOS Alert',
        detail:
          'Initiates emergency contact notification to accelerate first-responder arrival time.',
      },
    ],
  },
  {
    id: 'project-animal-detection',
    indexLabel: '02',
    title: 'Smart Animal Detection System',
    subtitle: 'Computer Vision Intrusion Deterrent Concept',
    description:
      'An intelligent animal-detection and deterrent concept designed to identify animals through computer vision and trigger appropriate responses to reduce unwanted animal intrusion.',
    longDescription:
      'An intelligent perimeter monitoring system combining Python-based computer vision inference with hardware deterrent integration. Incoming optical frames are analyzed to distinguish animal movement from ambient environmental noise and activate targeted, non-harmful deterrent signals.',
    imageSrc: '/src/assets/images/project_animal_detection_1795538538453.jpg',
    imageAlt: 'Smart Animal Detection System edge AI vision camera module',
    stack: ['Python', 'Computer Vision', 'Edge AI', 'Hardware Integration'],
    outcome: 'Built end-to-end visual classification pipeline coupled with actuator alert signaling.',
    architectureStages: [
      {
        step: '01',
        title: 'Optical Capture',
        module: 'Perimeter Camera Feed',
        detail:
          'Streams real-time frames from field boundary zones for continuous visual monitoring.',
      },
      {
        step: '02',
        title: 'Vision Inference',
        module: 'Python CV Pipeline',
        detail:
          'Runs object detection to identify and classify wildlife intrusion while filtering swaying foliage.',
      },
      {
        step: '03',
        title: 'Decision Routing',
        module: 'Alert Controller',
        detail:
          'Evaluates confidence scores and maps species category to the least-intrusive deterrent profile.',
      },
      {
        step: '04',
        title: 'Hardware Deterrent',
        module: 'Acoustic & Optical Relay',
        detail:
          'Activates safe, targeted acoustic or light cues via hardware relays to redirect animals away from protected areas.',
      },
    ],
  },
];

export const DEFAULT_MILESTONES: MilestoneItem[] = [
  {
    id: 'kpriet',
    indexLabel: '01',
    title: 'KPR Institute of Engineering and Technology',
    context: 'Undergraduate · ECE',
    timeframe: 'Ongoing',
    description:
      'Pursuing Electronics and Communication Engineering, building deep foundations across analog/digital circuits, microcontrollers, and software engineering.',
  },
  {
    id: 'sih',
    indexLabel: '02',
    title: 'Smart India Hackathon',
    context: 'National Innovation Challenge',
    timeframe: '2025 – 2026',
    description:
      'Collaborative team participation—framing problem statements, architecting hardware-software solutions, and pitching functional concepts.',
  },
  {
    id: 'prototyping',
    indexLabel: '03',
    title: 'Hackathon Rapid Prototyping',
    context: 'Hardware + Software',
    timeframe: '2025 – 2026',
    description:
      'End-to-end engineering sprints bridging ESP32 sensors, Python vision models, and live functional demonstrations.',
  },
  {
    id: 'leadership-collab',
    indexLabel: '04',
    title: 'Leadership & Visual Storytelling',
    context: 'Team Coordination',
    timeframe: 'Ongoing',
    description:
      'Coordinating student engineering teams while crafting concise video demos and technical presentations.',
  },
];

export const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
  skills: [
    {
      id: 'skill-python',
      name: 'Python',
      category: 'Programming',
      proficiency: 'Proficient',
      note: 'Computer vision pipelines, scripting, and rapid prototyping',
    },
    {
      id: 'skill-c',
      name: 'C',
      category: 'Programming',
      proficiency: 'Proficient',
      note: 'Structured logic and microcontroller firmware fundamentals',
    },
    {
      id: 'skill-cpp',
      name: 'C++',
      category: 'Programming',
      proficiency: 'Practicing',
      note: 'Object-oriented patterns and ESP32 Arduino core development',
    },
    {
      id: 'skill-soft-dev',
      name: 'Software Development',
      category: 'Programming',
      proficiency: 'Practicing',
      note: 'Modular architecture, debugging, and iterative prototyping',
    },
    {
      id: 'skill-electronics',
      name: 'Electronics',
      category: 'Engineering',
      proficiency: 'Proficient',
      note: 'Circuit fundamentals, sensor interfacing, and signal flow',
    },
    {
      id: 'skill-embedded',
      name: 'Embedded Systems',
      category: 'Engineering',
      proficiency: 'Proficient',
      note: 'ESP32, MPU6050 IMU integration, and BLE telemetry',
    },
    {
      id: 'skill-prototyping',
      name: 'Hardware Prototyping',
      category: 'Engineering',
      proficiency: 'Proficient',
      note: 'Breadboard validation to integrated wearable & field modules',
    },
    {
      id: 'skill-eng-fund',
      name: 'Engineering Fundamentals',
      category: 'Engineering',
      proficiency: 'Proficient',
      note: 'Systems thinking and physical-world constraint analysis',
    },
    {
      id: 'skill-video',
      name: 'Video Editing',
      category: 'Creative',
      proficiency: 'Proficient',
      note: 'Pacing, color mood, and prototype showcase reels',
    },
    {
      id: 'skill-story',
      name: 'Visual Storytelling',
      category: 'Creative',
      proficiency: 'Proficient',
      note: 'Translating technical concepts into clear visual narratives',
    },
    {
      id: 'skill-comm',
      name: 'Communication',
      category: 'Professional',
      proficiency: 'Proficient',
      note: 'Hackathon pitching and cross-team technical alignment',
    },
    {
      id: 'skill-leadership',
      name: 'Leadership',
      category: 'Professional',
      proficiency: 'Proficient',
      note: 'Coordinating project milestones and team responsibilities',
    },
    {
      id: 'skill-collab',
      name: 'Team Collaboration',
      category: 'Professional',
      proficiency: 'Proficient',
      note: 'Shared problem-solving across hardware and software tracks',
    },
    {
      id: 'skill-problem',
      name: 'Problem Solving',
      category: 'Professional',
      proficiency: 'Proficient',
      note: 'Root-cause debugging from sensor noise to software logic',
    },
  ],
  certifications: [
    {
      id: 'cert-embedded-starter',
      title: 'Embedded Systems & Microcontroller Prototyping',
      issuer: 'KPRIET Technical Workshop',
      category: 'Embedded & Hardware',
      completedDate: '2026-03',
      credentialId: 'ECE-2026-ESP32',
      credentialUrl: '',
      summary:
        'Hands-on training covering sensor interfacing, I2C/SPI communication protocols, and real-time alert triggering on ESP32.',
      skillsGained: ['ESP32', 'I2C Telemetry', 'Hardware Debugging'],
    },
    {
      id: 'cert-python-cv',
      title: 'Python Foundations for Computer Vision',
      issuer: 'Self-Directed Track',
      category: 'Software & AI',
      completedDate: '2026-06',
      credentialId: '',
      credentialUrl: '',
      summary:
        'Applied Python programming for frame capture, object detection workflows, and hardware relay integration.',
      skillsGained: ['Python', 'Computer Vision', 'Inference Pipelines'],
    },
  ],
  contact: {
    email: '26ec200@kpriet.ac.in',
    linkedinUrl: 'https://www.linkedin.com',
    githubUrl: 'https://github.com',
    location: 'Coimbatore, India · KPR Institute of Engineering and Technology',
  },
};

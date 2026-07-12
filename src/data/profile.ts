import {
  BriefcaseBusiness,
  Code2,
  Database,
  GraduationCap,
  Mail,
  MapPin,
  ServerCog,
  Send,
  Sparkles,
  Wrench,
} from "lucide-react";
import lexLanding from "@/Image/Lexverdict Python/Landing Page or Log in.png";
import lexCase1 from "@/Image/Lexverdict Python/Manage Case/Image 1.png";
import lexCase2 from "@/Image/Lexverdict Python/Manage Case/image 2.png";
import lexCase3 from "@/Image/Lexverdict Python/Manage Case/Image 3.png";
import lexCase4 from "@/Image/Lexverdict Python/Manage Case/Image 4.png";
import lexCase5 from "@/Image/Lexverdict Python/Manage Case/Image 5.png";
import lexCrime from "@/Image/Lexverdict Python/Manage Crime/Image 10.png";
import lexUser6 from "@/Image/Lexverdict Python/Manage User Accounts/Image 6.png";
import lexUser7 from "@/Image/Lexverdict Python/Manage User Accounts/Image 7.png";
import lexUser8 from "@/Image/Lexverdict Python/Manage User Accounts/Image 8.png";
import lexUser9 from "@/Image/Lexverdict Python/Manage User Accounts/Image 9.png";
import rhuLanding from "@/Image/RHU/Landing Page or Log in.png";
import rhuDashboard from "@/Image/RHU/Screenshot 2026-07-06 210911.png";
import rhuAppointments from "@/Image/RHU/Screenshot 2026-07-06 210926.png";
import rhuLaboratory from "@/Image/RHU/Screenshot 2026-07-06 210945.png";
import rhuDental from "@/Image/RHU/Screenshot 2026-07-06 211002.png";

export const profile = {
  name: "Nicolas B. Eugenio",
  shortName: "Nicolas",
  role: "Junior Software Developer",
  location: "Malabon City, Manila",
  email: "nicolaseugenio2022@gmail.com",
  summary:
    "BS Information Technology graduate with hands-on experience in software development, database management, and IT support. I build practical systems for record handling, workflow monitoring, and administrative operations.",
  highlights: [
    "Entry-level software developer with IT support experience",
    "Built case monitoring and healthcare management systems",
    "Comfortable with full-stack tools, databases, and troubleshooting",
  ],
};

export const portfolioStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "shadcn/ui",
  "Resend",
];

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/nicolaseugenio2022-cyber",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/NicolasEugenio21",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nicolas-eugenio-187bb52a8/",
  },
];

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const skillGroups = [
  {
    title: "Programming Languages",
    icon: Code2,
    skills: ["PHP", "Python", "Java", "JavaScript", "TypeScript", "Next.js", "C++"],
  },
  {
    title: "Libraries & Frameworks",
    icon: Sparkles,
    skills: ["Laravel", "Bootstrap", "React", "Tailwind", "MERN Stack", "WordPress"],
  },
  {
    title: "Database",
    icon: Database,
    skills: ["MySQL", "MongoDB", "Supabase"],
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: ["Git", "GitHub", "Docker", "XAMPP", "Visual Studio Code", "Composer"],
  },
  {
    title: "Soft Skills",
    icon: BriefcaseBusiness,
    skills: [
      "Problem Solving",
      "Analytical Thinking",
      "Attention to Detail",
      "Communication",
      "Teamwork",
      "Time Management",
    ],
  },
  {
    title: "Technical Support",
    icon: ServerCog,
    skills: [
      "Hardware Troubleshooting",
      "Software Installation",
      "Windows Configuration",
      "Network Troubleshooting",
    ],
  },
];

export const projects = [
  {
    title: "LexVerdict",
    label: "Case Monitoring System",
    problem:
      "The Nueva Ecija Office of the Provincial Prosecutor needed a more organized way to monitor subpoena and case resolution records.",
    solution:
      "Developed a monitoring system that supports structured case tracking, faster lookup, and clearer administrative record handling.",
    role: "Developer",
    stack: ["Python", "HTML", "MySQL"],
    features: [
      "Subpoena and case resolution monitoring",
      "Administrative record organization",
      "Searchable case information",
      "Workflow support for office staff",
    ],
    accent: "violet" as const,
    images: [
      { label: "Overview", image: lexLanding },
      { label: "Manage cases", image: lexCase1 },
      { label: "Case records", image: lexCase2 },
      { label: "Case tracking", image: lexCase3 },
      { label: "Case details", image: lexCase4 },
      { label: "Reports", image: lexCase5 },
      { label: "Crime records", image: lexCrime },
      { label: "User accounts", image: lexUser6 },
      { label: "User details", image: lexUser7 },
      { label: "User roles", image: lexUser8 },
      { label: "Account management", image: lexUser9 },
    ],
    gallerySections: [
      {
        label: "Overview",
        images: [{ label: "Login and landing page", image: lexLanding }],
      },
      {
        label: "Manage Cases",
        images: [
          { label: "Case dashboard", image: lexCase1 },
          { label: "Case records", image: lexCase2 },
          { label: "Case tracking", image: lexCase3 },
          { label: "Case details", image: lexCase4 },
          { label: "Case reports", image: lexCase5 },
        ],
      },
      {
        label: "Manage Users",
        images: [
          { label: "User accounts", image: lexUser6 },
          { label: "User details", image: lexUser7 },
          { label: "User roles", image: lexUser8 },
          { label: "Account management", image: lexUser9 },
        ],
      },
      {
        label: "Manage Crime",
        images: [{ label: "Crime records", image: lexCrime }],
      },
    ],
  },
  {
    title: "Rural Health Unit",
    label: "Healthcare Management System",
    problem:
      "The Rural Health Unit needed a centralized way to coordinate patient appointments, staff services, laboratory records, and clinical assessments.",
    solution:
      "Developed a healthcare management platform that organizes daily clinical workflows and makes essential patient service information easier for staff to access.",
    role: "Developer",
    stack: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap"],
    features: [
      "Patient appointment scheduling and tracking",
      "Staff and healthcare service management",
      "Maternal and child health records",
      "Laboratory and dental assessment workflows",
    ],
    accent: "cyan" as const,
    images: [
      { label: "Secure login", image: rhuLanding },
      { label: "Dashboard", image: rhuDashboard },
      { label: "Appointments", image: rhuAppointments },
      { label: "Laboratory", image: rhuLaboratory },
      { label: "Dental assessment", image: rhuDental },
    ],
  },
];

export const experience = [
  {
    title: "IT Support Intern",
    organization: "Clark Development Corporation",
    locationName: "Clark Development Corporation",
    address: "Clark Freeport, Angeles, Pampanga",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d962.6585107979818!2d120.5186743!3d15.1784295!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33969327712f05e9%3A0x2ced28cf001bd150!2sBldg.%202122!5e0!3m2!1sen!2sph!4v1783217783179!5m2!1sen!2sph",
    mapUrl: "https://maps.app.goo.gl/CKf9ChEduYVFaQVh8",
    date: "2026",
    description:
      "Assigned to the Property Management Division, supporting technical and administrative operations through troubleshooting, system assistance, and day-to-day IT support tasks.",
  },
];

export const certifications = [
  {
    title: "Civil Service Examination - Professional Level Passer",
    detail: "Examinee Number: 174481",
    date: "August 10, 2025",
  },
  {
    title: "IRCITE Certificate of Participation",
    detail: "",
    date: "March 8, 2024",
  },
  {
    title: "CERTIPORT Examination Passer",
    detail: "Major in Database",
    date: "December 5, 2025",
  },
  {
    title: 'Graphic Design Seminar with a theme "Turn a Concept into Creations"',
    detail: "College for Research & Technology",
    date: "",
  },
  {
    title: "Principles of Design",
    detail: "University of the Philippines Open University",
    date: "",
  },
  {
    title: "Youth Chinese Test Level 1",
    detail: "",
    date: "2015",
  },
];

export const education = [
  {
    school: "Nueva Ecija University of Science and Technology",
    program: "Bachelor of Science in Information Technology",
    locationName: "Nueva Ecija University of Science and Technology",
    address: "Cabanatuan City, 3100 Nueva Ecija",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3845.6718493338944!2d120.9392203!3d15.448252599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x339727d57ef0edc9%3A0x94e292410c0bdb28!2sNueva%20Ecija%20University%20of%20Science%20and%20Technology%2C%20Sumacab%20Campus!5e0!3m2!1sen!2sph!4v1783217807481!5m2!1sen!2sph",
    mapUrl: "https://maps.app.goo.gl/mSwsmL7hGcFRLG4d6",
    date: "2022-2026",
  },
  {
    school: "College for Research and Technology (CRT)",
    program: "Senior High School",
    locationName: "College for Research and Technology",
    address: "Burgos Avenue, Cabanatuan City, Nueva Ecija",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3844.9116418795124!2d120.96704319999999!3d15.489184199999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33972e955348cf89%3A0x8a1d57bc0e712e17!2sCollege%20for%20Research%20and%20Technology%20of%20Cabanatuan!5e0!3m2!1sen!2sph!4v1783217827780!5m2!1sen!2sph",
    mapUrl: "https://maps.app.goo.gl/J2uT6S4CSLGK8p9J7",
    date: "2020-2022",
  },
  {
    school: "Nueva Ecija High School",
    program: "Junior High School",
    locationName: "Nueva Ecija High School",
    address: "Burgos Avenue, Cabanatuan City, 3100 Nueva Ecija",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3844.893412928079!2d120.9711285!3d15.490164400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33972926a7d5e039%3A0xc014cf26d6c63422!2sNueva%20Ecija%20High%20School!5e0!3m2!1sen!2sph!4v1783217847421!5m2!1sen!2sph",
    mapUrl: "https://maps.app.goo.gl/bfsbRkvi94AEVZez7",
    date: "2016-2020",
  },
  {
    school: "Lazaro Francisco Integrated School",
    program: "Elementary School",
    locationName: "Lazaro Francisco Integrated School",
    address: "Vijandre District, Cabanatuan City, Nueva Ecija",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3844.9531354202136!2d120.95859100000001!3d15.486952799999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x339728e200ff8a1f%3A0x9a633f10eac69ef1!2sLazaro%20Francisco%20Integrated%20School!5e0!3m2!1sen!2sph!4v1783217865732!5m2!1sen!2sph",
    mapUrl: "https://maps.app.goo.gl/iHCSGAfcbZXXfrwi7",
    date: "2010-2016",
  },
];

export const contactDetails = [
  {
    label: "Email",
    value: profile.email,
    icon: Mail,
  },
  {
    label: "Location",
    value: profile.location,
    icon: MapPin,
  },
  {
    label: "Message",
    value: "Send a project or opportunity inquiry",
    icon: Send,
  },
  {
    label: "Education",
    value: "BS Information Technology",
    icon: GraduationCap,
  },
];

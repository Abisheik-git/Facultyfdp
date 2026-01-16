// Type definitions for the application

export interface FacultyProfile {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  joinDate: string;
  fdpCount: number;
  seminarCount: number;
  workshopCount: number;
}

export interface FDP {
  id: string;
  facultyId: string;
  title: string;
  organizer: string;
  startDate: string;
  endDate: string;
  duration: string;
  certificate?: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface FDPAttended {
  id: string;
  facultyId: string;
  title: string;
  mode: 'online' | 'offline';
  duration: string;
  venue: string;
  reportUpload?: string;
  proofDoc?: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface FDPOrganized {
  id: string;
  facultyId: string;
  title: string;
  venue: string;
  type: 'conference' | 'workshop';
  proofDoc?: string;
  report?: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ActivityBasedLearning {
  id: string;
  facultyId: string;
  subjectName: string;
  courseCode: string;
  industryConnect: string;
  proofDoc?: string;
}

export interface AdjunctFaculty {
  id: string;
  facultyId: string;
  facultyName: string;
  department: string;
  courseCode: string;
  supportingDocs?: string;
}

export interface JointTeaching {
  id: string;
  facultyId: string;
  courseName: string;
  courseCode: string;
  facultyInvolved: string;
  syllabusDoc?: string;
  hours: number;
}

export interface Seminar {
  id: string;
  facultyId: string;
  title: string;
  topic: string;
  date: string;
  venue: string;
  description: string;
  attendees?: number;
}

export interface Notification {
  id: string;
  recipientId: string;
  sender: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'success' | 'warning';
}

export interface UpcomingEvent {
  id: string;
  title: string;
  type: 'FDP' | 'Seminar' | 'Workshop' | 'Conference';
  date: string;
  venue: string;
  description: string;
  registrationLink?: string;
}

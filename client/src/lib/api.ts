// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Helper function to get auth headers
const getAuthHeaders = (): HeadersInit => {
  const userId = localStorage.getItem('user-id');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (userId) {
    headers['user-id'] = userId;
  }
  return headers;
};

// Generic API request function
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config: RequestInit = {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// ========== Authentication API ==========
export const authAPI = {
  login: async (email: string, password: string, role: string) => {
    return apiRequest<{ message: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    });
  },

  register: async (userData: {
    name: string;
    email: string;
    password: string;
    role: string;
    department?: string;
    designation?: string;
    phone?: string;
    recoveryEmail?: string;
  }) => {
    return apiRequest<{ message: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  getCurrentUser: async () => {
    return apiRequest<{ user: any }>('/auth/me');
  },
};

// ========== Faculty API ==========
export const facultyAPI = {
  // FDP Attended
  getFDPAttended: async () => {
    return apiRequest<any[]>('/faculty/fdp/attended');
  },

  createFDPAttended: async (data: {
    title: string;
    mode: 'online' | 'offline';
    duration: string;
    venue: string;
    reportUpload?: string;
    proofDoc?: string;
  }) => {
    return apiRequest<any>('/faculty/fdp/attended', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateFDPAttended: async (id: string, data: any) => {
    return apiRequest<any>(`/faculty/fdp/attended/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteFDPAttended: async (id: string) => {
    return apiRequest<{ message: string }>(`/faculty/fdp/attended/${id}`, {
      method: 'DELETE',
    });
  },

  // FDP Organized
  getFDPOrganized: async () => {
    return apiRequest<any[]>('/faculty/fdp/organized');
  },

  createFDPOrganized: async (data: {
    title: string;
    venue: string;
    type: 'conference' | 'workshop';
    proofDoc?: string;
    report?: string;
  }) => {
    return apiRequest<any>('/faculty/fdp/organized', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateFDPOrganized: async (id: string, data: any) => {
    return apiRequest<any>(`/faculty/fdp/organized/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteFDPOrganized: async (id: string) => {
    return apiRequest<{ message: string }>(`/faculty/fdp/organized/${id}`, {
      method: 'DELETE',
    });
  },

  // Seminars
  getSeminars: async () => {
    return apiRequest<any[]>('/faculty/seminars');
  },

  createSeminar: async (data: {
    title: string;
    topic: string;
    date: string;
    venue: string;
    description?: string;
    attendees?: number;
  }) => {
    return apiRequest<any>('/faculty/seminars', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateSeminar: async (id: string, data: any) => {
    return apiRequest<any>(`/faculty/seminars/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteSeminar: async (id: string) => {
    return apiRequest<{ message: string }>(`/faculty/seminars/${id}`, {
      method: 'DELETE',
    });
  },

  // ABL
  getABL: async () => {
    return apiRequest<any[]>('/faculty/abl');
  },

  createABL: async (data: {
    subjectName: string;
    courseCode: string;
    industryConnect: string;
    proofDoc?: string;
  }) => {
    return apiRequest<any>('/faculty/abl', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateABL: async (id: string, data: any) => {
    return apiRequest<any>(`/faculty/abl/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteABL: async (id: string) => {
    return apiRequest<{ message: string }>(`/faculty/abl/${id}`, {
      method: 'DELETE',
    });
  },

  // Joint Teaching
  getJointTeaching: async () => {
    return apiRequest<any[]>('/faculty/joint-teaching');
  },

  createJointTeaching: async (data: {
    courseName: string;
    courseCode: string;
    facultyInvolved: string;
    syllabusDoc?: string;
    hours: number;
  }) => {
    return apiRequest<any>('/faculty/joint-teaching', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateJointTeaching: async (id: string, data: any) => {
    return apiRequest<any>(`/faculty/joint-teaching/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteJointTeaching: async (id: string) => {
    return apiRequest<{ message: string }>(`/faculty/joint-teaching/${id}`, {
      method: 'DELETE',
    });
  },

  // Adjunct Faculty
  getAdjunctFaculty: async () => {
    return apiRequest<any[]>('/faculty/adjunct');
  },

  createAdjunctFaculty: async (data: {
    facultyName: string;
    department: string;
    courseCode: string;
    supportingDocs?: string;
  }) => {
    return apiRequest<any>('/faculty/adjunct', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateAdjunctFaculty: async (id: string, data: any) => {
    return apiRequest<any>(`/faculty/adjunct/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteAdjunctFaculty: async (id: string) => {
    return apiRequest<{ message: string }>(`/faculty/adjunct/${id}`, {
      method: 'DELETE',
    });
  },

  // Notifications
  getNotifications: async () => {
    return apiRequest<any[]>('/faculty/notifications');
  },

  markNotificationRead: async (id: string) => {
    return apiRequest<any>(`/faculty/notifications/${id}/read`, {
      method: 'PUT',
    });
  },

  markAllNotificationsRead: async () => {
    return apiRequest<{ message: string }>('/faculty/notifications/read-all', {
      method: 'PUT',
    });
  },

  // Dashboard
  getDashboard: async () => {
    return apiRequest<{
      stats: any;
      recentFDPs: any[];
    }>('/faculty/dashboard');
  },
};

// ========== Admin API ==========
export const adminAPI = {
  getFaculty: async () => {
    return apiRequest<any[]>('/admin/faculty');
  },

  getFacultyById: async (id: string) => {
    return apiRequest<any>(`/admin/faculty/${id}`);
  },

  // FDP Attended
  getFDPAttended: async () => {
    return apiRequest<any[]>('/admin/fdp/attended');
  },

  updateFDPAttendedStatus: async (id: string, status: 'pending' | 'approved' | 'rejected') => {
    return apiRequest<any>(`/admin/fdp/attended/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  // FDP Organized
  getFDPOrganized: async () => {
    return apiRequest<any[]>('/admin/fdp/organized');
  },

  updateFDPOrganizedStatus: async (id: string, status: 'pending' | 'approved' | 'rejected') => {
    return apiRequest<any>(`/admin/fdp/organized/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  // Seminars
  getSeminars: async () => {
    return apiRequest<any[]>('/admin/seminars');
  },

  // ABL
  getABL: async () => {
    return apiRequest<any[]>('/admin/abl');
  },

  // Joint Teaching
  getJointTeaching: async () => {
    return apiRequest<any[]>('/admin/joint-teaching');
  },

  // Adjunct Faculty
  getAdjunctFaculty: async () => {
    return apiRequest<any[]>('/admin/adjunct');
  },

  // Events
  getEvents: async () => {
    return apiRequest<any[]>('/admin/events');
  },

  createEvent: async (data: {
    title: string;
    type: 'FDP' | 'Seminar' | 'Workshop' | 'Conference';
    date: string;
    venue: string;
    description?: string;
    registrationLink?: string;
  }) => {
    return apiRequest<any>('/admin/events', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateEvent: async (id: string, data: any) => {
    return apiRequest<any>(`/admin/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteEvent: async (id: string) => {
    return apiRequest<{ message: string }>(`/admin/events/${id}`, {
      method: 'DELETE',
    });
  },

  // Notifications
  getNotifications: async () => {
    return apiRequest<any[]>('/admin/notifications');
  },

  createNotification: async (data: {
    recipientId: string;
    message: string;
    type?: 'info' | 'success' | 'warning';
  }) => {
    return apiRequest<any>('/admin/notifications', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Dashboard
  getDashboard: async () => {
    return apiRequest<{ stats: any }>('/admin/dashboard');
  },
};

// ========== HOD API ==========
export const hodAPI = {
  getFaculty: async () => {
    return apiRequest<any[]>('/hod/faculty');
  },

  getFacultyById: async (id: string) => {
    return apiRequest<any>(`/hod/faculty/${id}`);
  },

  getRecords: async () => {
    return apiRequest<{
      fdpAttended: any[];
      fdpOrganized: any[];
      seminars: any[];
      abl: any[];
      jointTeaching: any[];
      adjunct: any[];
    }>('/hod/records');
  },

  getAnalytics: async () => {
    return apiRequest<{
      overview: any;
      monthlyFDPs: any[];
      topFaculty: any[];
    }>('/hod/analytics');
  },

  getNotifications: async () => {
    return apiRequest<any[]>('/hod/notifications');
  },

  markNotificationRead: async (id: string) => {
    return apiRequest<any>(`/hod/notifications/${id}/read`, {
      method: 'PUT',
    });
  },

  getDashboard: async () => {
    return apiRequest<{ stats: any }>('/hod/dashboard');
  },
};

// ========== Events API (Public) ==========
export const eventsAPI = {
  getUpcomingEvents: async () => {
    return apiRequest<any[]>('/events');
  },

  getAllEvents: async () => {
    return apiRequest<any[]>('/events/all');
  },

  getEventById: async (id: string) => {
    return apiRequest<any>(`/events/${id}`);
  },
};

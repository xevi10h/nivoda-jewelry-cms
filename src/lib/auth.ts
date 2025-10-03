interface Session {
  token: string;
  expires: number;
  refresh_token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    country: string;
    steps_required?: string[];
    company?: {
      id: string;
      name: string;
      api_type?: string;
    };
  };
  company_settings?: any;
  hubspot_token?: string;
  zendesk_token?: string;
  b2c_token?: string;
}

const SESSION_KEY = 'nivoda_cms_session';

export const sessionStorage = {
  get: (): Session | null => {
    try {
      const data = localStorage.getItem(SESSION_KEY);
      if (!data) return null;

      const session = JSON.parse(data) as Session;

      // Check if session is expired
      if (session.expires && session.expires < Date.now()) {
        sessionStorage.clear();
        return null;
      }

      return session;
    } catch (error) {
      console.error('Error reading session from storage:', error);
      return null;
    }
  },

  set: (session: Session): void => {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch (error) {
      console.error('Error saving session to storage:', error);
    }
  },

  clear: (): void => {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch (error) {
      console.error('Error clearing session from storage:', error);
    }
  },

  getToken: (): string | null => {
    const session = sessionStorage.get();
    return session?.token || null;
  }
};

export type { Session };
